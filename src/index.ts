import * as components from "./components/export";
import Card, { Attribute } from "./components/Card/Card";
import Character, { AttributeChar } from "./components/Character/Character";
import {getCharacters, getEpisodes} from "./data/dataFetch";

class AppContainer extends HTMLElement {

  allcards: HTMLDivElement[] = [];

    constructor(){
        super();
        this.attachShadow({mode: "open"}); 
    }

    async connectedCallback(){
      const episodes = await getEpisodes();
      this.render()
      const button = this.shadowRoot?.querySelector(".btnclick");
      const input = this.shadowRoot?.querySelector("input");

      button?.addEventListener("click", () => {
        let value = input?.value
        console.log(value);
        this.filter(Number(value), episodes.results)
      })
      
    }

    filter(value: number, results: any[]){
      for (let i = 0 ; i < value ; i++){
        console.log(results[i])
        const div = this.ownerDocument.createElement("div") as HTMLDivElement;
          const newEpisode = this.ownerDocument.createElement("my-card") as Card;
          newEpisode.setAttribute(Attribute.name, results[i].name);
          newEpisode.setAttribute(Attribute.ep, results[i].episode);
          div.appendChild(newEpisode)
    
          results[i].characters.forEach(async (character: string) => {
              const characterData = await getCharacters(character);
              const newCharacter = this.ownerDocument.createElement("my-char") as Character;
              newCharacter.setAttribute(AttributeChar.img, characterData.image);
              newCharacter.setAttribute(AttributeChar.name, characterData.name);
              div.appendChild(newCharacter);
          })
          this.allcards?.push(div);
      }
      this.render();
    }


    render(){
      if(this.shadowRoot){
        this.shadowRoot.innerHTML=`
        <input class="" type="text" placeholder="Escribe un número">
        <button class="btnclick">Filtrar</button>
        <p>hpta</p>
        `

        this.allcards.forEach((c) => {
          this.shadowRoot?.appendChild(c)
        })
        /*episodesData.forEach((ep: any) => {
          const div = this.ownerDocument.createElement("div") as HTMLDivElement;
          const newEpisode = this.ownerDocument.createElement("my-card") as Card;
          newEpisode.setAttribute(Attribute.name, ep.name);
          newEpisode.setAttribute(Attribute.ep, ep.episode);
          div.appendChild(newEpisode)
    
          ep.characters.forEach(async (character: string) => {
              const characterData = await getCharacters(character);
              const newCharacter = this.ownerDocument.createElement("my-char") as Character;
              newCharacter.setAttribute(AttributeChar.img, characterData.image);
              newCharacter.setAttribute(AttributeChar.name, characterData.name);
              div.appendChild(newCharacter);
          })
          this.shadowRoot?.appendChild(div);
        })*/
    }
}

}

customElements.define("app-container", AppContainer);
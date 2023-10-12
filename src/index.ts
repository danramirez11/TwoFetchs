
import * as components from "./components/export";
import Card, { Attribute } from "./components/Card/Card";
import Character, { AttributeChar } from "./components/Character/Character";
import {getCharacters, getEpisodes} from "./data/dataFetch";

class AppContainer extends HTMLElement {

    constructor(){
        super();
        this.attachShadow({mode: "open"}); 
    }

    async connectedCallback(){
      const episodes = await getEpisodes();
      this.render(episodes.results);

      const button = this.shadowRoot?.querySelector("button");
      button?.addEventListener("click", async ()=>{
        const characters = await getCharacters();
        this.renderCharacters(characters.results);
      })
    }

    renderCharacters (data: any[]){
        const divApi = this.shadowRoot?.querySelector(".characterdiv");
        data.forEach((character) => {
        const newCharacter = this.ownerDocument.createElement("my-char") as Character;
        newCharacter.setAttribute(AttributeChar.img, character.image);
        newCharacter.setAttribute(AttributeChar.name, character.name);
        divApi?.appendChild(newCharacter)
        })

    }

    render(episodesData:any){
      if(this.shadowRoot){
        this.shadowRoot.innerHTML=`
        <button>Otra hpta api</button>
        <div class="characterdiv"></div>
        `

      episodesData.forEach((ep: any) => {
        const div = this.ownerDocument.createElement("div") as HTMLDivElement;
        const newEpisode = this.ownerDocument.createElement("my-card") as Card;
        newEpisode.setAttribute(Attribute.name, ep.name);
        newEpisode.setAttribute(Attribute.ep, ep.episode);
        div.appendChild(newEpisode)

        this.shadowRoot?.appendChild(div);
      })

        
    }
}

}

customElements.define("app-container", AppContainer);
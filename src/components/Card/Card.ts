import styles from "./Card.css"

export enum Attribute {
    "name" = "name",
    "ep" = "ep",
}

class Card extends HTMLElement {

    name?: string;
    ep?: string;

    static get observedAttributes (){
        const attrs: Record <Attribute, null> = {
            name: null,
            ep: null,
        }
        return Object.keys(attrs);
    }

    attributeChangedCallback(propName:Attribute,oldValue: string | undefined,newValue: string | undefined){
        switch(propName){
            default: 
            this[propName] = newValue;
            break;
        }
        
        this.render();
    }

    constructor(){
        super();
        this.attachShadow({mode: "open"});
    this.render();
    }
   
    connectedCallback(){
        this.render();
    }

    render(){
        if (this.shadowRoot){
            this.shadowRoot.innerHTML = `
            <div class="card">
            <p>${this.name}</p>
            <p>${this.ep}</p>
            </div>
            `
            
        }
    }
}

customElements.define("my-card", Card);
export default Card;
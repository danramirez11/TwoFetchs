export enum AttributeChar {
    "name" = "name",
    "img" = "img",
}

class Character extends HTMLElement {

    name?: string;
    img?: string;

    static get observedAttributes (){
        const attrs: Record <AttributeChar, null> = {
            name: null,
            img: null,
        }
        return Object.keys(attrs);
    }

    attributeChangedCallback(propName:AttributeChar,oldValue: string | undefined,newValue: string | undefined){
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
            <img src="${this.img}">
            </div>
            `
            
        }
    }
}

customElements.define("my-char", Character);
export default Character;
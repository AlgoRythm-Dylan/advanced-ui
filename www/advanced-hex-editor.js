import AdvancedComponent from "./component-base.js";

const TEMPLATE = `<style>
#container {
    display: flex;
}
#info-grid {
    flex: 1;
    max-width: 350px;
}
.hex-grid-row, .character-grid-row {
    display: flex;
}
.hex-grid-cell {
    padding: 0.3rem 0px;
    margin: 0px;
    border: none;
    width: 2em;
    height: 1rem;
    text-align: center;
    min-width: 0px;
    cursor: default;
    font-family: monospace;
}
.hex-grid-cell:nth-child(odd){
    background: rgb(230, 230, 230);
}
.hex-grid-cell:hover {
    background: rgb(200, 200, 200);
}
.hex-grid-cell:focus {
    outline: none;
    background: rgb(255, 252, 163);
}
.character-grid-cell {
    margin: 0px;
    padding: 0.3rem 0px;
    border: none;
    width: 1em;
    height: 1rem;
    text-align: center;
    min-width: 0px;
    cursor: default;
    font-family: monospace;
}
.character-grid-cell:hover {
    background: rgb(200, 200, 200);
}
</style>
<div id="container">
    <div id="info-grid">
        <p>Binary Grid:</p>
        <div id="binary-grid">

        </div>
    </div>
    <div id="address-grid"></div>
    <div id="hex-grid"></div>
    <div id="character-grid"></div>
</div>`;

export default class HexEditor extends AdvancedComponent {

    #data

    constructor(){
        super();

        this.#data = null;
        this.view = null;

        this.hexGrid = null;
        this.characterGrid = null;
        this.binaryGrid = null;
    }
    connectedCallback(){
        this.attachShadow({ mode : "open" });
        this.shadowRoot.innerHTML = TEMPLATE;

        this.setup();

        if(this.getAttribute("value")){
            this.data = this.getAttribute("value");
        }
    }
    setup(){
        this.hexGrid = this.shadowRoot.getElementById("hex-grid");
        this.characterGrid = this.shadowRoot.getElementById("character-grid");

    }
    render(){
        this.clear();
        if(!this.view)
            return;
        
        let bytePosition = 0;
        let hrow, crow;
        while(bytePosition < this.view.byteLength){
            let byte = this.view.getUint8(bytePosition);
            if(bytePosition % 16 == 0){
                // Create a new row
                hrow = document.createElement("div");
                hrow.className = "hex-grid-row";
                this.hexGrid.appendChild(hrow);
                crow = document.createElement("div");
                crow.className = "character-grid-row";
                this.characterGrid.appendChild(crow);
            }
            let hcell = document.createElement("pre");
            hcell.className = "hex-grid-cell";
            hcell.innerHTML = byteToHexString(byte);
            hrow.appendChild(hcell);
            let ccell = document.createElement("pre");
            ccell.className = "character-grid-cell";
            ccell.innerHTML = String.fromCharCode(byte);
            crow.appendChild(ccell);
            bytePosition++;
        }
    }
    clear(){
        this.hexGrid.innerHTML = "";
        this.characterGrid.innerHTML = "";
    }
    set data(value){
        this.#data = value;
        if(value instanceof ArrayBuffer){
            this.view = new DataView(this.#data);
        }
        else if(typeof value === "string"){
            this.view = new DataView(new Uint8Array(
                Array.from(
                    value
                ).map(char => char.charCodeAt(0))
            ).buffer);
        }
        else{
            this.view = new DataView(this.#data.buffer);
        }
        this.render();
    }
    get data(){
        return this.#data;
    }
}

function byteToHexString(byte){
    return byte.toString(16).padStart(2, "0").toUpperCase();
}

function escapeHTML(str){
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

customElements.define("advanced-hex-editor", HexEditor);
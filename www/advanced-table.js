import AdvancedComponent from "./component-base.js";

const TEMPLATE = `<style>
:host {
    all: inherit;
}
#default {
    display: none;
}
</style>
<slot id="default"></slot>
<button>Hello world!</button>
<table>

</table>`;

class AdvancedTable extends AdvancedComponent {

    #columns

    constructor(){
        super();

        this.#columns = [];

        this.defaultSlot = null;
        this.table = null;
    }
    connectedCallback(){
        this.attachShadow({mode: "open"});
        this.innerHTML = TEMPLATE;

        this.setup();
    }
    render(){
        this.defaultSlot = this.shadowRoot.getElementById("default");
        this.defaultSlot.addEventListener("slotchange", this.#handleDefaultSlotChange);

        this.table = this.shadowRoot.querySelector("table");
    }
    #handleDefaultSlotChange(e){
        console.log(e);
    }
    setup(){

    }
    #renderHeader(){

    }
}

customElements.define("advanced-table", AdvancedTable);
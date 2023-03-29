const TEMPLATE = `<style>
:host {
    display: flex;
}
#container, #container-left, #container-right {
    display: flex;
}
</style>
<div id="container">
    <div id="container-left">
        <canvas id="screen"></canvas>
    </div>
    <div id="container-right">

    </div>
</div>`;

export default class AdvancedColorPicker extends HTMLElement {
    constructor(){
        super();

        this.shadow = null;
    }
    connectedCallback(){
        if(this.shadow === null)
            this.shadow = this.attachShadow({ mode : "closed" });
        this.shadow.innerHTML = TEMPLATE;
    }
}

customElements.define("advanced-colorpicker", AdvancedColorPicker);
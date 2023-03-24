const TEMPLATE = `<style>
:host {
    display: flex;
    border: var(--adv-dialog-border, none);
    border-radius: var(--adv-dialog-rounding, 0.3pc);
    flex-direction: column;
    overflow: hidden;
    box-shadow: var(--adv-dialog-shadow, 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24));
    max-width: 100%;
    max-height: 100%;
    box-sizing: border-box;
}
#header {
    display: flex;
    align-items: center;
    background: var(--adv-dialog-header-bg, #e8e8e8);
    padding: var(--adv-dialog-header-padding, 0.3rem);
    height: var(--adv-dialog-header-height, auto);
    border-bottom: solid #bababa 1px;
}
#title-spacer {
    width: var(--adv-dialog-title-spacing, 0.3rem);
}
#close-button {
    padding: var(--adv-dialog-close-button-padding, 0.3rem 0.5rem);
    margin: var(--adv-dialog-close-button-margin, 0px);
    margin-left: auto;
    border: var(--adv-dialog-close-button-border, solid #D1D1D1 1px);
    border-radius: var(--adv-dialog-close-button-border-radius, 0.3pc);
    background: var(--adv-dialog-close-button-bg, white);
}
#close-button::after {
    content: var(--adv-dialog-close-button-content, "Close");
}
#close-button:hover {
    color: #87b9ff;
}
#container {
    background: var(--adv-dialog-bg, white);
    padding: var(--adv-dialog-padding, 0.3rem);
    flex: 1;
    overflow: auto;
    min-height: min-content;
}
#controls-panel {
    background: var(--adv-dialog-controls-panel-bg, #e8e8e8);
    display: flex;
    align-items: center;
    justify-content: var(--adv-dialog-controls-panel-alignment, end);
    border-top: solid #bababa 1px;
}
#controls-panel:has(slot:empty){
    display: none;
}
</style>
<div id="header" part="header">
    <slot name="title"></slot>
    <div id="title-spacer" part="title-spacer"></div>
    <button id="close-button" part="close-button"></button>
</div>
<div id="container">
    <slot></slot>
</div>
<div id="controls-panel" part="controls-panel">
    <slot name="controls-panel"></slot>
</div>`;

export var backdrop = null;

export var DialogResult = {
    Success: 1,
    Yes: 1,
    Failure: 0,
    No: 0
}

export class AdvancedDialog extends HTMLElement {
    constructor(){
        super();

        this.shadow = null;
        this.closeButton = null;

        this.result = null;
    }
    connectedCallback(){
        if(this.shadow === null)
            this.shadow = this.attachShadow({ mode: "closed" });
        this.shadow.innerHTML = TEMPLATE;
        this.closeButton = this.shadow.getElementById("close-button");
        this.closeButton.addEventListener("click", e => {
            this.close();
        });
        this.addEventListener("click", e => {
            if (e.target.getAttribute("dialog-closer") !== null) {
                this.close();
            }
            else if (e.target.getAttribute("dialog-success") !== null) {
                this.close(DialogResult.Success);
            }
            else if (e.target.getAttribute("dialog-failure") !== null) {
                this.close(DialogResult.Failure);
            }
            else if (e.target.getAttribute("dialog-yes") !== null) {
                this.close(DialogResult.Yes);
            }
            else if (e.target.getAttribute("dialog-no") !== null) {
                this.close(DialogResult.No);
            }
        })
    }
    show(){
        showBackdrop();
        backdrop.appendChild(this);
        this.dispatchEvent(new Event("show"));
    }
    close(result = null) {
        this.result = result;
        hideBackdrop();
        this.remove();
        this.dispatchEvent(new Event("close"));
    }
}

export function cloneTemplate(query) {
    let template = document.querySelector(query);
    let content = template.content.cloneNode(true);
    return content;
}

export function createDialog(query) {
    let template = document.querySelector(query);
    let content = template.content.cloneNode(true);
    let dialog = document.createElement("advanced-dialog");
    for (let attr of template.attributes)
        dialog.setAttribute(attr.nodeName, attr.nodeValue);
    dialog.appendChild(content);
    return dialog;
}

export function showDialog(query) {
    let dialog = createDialog(query);
    dialog.show();
    return dialog;
}

export function yesno(prompt, title = null) {
    let dialog = document.createElement("advanced-dialog");
    dialog.innerHTML = prompt;
    let titleEl = document.createElement("p");
    titleEl.setAttribute("slot", "title");
    titleEl.innerHTML = title ?? "Message from Webpage";
    dialog.appendChild(titleEl);
    let noButton = document.createElement("button");
    noButton.setAttribute("slot", "controls-panel");
    noButton.setAttribute("dialog-no", true);
    noButton.innerHTML = "No";
    dialog.appendChild(noButton);
    let yesButton = document.createElement("button");
    yesButton.setAttribute("slot", "controls-panel");
    yesButton.setAttribute("dialog-yes", true);
    yesButton.innerHTML = "Yes";
    dialog.appendChild(yesButton);
    dialog.style.minWidth = "200px";
    dialog.style.minHeight = "150px";
    dialog.show();
    return new Promise(resolve => {
        dialog.addEventListener("close", () =>
            resolve(dialog.result === DialogResult.Success));
    })
}

export function message(text, title=null) {
    let dialog = document.createElement("advanced-dialog");
    dialog.innerHTML = text;
    let titleEl = document.createElement("p");
    titleEl.setAttribute("slot", "title");
    titleEl.innerHTML = title ?? "Message from Webpage";
    dialog.appendChild(titleEl);
    let closeButton = document.createElement("button");
    closeButton.setAttribute("slot", "controls-panel");
    closeButton.setAttribute("dialog-closer", true);
    closeButton.innerHTML = "Ok";
    dialog.appendChild(closeButton);
    dialog.style.minWidth = "200px";
    dialog.style.minHeight = "150px";
    dialog.show();
    return new Promise(resolve => {
        dialog.addEventListener("close", () => resolve());
    })
}

/*export function prompt(text, prompt, title=null) {

}*/

function createBackdrop(){
    backdrop = document.createElement("div");
    backdrop.className = "adv-dialog-backdrop";
    return backdrop;
}

export function showBackdrop(){
    if(backdrop === null)
        createBackdrop();
    document.body.appendChild(backdrop);
}

export function hideBackdrop(){
    backdrop.remove();
}

customElements.define("advanced-dialog", AdvancedDialog);
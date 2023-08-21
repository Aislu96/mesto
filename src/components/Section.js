export default class Section {
    #renderedItems;
    #containerParentElement;

    constructor({ items, renderer }, containerSelector) {
        this.#renderedItems = items;
        this.renderer = renderer;
        this.#containerParentElement = document.querySelector(containerSelector);
    }
    addItem(){

    }
    rendererItems(){

    }
}
export class Section {
    #renderedItems;
    #containerParentElement;
    #renderer;

    constructor({items, renderer}, containerSelector) {
        this.#renderedItems = items;
        this.#renderer = renderer;
        this.#containerParentElement = document.querySelector(containerSelector);
    }

    renderItems() {
        this.#renderedItems.forEach(item => {
            this.addItem(this.#renderer(item), 'append');
        });
    }

    addItem(element, position) {
        switch (position) {
            case 'append':
                this.#containerParentElement.append(element);
                break;
            case 'prepend':
                this.#containerParentElement.prepend(element);
                break;
            default:
                break;
        }
    }
}
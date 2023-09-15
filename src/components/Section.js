import {UserInfo} from "./UserInfo";

export class Section {
    #containerParentElement;
    #renderer;

    constructor({renderer}, containerSelector) {
        this.#renderer = renderer;
        this.#containerParentElement = document.querySelector(containerSelector);
    }

    renderItems(cards) {
        cards.forEach(item => {
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
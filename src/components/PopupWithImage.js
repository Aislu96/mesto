import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
    #popupCardsText;
    #popupCardsImage;


    constructor(popup) {
        super(popup);
        this.#popupCardsImage = this.popup.querySelector('.popup__cards-image');
        this.#popupCardsText = this.popup.querySelector('.popup__cards-text');
    }

    open(link, name) {
        this.#popupCardsImage.src = link.src;
        this.#popupCardsImage.alt = name.textContent;
        this.#popupCardsText.textContent = name.textContent;
        super.open();
    }
}
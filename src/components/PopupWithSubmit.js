import {Popup} from './Popup.js';

export class PopupWithSubmit extends Popup {
    #popupYesButton;
    #submit;
    #id;

    constructor(popup) {
        super(popup);
        this.popupContainer = this.popup.querySelector('.popup__container');
        this.#popupYesButton = this.popup.querySelector('.popup__button_delete');
    }

    open(id) {
        this.#id = id;
        super.open();
    }

    setAction(action) {
        this.#submit = action;
    }

    setEventListeners() {
        super.setEventListeners();
        //добавлять обработчик сабмита формы
        this.#popupYesButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.#submit(this.#id);
            this.close();
        });
    }

    close() {
        super.close();
    }
}
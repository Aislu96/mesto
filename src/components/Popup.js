export class Popup {
    popup;

    constructor(popup) {
        this.popup = popup;
    }

    //Cлушатель клика иконке закрытия попапа, на затемнённую область вокруг формы.
    setEventListeners() {
        this.popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
                this.close();
            }
        });
    }

    //Логика закрытия попапа клавишей Esc
    #handleEscClose = (evt) => {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    //Открытие попапа
    open() {
        this.popup.classList.add('popup_opened');
        document.addEventListener('keydown', this.#handleEscClose);
    }

    //Закрытие попапа
    close() {
        document.removeEventListener('keydown', this.#handleEscClose);
        this.popup.classList.remove('popup_opened');
    }
}
import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
    #inputs;
    #handelSubmitForm;
    #submitButton;
    #formInput;
    #submitButtonText;


    constructor(popup, handelSubmitForm) {
        super(popup);
        this.popupContainer = this.popup.querySelector('.popup__container');
        this.#inputs = this.popupContainer.querySelectorAll('.popup__input');
        this.#submitButton = this.popupContainer.querySelector('.popup__button');
        this.#handelSubmitForm = handelSubmitForm;
        this.#submitButtonText = this.#submitButton.textContent;
    }

//собирает данные всех полей формы
    #getInputValues() {
        this.#formInput = {};
        this.#inputs.forEach(input => {
            this.#formInput[input.name] = input.value;
        });
        return this.#formInput;
    }

    setEventListeners() {
        super.setEventListeners();
        //добавлять обработчик сабмита формы
        this.popupContainer.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.#handelSubmitForm(this.#getInputValues());
        });

    }

    saveData(isLoading) {
        if(isLoading) {
            this.#submitButton.textContent = 'Сохранение...'
        } else {
            this.#submitButton.textContent = this.#submitButtonText;
        }
    }

    close() {
        super.close();
        //при закрытии попапа форма должна ещё и сбрасываться.
        this.popupContainer.reset();
    }

}
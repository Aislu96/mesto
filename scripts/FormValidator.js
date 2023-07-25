export class FormValidator {
    #formElement;
    #config;
    #inputSelector;
    #submitButtonSelector;
    #formSelector;
    #formsInput;

    constructor(config, formElement) {
        this.#formElement = formElement;
        this.#formSelector = this.#formElement.querySelector(config.formSelector);
        this.#config = config;
        this.#inputSelector = config.inputSelector;
        this.#submitButtonSelector = this.#formElement.querySelector(this.#config.submitButtonSelector);
        this.#formsInput = this.#formElement.querySelectorAll(this.#inputSelector);
    }

    //Функция блокироки кнопки
    #showButtonError() {
        this.#submitButtonSelector.disabled = 'disabled';
        this.#submitButtonSelector.classList.add(this.#config.inactiveButtonClass);
    }

    // Функция разблокировки кнопки
    #hideButtonError() {
        this.#submitButtonSelector.disabled = false;
        this.#submitButtonSelector.classList.remove(this.#config.inactiveButtonClass);
    }

    //Функция изменения состояния кнопки
    #toggleButtonState() {
        if (!this.#formSelector.checkValidity()) {
            this.#showButtonError();
        } else {
            this.#hideButtonError();
        }
    }

    // Функция добавления класса ошибки
    #showInputError(formInput, errorElement) {
        formInput.classList.add(this.#config.inputErrorClass);
        errorElement.textContent = formInput.validationMessage;
    }

// Функция, которая удаляет класс с ошибкой
    #hideInputError(formInput, errorElement) {
        formInput.classList.remove(this.#config.inputErrorClass);
        errorElement.textContent = '';
    }

    // Фунцкия проверки валидности
    #checkInputValidity(formInput) {
        formInput.setCustomValidity("");
        const errorElement = this.#formElement.querySelector(`#${formInput.name}-error`);
        if (!formInput.validity.valid) {
            this.#showInputError(formInput, errorElement);
        } else {
            this.#hideInputError(formInput, errorElement);
        }
    }

    // Метод для очистки ошибок при открытии кнопки и управления кнопкой сабмита
    resetValidation() {
        // Управляем вкл или выкл кнопки сабмита формы
        this.#toggleButtonState();
        // Очищаем ошибки в инпутах формы
        [...this.#formsInput].forEach((formInput) => {
            const errorElement = this.#formElement.querySelector(`#${formInput.name}-error`);
            this.#hideInputError(formInput, errorElement);
        });
    }

    // Функция добавления обработчика событий
    #hangHandlerSubmit() {
        this.#toggleButtonState();
        [...this.#formsInput].forEach((formInput) => {
            formInput.addEventListener('input', () => {
                this.#toggleButtonState();
                this.#checkInputValidity(formInput);
            });
        });
        this.#formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            if (!this.#formSelector.checkValidity()) return;
            this.#showButtonError();
        });
    }

    hangHandlerSubmit() {
        this.#hangHandlerSubmit();
    }
}
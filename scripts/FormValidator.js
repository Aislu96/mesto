export class FormValidator {
    #formElement;
    #config;
    #inputSelector;
    #submitButtonSelector;
    #formSelector;
    constructor(config, formElement) {
        this.#formElement = formElement;
        this.#formSelector = this.#formElement.querySelector(config.formSelector);
        this.#config = config;
        this.#inputSelector = config.inputSelector;
        this.#submitButtonSelector = this.#formElement.querySelector(this.#config.submitButtonSelector);
    }

    //Функция блокироки кнопки
    #showButtonError(buttonSubmit, config) {
        buttonSubmit.disabled = 'disabled';
        buttonSubmit.classList.add(config.inactiveButtonClass);
    }

    // Функция разблокировки кнопки
    #hideButtonError(buttonSubmit, config) {
        buttonSubmit.disabled = false;
        buttonSubmit.classList.remove(config.inactiveButtonClass);
    }

    //Функция изменения состояния кнопки
    #toggleButtonState(buttonSubmit, isActive, config) {
        if (!isActive) {
            this.#showButtonError(buttonSubmit, config);
        } else {
            this.#hideButtonError(buttonSubmit, config);
        }
    }

    // Функция добавления класса ошибки
    #showInputError(formInput, errorElement, config) {
        formInput.classList.add(config.inputErrorClass);
        errorElement.textContent = formInput.validationMessage;
    }

// Функция, которая удаляет класс с ошибкой
    #hideInputError(formInput, errorElement, config) {
        formInput.classList.remove(config.inputErrorClass);
        errorElement.textContent = '';
    }

    // Фунцкия проверки валидности
    #checkInputValidity(formInput, formElement, config) {
        formInput.setCustomValidity("");
        const isInputValid = formInput.validity.valid;
        const errorElement = formElement.querySelector(`#${formInput.name}-error`);
        if (!isInputValid) {
            this.#showInputError(formInput, errorElement, config);
        } else {
            this.#hideInputError(formInput, errorElement, config);
        }
    }

    // Метод для очистки ошибок при открытии кнопки и управления кнопкой сабмита
    resetValidation() {
        const formsInput = this.#formElement.querySelectorAll(this.#inputSelector);
        // Управляем вкл или выкл кнопки сабмита формы
        this.#toggleButtonState(this.#submitButtonSelector, this.#formSelector.checkValidity(), this.#config);
        // Очищаем ошибки в инпутах формы
        [...formsInput].forEach((formInput) => {
            const errorElement = this.#formElement.querySelector(`#${formInput.name}-error`);
            this.#hideInputError(formInput, errorElement, this.#config)
        });
    }

    // Функция добавления обработчика событий
    #hangHandlerSubmit() {
        const formsInput = this.#formElement.querySelectorAll(this.#inputSelector);
        this.#toggleButtonState(this.#submitButtonSelector, this.#formSelector.checkValidity(), this.#config);
        [...formsInput].forEach((formInput) => {
            formInput.addEventListener('input', () => {
                this.#toggleButtonState(this.#submitButtonSelector, this.#formSelector.checkValidity(), this.#config);
                this.#checkInputValidity(formInput, this.#formElement, this.#config);
            });
        });
        this.#formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            if (!this.#formSelector.checkValidity()) return;
            showButtonError(this.#submitButtonSelector, config);
        });
    }

    inclusionValidation() {
        this.#hangHandlerSubmit();
    }
}
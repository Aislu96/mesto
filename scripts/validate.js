// Функция добавления класса ошибки
function showInputError(formInput, errorElement, config) {
    //Добавление класса ошибки
    formInput.classList.add(config.inputErrorClass);
    //Поиск текста ошибки
    errorElement.textContent = formInput.validationMessage;
}

// Функция, которая удаляет класс с ошибкой
function hideInputError(formInput, errorElement, config) {
    //Удаление класса ошибки
    formInput.classList.remove(config.inputErrorClass);
    //Очищаем сообщение
    errorElement.textContent = '';
}

// Фунцкия проверки валидности
function checkInputValidity(formInput, formElement, config) {
    //Устанавливает пользовательское сообщение о допустимости для элемента.
    formInput.setCustomValidity("");
    // Создаем переменные для валидации
    const isInputValid = formInput.validity.valid;
    const errorElement = formElement.querySelector(`#${formInput.name}-error`);
    // Поиск объекта ошибки
    if (!isInputValid) {
        // Если поле не проходит валидацию, покажем ошибку
        showInputError(formInput, errorElement, config);
    } else {
        // Если проходит, скроем
        hideInputError(formInput, errorElement, config);
    }
}

//Функция блокироки кнопки
function showButtonError(buttonSubmit, config) {
    buttonSubmit.disabled = 'disabled';
    buttonSubmit.classList.add(config.inactiveButtonClass);
}

// Функция разблокировки кнопки
function hideButtonError(buttonSubmit, config) {
    buttonSubmit.disabled = false;
    buttonSubmit.classList.remove(config.inactiveButtonClass);
}

//Функция изменения состояния кнопки
function toggleButtonState(buttonSubmit, isActive, config) {
    if (!isActive) {
        // Если поле не проходит валидацию, заблокируем кнопку
        showButtonError(buttonSubmit, config);
    } else {
        // Если поле не проходит валидацию, разблокируем
        hideButtonError(buttonSubmit, config);
    }
}

// Функция добавления обработчика событий
function hangHandlerSubmit(formElement, config) {
    // Внутри каждой формы ищем инпуты
    const formsInput = formElement.querySelectorAll(config.inputSelector);
    // Внутри формы ищем кнопку
    const buttonSubmit = formElement.querySelector(config.submitButtonSelector);
    //Изменение состояния кнопки
    toggleButtonState(buttonSubmit, formElement.checkValidity(), config);
    // Перебираем список инпутов конткретной формы
    [...formsInput].forEach(function (formInput) {
        //Вешаем на каждый инпут обработчик события input
        formInput.addEventListener('input', function () {
            //Изменение состояния кнопки
            toggleButtonState(buttonSubmit, formElement.checkValidity(), config);
            // При наступлении события ввода в инпут проверяем его валидность
            checkInputValidity(formInput, formElement, config);
        });
    });
    //Вешаем обработчик события submit на каждую форму в переборе
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        if (!formElement.checkValidity()) return;
    });
}

//Функция включения валидации
function inclusionValidation(config) {
    // Находим все формы и перебираем их
    const formsContainer = document.querySelectorAll(config.formSelector);
    [...formsContainer].forEach(function (formElement) {
        hangHandlerSubmit(formElement, config);
    });
}

const config = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button-color',
    inputErrorClass: 'popup__input_type_error',
};

inclusionValidation(config);
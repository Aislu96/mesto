// // Функция добавления класса ошибки
// function showInputError(formInput, errorElement, config) {
//     formInput.classList.add(config.inputErrorClass);
//     errorElement.textContent = formInput.validationMessage;
// }
//
// // Функция, которая удаляет класс с ошибкой
// function hideInputError(formInput, errorElement, config) {
//     formInput.classList.remove(config.inputErrorClass);
//     errorElement.textContent = '';
// }
//
// // Фунцкия проверки валидности
// function checkInputValidity(formInput, formElement, config) {
//     formInput.setCustomValidity("");
//     const isInputValid = formInput.validity.valid;
//     const errorElement = formElement.querySelector(`#${formInput.name}-error`);
//     if (!isInputValid) {
//         showInputError(formInput, errorElement, config);
//     } else {
//         hideInputError(formInput, errorElement, config);
//     }
// }
//
// //Функция блокироки кнопки
// function showButtonError(buttonSubmit, config) {
//     buttonSubmit.disabled = 'disabled';
//     buttonSubmit.classList.add(config.inactiveButtonClass);
// }
//
// // Функция разблокировки кнопки
// function hideButtonError(buttonSubmit, config) {
//     buttonSubmit.disabled = false;
//     buttonSubmit.classList.remove(config.inactiveButtonClass);
// }
//
// //Функция изменения состояния кнопки
// function toggleButtonState(buttonSubmit, isActive, config) {
//     if (!isActive) {
//         showButtonError(buttonSubmit, config);
//     } else {
//         hideButtonError(buttonSubmit, config);
//     }
// }
//
// // Функция добавления обработчика событий
// function hangHandlerSubmit(formElement, config) {
//     const formsInput = formElement.querySelectorAll(config.inputSelector);
//     const buttonSubmit = formElement.querySelector(config.submitButtonSelector);
//     toggleButtonState(buttonSubmit, formElement.checkValidity(), config);
//     [...formsInput].forEach(function (formInput) {
//         formInput.addEventListener('input', function () {
//             toggleButtonState(buttonSubmit, formElement.checkValidity(), config);
//             checkInputValidity(formInput, formElement, config);
//         });
//     });
//     formElement.addEventListener('submit', (evt) => {
//         evt.preventDefault();
//         if (!formElement.checkValidity()) return;
//         showButtonError(buttonSubmit, config);
//     });
// }
//
// //Функция включения валидации
// function inclusionValidation(config) {
//     const formsContainer = document.querySelectorAll(config.formSelector);
//     [...formsContainer].forEach(function (formElement) {
//         hangHandlerSubmit(formElement, config);
//     });
// }
//
// const config = {
//     formSelector: '.popup__container',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__button',
//     inactiveButtonClass: 'popup__button-color',
//     inputErrorClass: 'popup__input_type_error',
// };
//
// inclusionValidation(config);
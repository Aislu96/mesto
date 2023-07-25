import {initialCards} from "./arrayCards.js";
import {Cards} from "./Cards.js";
import {FormValidator} from "./FormValidator.js";
//Переменные для профиля
const popup = document.querySelectorAll('.popup');
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupUserOpenButton = document.querySelector('.profile__add-button');
const profileInputName = document.querySelector('.profile__title');
const profileInputJob = document.querySelector('.profile__subtitle');

// Переменная для закрытия
const popupCloseImage = document.querySelector('.popup__close_image');
const popupCloseProfile = document.querySelector('.popup__close_profile');
const popupClosePlace = document.querySelector('.popup__close_place');

//Переменные для редактирования профиля
const popupEditForm = document.querySelector('.popup_edit_profile');
const formInputName = document.querySelector('.popup__input_type_name');
const formInputJob = document.querySelector('.popup__input_type_job');

// Переменные для добавления карточек
const popupAddForm = document.querySelector('.popup_add_place');
const popupPlaceInputText = document.querySelector('.popup__input_type_title');
const popupPlaceInputLink = document.querySelector('.popup__input_type_link');

//Переменные для создания карточки
const cardsContainer = document.querySelector('.elements');
const popupCardsImage = document.querySelector('.popup__cards-image');
const popupPhotoCards = document.querySelector('.popup_photo_cards');
const popupCardsText = document.querySelector('.popup__cards-text');

//Функция для открытия одной карточки
const openPopupCards = (cardsTemplateImage, cardsTemplateText) => {
    popupCardsImage.src = cardsTemplateImage.src;
    popupCardsImage.alt = cardsTemplateText.textContent;
    popupCardsText.textContent = cardsTemplateText.textContent;
    openFormCards();
}

//Функция лайка
const likeElement = (likeElement) => {
    likeElement.classList.toggle('element__button_active');
};

//Функция удаления карточки
const createCardDelete = (deleteElement) => {
    deleteElement.remove();
};

function renderCards() {
    //Перебор массива
    initialCards.forEach((data) => {
        let link = data.link;
        let name = data.name;
        const cardsElement = new Cards({
            name,
            link,
            likeElement,
            createCardDelete,
            openPopupCards
        }, '#cards').createCard();
        cardsContainer.append(cardsElement);
    });
}

//Функция открытия popup
function openPopup(el) {
    el.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
}

//Обнуление инпутов
function clearCardFormInputs(value, item){
    value.form.reset();
    item.form.reset();
}

// Функция открытия popup профиля
function editOpenForm() {
    clearCardFormInputs(formInputName, formInputJob);
    openPopup(popupEditForm);
    formInputName.value = profileInputName.textContent;
    formInputJob.value = profileInputJob.textContent;
    popupEditFormValidation.resetValidation();
}

// Функция открытия popup новое место
function addOpenForm() {
    clearCardFormInputs(popupPlaceInputText, popupPlaceInputLink);
    openPopup(popupAddForm);
    popupAddFormValidation.resetValidation();
}

// Функция открытия popup карточки
function openFormCards() {
    openPopup(popupPhotoCards);
}

// Функция закрытия popup
function closePopup(popup) {
    document.removeEventListener('keydown', closePopupEsc);
    popup.classList.remove('popup_opened');
}

// Функция редактирования профиля
function submitProfileForm(evt) {
    evt.preventDefault();
    profileInputName.textContent = formInputName.value;
    profileInputJob.textContent = formInputJob.value;
    closePopup(popupEditForm);
}

//Новое место
const submitAddCard = (evt) => {
    evt.preventDefault();
    const newCard = new Cards({name: popupPlaceInputText.value, link: popupPlaceInputLink.value,
        likeElement,
        createCardDelete,
        openPopupCards
    }, '#cards').createCard();
    cardsContainer.prepend(newCard);
    closePopup(popupAddForm);

    evt.target.reset();
}

//Функция закрытия оверлея
function closeOverlay() {
    popup.forEach((el) => {
        el.addEventListener('mousedown', function (evt) {
            if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
                closePopup(evt.target);
            }
        });
    });
}

//Функция закрытия через esc
function closePopupEsc(evt) {
    if (evt.key === "Escape") {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
}

//Функции для вызова на реакцию пользователя
popupProfileOpenButton.addEventListener('click', editOpenForm);
popupCloseProfile.addEventListener('click', () => closePopup(popupEditForm));
popupClosePlace.addEventListener('click', () => closePopup(popupAddForm));
popupEditForm.addEventListener('submit', submitProfileForm);
popupUserOpenButton.addEventListener('click', addOpenForm);
popupAddForm.addEventListener('submit', submitAddCard);
popupCloseImage.addEventListener('click', () => closePopup(popupPhotoCards));
closeOverlay();
renderCards();

const config = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button-color',
    inputErrorClass: 'popup__input_type_error',
};

const popupEditFormValidation = new FormValidator(config, popupEditForm);
popupEditFormValidation.inclusionValidation();
const popupAddFormValidation = new FormValidator(config, popupAddForm);
popupAddFormValidation.inclusionValidation();
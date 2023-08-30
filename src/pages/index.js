import {initialCards, config} from "../utils/constants.js";
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {Section} from "../components/Section.js"
import './index.css';
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";
//Переменные для профиля
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupUserOpenButton = document.querySelector('.profile__add-button');
const profileInputName = document.querySelector('.profile__title');
const profileInputJob = document.querySelector('.profile__subtitle');

//Переменные для редактирования профиля
const popupEditForm = document.querySelector('.popup_edit_profile');
const formInputName = document.querySelector('.popup__input_type_name');
const formInputJob = document.querySelector('.popup__input_type_job');

// Переменные для добавления карточек
const popupAddForm = document.querySelector('.popup_add_place');
const popupPlaceInputText = document.querySelector('.popup__input_type_title');
const popupPlaceInputLink = document.querySelector('.popup__input_type_link');
const popupPhotoCards = document.querySelector('.popup_photo_cards');


const popupWithImageCards = new PopupWithImage(popupPhotoCards);
//Функция для открытия одной карточки
const handleCardClick = (cardsTemplateImage, cardsTemplateText) => {
    popupWithImageCards.open(cardsTemplateImage, cardsTemplateText);
    popupWithImageCards.setEventListeners();
}

const userInfo = new UserInfo({name: profileInputName, job: profileInputJob});

//Функции карточки
const renderCard = (data => {
    const cardsElement = new Card(data.name, data.link, handleCardClick, '#cards').createCard();
    section.addItem(cardsElement, 'prepend');
});

const section = new Section({
    items: initialCards, renderer: (item) => {
        return new Card(item.name, item.link, handleCardClick, '#cards').createCard();
    }
}, '.elements');

section.renderItems();

const popupFormEdit = new PopupWithForm(popupEditForm, submitProfileForm);
popupFormEdit.setEventListeners();

// Функция редактирования профиля
function submitProfileForm(data) {
    userInfo.setUserInfo(data);
    popupFormEdit.close();
}

const popupCardAdd = new PopupWithForm(popupAddForm, submitAddCard);
popupCardAdd.setEventListeners();

//Новое место
function submitAddCard() {
    renderCard({name: popupPlaceInputText.value, link: popupPlaceInputLink.value});
    popupCardAdd.close();
}

//Функции для вызова на реакцию пользователя
popupProfileOpenButton.addEventListener('click', () => {
    // Функция открытия popup профиля
    const formValues = userInfo.getUserInfo();
    formInputName.value = formValues.name;
    formInputJob.value = formValues.job;
    popupFormEdit.open();
    popupEditFormValidation.resetValidation();
});
popupUserOpenButton.addEventListener('click', () => {
    // Функция открытия popup новое место
    popupCardAdd.open();
    popupAddFormValidation.resetValidation();
});


const popupEditFormValidation = new FormValidator(config, popupEditForm);
popupEditFormValidation.hangHandlerSubmit();
const popupAddFormValidation = new FormValidator(config, popupAddForm);
popupAddFormValidation.hangHandlerSubmit();
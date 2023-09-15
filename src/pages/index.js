import {config} from "../utils/constants.js";
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {Section} from "../components/Section.js"
import './index.css';
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";
import {Api} from "../components/Api.js"
import {PopupWithSubmit} from "../components/PopupWithSubmit";
//Переменные для профиля
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupUserOpenButton = document.querySelector('.profile__add-button');

//Переменные для редактирования профиля
const popupEditForm = document.querySelector('.popup_edit_profile');
const formInputName = document.querySelector('.popup__input_type_name');
const formInputJob = document.querySelector('.popup__input_type_job');

// Переменные для добавления карточек
const popupAddForm = document.querySelector('.popup_add_place');
const popupPhotoCards = document.querySelector('.popup_photo_cards');
const optionsApi = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-75',
    headers: {
        authorization: '8f0f3959-562a-4d67-8672-647db07d1306',
        'Content-Type': "application/json"
    }
}
const popupDeleteCard = document.querySelector('.popup_delete_card')
const api = new Api(optionsApi);
api.getCards()
    .then(cards => {
        cardsContainer.renderItems(cards);
    })
const userInfo = new UserInfo();

let userId = '';

api.getUser()
    .then(user => {
        userId = user['_id'];
        return userInfo.setUserInfo(user);
    })

//const userInfo = new UserInfo({name: profileInputName, job: profileInputJob});
const popupWithImageCards = new PopupWithImage(popupPhotoCards);
//Функция для открытия одной карточки
const handleCardClick = (cardsTemplateImage, cardsTemplateText) => {
    popupWithImageCards.open(cardsTemplateImage, cardsTemplateText);
    popupWithImageCards.setEventListeners();
}

const popupWithSubmit = new PopupWithSubmit(popupDeleteCard);
function deleteConfirmOpen(id) {
    popupWithSubmit.open(id)
}
//Функции карточки
const renderCard = (data => {
    const cardElement = new Card(data.name, data.link, data['_id'], data['likes'], deleteConfirmOpen, handleCardClick, '#cards', data['owner']['_id'], userId, (card) => {
        popupWithSubmit.setAction((id) => {
                api.deleteCard(id)
                    .then(() => {
                        card.removeCard();
                    })
            })},
                () => {
        if (cardElement.querySelector('.element__button').className === 'element__button element__button_active') {
            api.likeCard(data['_id'])
                .then(() => {
                   //cardsElement.like();
                })
        } else {
            api.deleteLikeCard(data['_id'])
                .then(() => {
                   //cardsElement.like();
                })
        }
    }).createCard();
    cardsContainer.addItem(cardElement, 'prepend');
})

const cardsContainer = new Section({
    renderer: (data) => {
        const card = new Card(data.name, data.link, data['_id'], data['likes'], deleteConfirmOpen, handleCardClick, '#cards', data['owner']['_id'], userId, (card) => {
                popupWithSubmit.setAction((id) => {
                    api.deleteCard(id)
                        .then(() => {
                            card.removeCard();
                        })
                })},
            () => {
                if (card.querySelector('.element__button').className === 'element__button element__button_active') {
                    api.likeCard(data['_id'])
                        .then(() => {
                            //cardsElement.like();
                        })
                } else {
                    api.deleteLikeCard(data['_id'])
                        .then(() => {
                            //cardsElement.like();
                        })
                }
            }).createCard();
        return card;
    }
}, '.elements');
//Редактирование профиля
const popupFormEdit = new PopupWithForm(popupEditForm, (data) => {
    api.patchUser(data)
        .then(res => {
            userInfo.setUserInfo(res);
            popupFormEdit.close();
        })
});

popupFormEdit.setEventListeners();
//Новое место
const popupCardAdd = new PopupWithForm(popupAddForm, (data) => {
    api.postCard(data)
        .then(res => {
            renderCard(res);
            popupCardAdd.close();
        });
});
popupCardAdd.setEventListeners();
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
popupWithSubmit.setEventListeners();

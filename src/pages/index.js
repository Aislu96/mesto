import {config} from "../utils/constants.js";
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {Section} from "../components/Section.js"
import './index.css';
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";
import {Api} from "../components/Api.js";
import {PopupWithSubmit} from "../components/PopupWithSubmit";
//Переменные для профиля
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupUserOpenButton = document.querySelector('.profile__add-button');
//Переменные для редактирования профиля
const popupEditForm = document.querySelector('.popup_edit_profile');
const formInputName = document.querySelector('.popup__input_type_name');
const formInputJob = document.querySelector('.popup__input_type_job');
const popupAvatar = document.querySelector('.popup_edit_avatar');
const profileIconButton = document.querySelector('.profile__icon');
// Переменные для добавления карточек
const popupAddForm = document.querySelector('.popup_add_place');
const popupPhotoCards = document.querySelector('.popup_photo_cards');
//Переменная для удаления карточки
const popupDeleteCard = document.querySelector('.popup_delete_card');
const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-75',
    headers: {
        authorization: '8f0f3959-562a-4d67-8672-647db07d1306',
        'Content-Type': "application/json"
    }
});
const userInfo = new UserInfo();

let userId = '';
Promise.all([api.getCards(), api.getUser()])
    .then(([cards, user]) => {
        userId = user['_id'];
        cardsContainer.renderItems(cards);
        userInfo.setUserInfo(user);
    })
    .catch((error) => {
        console.log(error);
    })

const popupWithImageCards = new PopupWithImage(popupPhotoCards);
//Функция для открытия одной карточки
const handleCardClick = (cardsTemplateImage, cardsTemplateText) => {
    popupWithImageCards.open(cardsTemplateImage, cardsTemplateText);
}
popupWithImageCards.setEventListeners();
const popupDeleteUserCard = new PopupWithSubmit(popupDeleteCard);

function deleteConfirmOpen(id) {
    popupDeleteUserCard.open(id)
}

function drawCard(data) {
    return new Card(data.name, data.link, data['_id'], data['likes'], deleteConfirmOpen, handleCardClick, '#cards', data['owner']['_id'], userId, (card) => {
            popupDeleteUserCard.setAction((id) => {
                api.deleteCard(id)
                    .then(() => {
                        card.removeCard();
                    })
                    .then(() => {
                        popupDeleteUserCard.close();
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
        },
        (cardEl, id) => {
            api.likeCard(id)
                .then((data) => {
                    cardEl.addLike(data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }, (cardEl, id) => {
            api.deleteLikeCard(id)
                .then(() => {
                    cardEl.deleteLike(data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }).createCard();
}

//Функции карточки
const renderCard = (data => {
    const cardElement = drawCard(data)
    cardsContainer.addItem(cardElement, 'prepend');
})

const cardsContainer = new Section({
    renderer: (data) => {
        return drawCard(data);
    }
}, '.elements');
//Редактирование профиля
const popupFormEdit = new PopupWithForm(popupEditForm, (data) => {
    popupFormEdit.saveData(true);
    api.patchUser(data)
        .then(res => {
            userInfo.setUserInfo(res);
            popupFormEdit.close();
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            popupFormEdit.saveData(false);
        })
});
popupFormEdit.setEventListeners();
//Редактирование аватара
const popupAvatarEdit = new PopupWithForm(popupAvatar, (data) => {
    popupAvatarEdit.saveData(true);
    api.patchAvatar(data)
        .then((res) => {
            userInfo.setUserInfo(res);
            popupAvatarEdit.close();
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            popupAvatarEdit.saveData(false);
        })
});

popupAvatarEdit.setEventListeners();
//Новое место
const popupCardAdd = new PopupWithForm(popupAddForm, (data) => {
    popupCardAdd.saveData(true);
    api.postCard(data)
        .then(res => {
            renderCard(res);
            popupCardAdd.close();
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            popupCardAdd.saveData(false);
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
profileIconButton.addEventListener('click', () => {
    //Открытие popup avatar
    popupAvatarEdit.open();
    popupEditAvatarFormValidator.resetValidation();

})
const popupEditFormValidation = new FormValidator(config, popupEditForm);
popupEditFormValidation.hangHandlerSubmit();
const popupAddFormValidation = new FormValidator(config, popupAddForm);
const popupEditAvatarFormValidator = new FormValidator(config, popupAvatar);
popupEditAvatarFormValidator.hangHandlerSubmit()
popupAddFormValidation.hangHandlerSubmit();
popupDeleteUserCard.setEventListeners();

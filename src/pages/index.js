import {config} from "../utils/constants.js";
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {Section} from "../components/Section.js"
import './index.css';
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";
import api from "../components/Api.js";
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
const profileAvatar = document.querySelector('.profile__avatar');
// Переменные для добавления карточек
const popupAddForm = document.querySelector('.popup_add_place');
const popupPhotoCards = document.querySelector('.popup_photo_cards');
//Переменная для удаления карточки
const popupDeleteCard = document.querySelector('.popup_delete_card')
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

function drawCard(data) {
    return new Card(data.name, data.link, data['_id'], data['likes'], deleteConfirmOpen, handleCardClick, '#cards', data['owner']['_id'], userId, (card) => {
            popupWithSubmit.setAction((id) => {
                api.deleteCard(id)
                    .then(() => {
                        card.removeCard();
                    })
            })
        },
        (cardEl, id) => {
            api.likeCard(id)
                .then((data) => {
                    cardEl.addLike(data);
                })
        }, (cardEl, id) => {
            api.deleteLikeCard(id)
                .then(() => {
                    cardEl.deleteLike(data);
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
        .finally(() => {
            popupFormEdit.saveData(false);
        })
});
popupFormEdit.setEventListeners();
//Редактирование аватара
const popupAvatarEdit = new PopupWithForm(popupAvatar, (data) => {
    popupAvatarEdit.saveData(true);
    api.patchAvatar(data)
        .then(res => {
            profileAvatar.src = res.avatar;
            popupAvatarEdit.close();
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
popupWithSubmit.setEventListeners();

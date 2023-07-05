//Переменные для профиля
const popup = document.querySelectorAll('.popup');
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupUserOPenButton = document.querySelector('.profile__add-button');
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
const cardsTemplate = document.querySelector('#cards');
const popupCardsImage = document.querySelector('.popup__cards-image');
const popupPhotoCards = document.querySelector('.popup_photo_cards');
const popupCardsText = document.querySelector('.popup__cards-text');

//Создание карточки
const createCard = (data) => {
    // Клонируем содержимое тега <template>
    const cardsTemplateClone = cardsTemplate.content.cloneNode(true);
    const cardsTemplateElement = cardsTemplateClone.querySelector('.element');
    const cardsTemplateImage = cardsTemplateElement.querySelector('.element__image');
    const cardsDeleteButton = cardsTemplateElement.querySelector('.element__delete');
    const cardsGroupTemplate = cardsTemplateElement.querySelector('.element__group');
    const cardsTemplateText = cardsGroupTemplate.querySelector('.element__text');
    const cardsButtonLike = cardsGroupTemplate.querySelector('.element__button');
    // Наполняем содержимым
    cardsTemplateText.textContent = data.name;
    cardsTemplateImage.src = data.link;
    cardsTemplateImage.alt = data.name;

    //Функция для открытия одной карточки
    function openPopupCards() {
        popupCardsImage.src = cardsTemplateImage.src;
        popupCardsImage.alt = cardsTemplateText.textContent;
        popupCardsText.textContent = cardsTemplateText.textContent;
        openFormCards();
    }

    //Функции для вызова на реакцию пользователя
    cardsButtonLike.addEventListener('click', likeElement);
    cardsDeleteButton.addEventListener('click', createCardDelete);
    cardsTemplateImage.addEventListener('click', openPopupCards);
    return cardsTemplateClone;
}

//Функция лайка
const likeElement = (evt) => {
    evt.target.classList.toggle('element__button_active');
};

//Функция удаления карточки
const createCardDelete = (evt) => {
    evt.target.closest('.element').remove();
};

function renderCards() {
    //Перебор массива
    initialCards.forEach((data) => {
        const newCard = createCard(data);
        cardsContainer.append(newCard);
    });
}

//Функция открытия popup
function openPopup(el) {
    el.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
}

// Функция открытия popup профиля
function editOpenForm() {
    openPopup(popupEditForm);
    formInputName.value = profileInputName.textContent;
    formInputJob.value = profileInputJob.textContent;
}

// Функция открытия popup новое место
function addOpenForm() {
    openPopup(popupAddForm);
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
    const newCard = createCard({name: popupPlaceInputText.value, link: popupPlaceInputLink.value})
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
popupUserOPenButton.addEventListener('click', addOpenForm);
popupAddForm.addEventListener('submit', submitAddCard);
popupCloseImage.addEventListener('click', () => closePopup(popupPhotoCards));
closeOverlay();
renderCards();
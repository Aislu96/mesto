const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const profileInputName = document.querySelector('.profile__title');
const profileInputJob = document.querySelector('.profile__subtitle');
const popupCloseProfile = document.querySelector('.popup__close_profile');
const popupClosePlace = document.querySelector('.popup__close_place');
const formInputName = document.querySelector('.popup__input_type_name');
const formInputJob = document.querySelector('.popup__input_type_job');
const popupUserOPenButton = document.querySelector('.profile__add-button');
const popupAddForm = document.querySelector('.popup_add_place');
const popupEditForm = document.querySelector('.popup_edit_profile');
const popupCloseImage = document.querySelector('.popup__close_image');
const cardsContainer = document.querySelector('.elements');
const cardsTemplate = document.querySelector('#cards');
const popupPlaceInputText = document.querySelector('.popup__input_type_title');
const popupPlaceInputLink = document.querySelector('.popup__input_type_link');
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
    function popupCardsOpen() {
        popupCardsImage.src = cardsTemplateImage.src;
        popupCardsImage.alt = cardsTemplateText.textContent;
        popupCardsText.textContent = cardsTemplateText.textContent;
        openFormCards();
    }

    //Функции для вызова на реакцию пользователя
    cardsButtonLike.addEventListener('click', likeElement);
    cardsDeleteButton.addEventListener('click', createCardDelete);
    cardsTemplateImage.addEventListener('click', popupCardsOpen);
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
        const newCard = createCard(data)
        cardsContainer.append(newCard)
    });
}


//Функция открытия popup
function openPopup(el) {
    el.classList.add('popup_opened');
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
    popup.classList.remove('popup_opened');
}

// Функция закрытия popup профиль
function closePopupProfile() {
    closePopup(popupEditForm);
}

// Функция закрытия popup новое место
function closePopupPlace() {
    closePopup(popupAddForm);
}

// Функция закрытия popup карточки
function closePopupImage() {
    closePopup(popupPhotoCards);
}


// Функция редактирования профиля
function submitProfileForm(evt) {
    evt.preventDefault();
    profileInputName.textContent = formInputName.value;
    profileInputJob.textContent = formInputJob.value;
    closePopupProfile();
}

//Новое место
const submitAddCard = (evt) => {
    evt.preventDefault();
    const newCard = createCard({name: popupPlaceInputText.value, link: popupPlaceInputLink.value})
    cardsContainer.prepend(newCard);

    closePopupPlace();
    popupPlaceInputText.value = '';
    popupPlaceInputLink.value = '';
}


//Функции для вызова на реакцию пользователя
popupProfileOpenButton.addEventListener('click', editOpenForm);
popupCloseProfile.addEventListener('click', closePopupProfile);
popupClosePlace.addEventListener('click', closePopupPlace);
popupEditForm.addEventListener('submit', submitProfileForm);
popupUserOPenButton.addEventListener('click', addOpenForm);
popupAddForm.addEventListener('submit', submitAddCard);
popupCloseImage.addEventListener('click', closePopupImage);

renderCards();
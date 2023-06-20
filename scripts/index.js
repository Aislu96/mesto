const editButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.profile__title');
const jobInput = document.querySelector('.profile__subtitle');
const popupCloseProfile = document.querySelector('.popup__close_profile');
const popupClosePlace = document.querySelector('.popup__close_place');
const formName = document.querySelector('.popup__input_type_name');
const formJob = document.querySelector('.popup__input_type_job');
const addButton = document.querySelector('.profile__add-button');
const popupAddForm = document.querySelector('.popup_add_place');
const popupEditForm = document.querySelector('.popup_edit_profile');
const popupCloseImage = document.querySelector('.popup__close_image');
const elementsTemplate = document.querySelector('.elements');
const cardsTemplate = document.querySelector('#cards');
const popupTitle = document.querySelector('.popup__input_type_title');
const popupLink = document.querySelector('.popup__input_type_link');
const popupCardsImage = document.querySelector('.popup__cards-image');
const popupPhotoCards = document.querySelector('.popup_photo_cards');
const popupCardsText = document.querySelector('.popup__cards-text');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

//Создание карточки
const createCard = (data) => {
    // Клонируем содержимое тега <template>
    const item = cardsTemplate.content.cloneNode(true);
    const itemElement = item.querySelector('.element');
    const imageTemplate = itemElement.querySelector('.element__image');
    const deleteButton = itemElement.querySelector('.element__delete');
    const elementGroup = itemElement.querySelector('.element__group');
    const textCards = elementGroup.querySelector('.element__text');
    const buttonLike = elementGroup.querySelector('.element__button');
    // Наполняем содержимым
    textCards.textContent = data.name;
    imageTemplate.src = data.link;
    imageTemplate.alt = data.name;
    // Вставляем склонированный контент на страницу
    elementsTemplate.prepend(item);
    //Функция для открытия одной карточки
    function popupCardsOpen() {
        popupCardsImage.src = imageTemplate.src;
        popupCardsImage.alt = textCards.textContent;
        popupCardsText.textContent = textCards.textContent;
        openPopup(popupPhotoCards);
    }

    buttonLike.addEventListener('click', likeElement);
    deleteButton.addEventListener('click', createCardDelete);
    imageTemplate.addEventListener('click', popupCardsOpen);
    return item;
}

// Функция лайка
const likeElement = (evt) => {
    evt.target.classList.toggle('element__button_active');
};

//Функция удаления карточки
const createCardDelete = (evt) => {
    evt.target.closest('.element').remove();
};

//Функция добавления карточки
let renderElements = (data) => elementsTemplate.prepend(createCard(data));

//Перебор массива
initialCards.forEach((data) => {
    renderElements(data);
});

//Функция открытия popup
function openPopup(el) {
    el.classList.add('popup_opened');
}

// Функция открытия popup 1
function editOpenForm() {
    openPopup(popupEditForm);
    formName.value = nameInput.textContent;
    formJob.value = jobInput.textContent;
}

// Функция открытия popup 2
function addOpenForm() {
    openPopup(popupAddForm);
}

// Функция открытия popup 3
function addOpenForm() {
    openPopup(popupAddForm);
}

// Функция закрытия popup
function closePopupProfile() {
    popupEditForm.classList.remove('popup_opened');
}

function closePopupPlace() {
    popupAddForm.classList.remove('popup_opened');
}

function closePopupImage() {
    popupPhotoCards.classList.remove('popup_opened');
}


// Функция редактирования профиля
function profileEditing(evt) {
    evt.preventDefault();
    nameInput.textContent = formName.value;
    jobInput.textContent = formJob.value;
    closePopupProfile();
}

//Новое место
const submitAddCard = (evt) => {
    evt.preventDefault();
    renderElements({
        name: popupTitle.value,
        link: popupLink.value,
    });

    evt.target.reset();
    closePopupPlace();
}


// Вызов функции
editButton.addEventListener('click', editOpenForm);
popupCloseProfile.addEventListener('click', closePopupProfile);
popupClosePlace.addEventListener('click', closePopupPlace);
popupEditForm.addEventListener('submit', profileEditing);
addButton.addEventListener('click', addOpenForm);
popupAddForm.addEventListener('submit', submitAddCard);
popupCloseImage.addEventListener('click', closePopupImage);


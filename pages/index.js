const editButton = document.querySelector('.profile__editButton');
const nameInput = document.querySelector('.profile__title');
const jobInput = document.querySelector('.profile__subtitle');
const popup = document.querySelector('.popup');
const popupOpened = document.querySelector('.popup_opened');
const popupClose = document.querySelector('.popup__close');
const popupSave = document.querySelector('.popup__button');
const formName = document.querySelector('.popup__input_name');
const formJob = document.querySelector('.popup__input_job');


// Функция открытия popup
function openPopup() {
    popup.classList.add('popup_opened');
}

function editOpenForm() {
    openPopup(popupOpened)
    formName.value = nameInput.textContent;
    formJob.value = jobInput.textContent;
}

// Функция закрытия popup
function closePopup() {
    popup.classList.remove('popup_opened')
}

function closePopupForm() {
    closePopup(popupOpened);
}

// Функция редактирования профиля

function profileEditing () {
    openPopup(popupOpened)
    nameInput.textContent = formName.value;
    jobInput.textContent = formJob.value;
    closePopupForm();
}


// Вызов функции
editButton.addEventListener('click', editOpenForm);
popupClose.addEventListener('click', closePopupForm);
popupSave.addEventListener('click', closePopupForm);
popupSave.addEventListener('click',profileEditing)


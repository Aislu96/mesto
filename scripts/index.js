const editButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.profile__title');
const jobInput = document.querySelector('.profile__subtitle');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
const formName = document.querySelector('.popup__input_type_name');
const formJob = document.querySelector('.popup__input_type_job');
const popupEditForm = document.querySelector('.popup__container');


// Функция открытия popup
function editOpenForm() {
    popup.classList.add('popup_opened');
    formName.value = nameInput.textContent;
    formJob.value = jobInput.textContent;
}

// Функция закрытия popup
function closePopup() {
    popup.classList.remove('popup_opened');
}


// Функция редактирования профиля
function profileEditing(evt) {
    evt.preventDefault();
    nameInput.textContent = formName.value;
    jobInput.textContent = formJob.value;
    closePopup();
}


// Вызов функции
editButton.addEventListener('click', editOpenForm);
popupClose.addEventListener('click', closePopup);
popupEditForm.addEventListener('submit', profileEditing);


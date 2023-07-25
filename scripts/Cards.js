export class Card {
    #cardsTemplateElement;
    #templateSelector;
    #name;
    #link;
    #openPopupCards;
    #likeButton;
    #cardsDeleteButton;
    #cardsTemplateImage;
    #cardsTemplateText;

    constructor({name, link, openPopupCards}, templateSelector) {
        this.#name = name;
        this.#link = link;
        this.#templateSelector = templateSelector;
        this.#openPopupCards = openPopupCards;
    }

    #getTemplate() {
        return document.querySelector(this.#templateSelector).content.querySelector('.element').cloneNode(true);
    }

    //Функция лайка
    #putLikeElement() {
        this.#likeButton.classList.toggle('element__button_active');
    };

//Функция удаления карточки
    #createCardDelete() {
        this.#cardsTemplateElement.remove();
    };

    #setEventListeners() {
        this.#likeButton.addEventListener('click', () => {
            this.#putLikeElement()
        });
        this.#cardsDeleteButton.addEventListener('click', () => {
            this.#createCardDelete();
        });
        this.#cardsTemplateImage.addEventListener('click', () => {
            this.#openPopupCards(this.#cardsTemplateImage, this.#cardsTemplateText)
        });
    }

    //Создание карточки
    createCard() {
        // Клонируем содержимое тега <template>
        this.#cardsTemplateElement = this.#getTemplate();
        this.#cardsTemplateImage = this.#cardsTemplateElement.querySelector('.element__image');
        this.#cardsDeleteButton = this.#cardsTemplateElement.querySelector('.element__delete');
        const cardsGroupTemplate = this.#cardsTemplateElement.querySelector('.element__group');
        this.#cardsTemplateText = cardsGroupTemplate.querySelector('.element__text');
        this.#likeButton = cardsGroupTemplate.querySelector('.element__button');
        // Наполняем содержимым
        this.#cardsTemplateText.textContent = this.#name;
        this.#cardsTemplateImage.src = this.#link;
        this.#cardsTemplateImage.alt = this.#name;

        this.#setEventListeners();
        return this.#cardsTemplateElement;
    }
}
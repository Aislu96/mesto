export class Cards {
    #cardsTemplateElement;
    #templateSelector;
    #name;
    #link;
    #likeElement;
    #createCardDelete;
    #openPopupCards;

    constructor({name, link, likeElement, createCardDelete, openPopupCards}, templateSelector) {
        this.#name = name;
        this.#link = link;
        this.#templateSelector = templateSelector;
        this.#likeElement = likeElement;
        this.#createCardDelete = createCardDelete;
        this.#openPopupCards = openPopupCards;
    }

    #getTemplate() {
        return document.querySelector(this.#templateSelector).content.querySelector('.element').cloneNode(true);
    }

    //Создание карточки
    createCard() {
        // Клонируем содержимое тега <template>
        this.#cardsTemplateElement = this.#getTemplate();
        const cardsTemplateImage = this.#cardsTemplateElement.querySelector('.element__image');
        const cardsDeleteButton = this.#cardsTemplateElement.querySelector('.element__delete');
        const cardsGroupTemplate = this.#cardsTemplateElement.querySelector('.element__group');
        const cardsTemplateText = cardsGroupTemplate.querySelector('.element__text');
        const cardsButtonLike = cardsGroupTemplate.querySelector('.element__button');
        // Наполняем содержимым
        cardsTemplateText.textContent = this.#name;
        cardsTemplateImage.src = this.#link;
        cardsTemplateImage.alt = this.#name;
        //Функции для вызова на реакцию пользователя
        cardsButtonLike.addEventListener('click', () => this.#likeElement(cardsButtonLike));
        cardsDeleteButton.addEventListener('click', () => this.#createCardDelete(this.#cardsTemplateElement));
        cardsTemplateImage.addEventListener('click', () => this.#openPopupCards(cardsTemplateImage, cardsTemplateText));

        return this.#cardsTemplateElement;
    }
}
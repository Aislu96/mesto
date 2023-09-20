export class Card {
    #cardsTemplateElement;
    #templateSelector;
    #name;
    #link;
    #likeButton;
    #cardsDeleteButton;
    #cardsTemplateImage;
    #cardsTemplateText;
    #handelCardClick;
    #ownerId;
    #userId;
    #id;
    #popupButtonYes;
    #handelDeleteClick;
    #elementNumberLike;
    #likes;
    #deleteConfirmOpen;
    #handleLikeClick;
    #handleLikeClickDelete;

    constructor(name, link, id, likes, deleteConfirmOpen, handelCardClick, templateSelector, ownerId, userId, handleDeleteClick, handleLikeClick,
                handleLikeClickDelete) {
        this.#name = name;
        this.#link = link;
        this.#id = id;
        this.#likes = likes;
        this.#deleteConfirmOpen = deleteConfirmOpen;
        this.#templateSelector = templateSelector;
        this.#handelCardClick = handelCardClick;
        this.#ownerId = ownerId;
        this.#userId = userId;
        this.#handelDeleteClick = handleDeleteClick;
        this.#handleLikeClick = handleLikeClick;
        this.#handleLikeClickDelete = handleLikeClickDelete;
    }

    #deleteCardButton() {
        this.#handelDeleteClick(this);
    }

    #getTemplate() {
        return document.querySelector(this.#templateSelector).content.querySelector('.element').cloneNode(true);
    }


    addLike(data) {
        this.#likeButton.classList.add('element__button_active');
        this.#elementNumberLike.textContent = data['likes'].length;
    }

    deleteLike(data) {
        this.#likeButton.classList.remove('element__button_active');
        this.#elementNumberLike.textContent = data['likes'].length - 1;
    }

    #setEventListeners() {
        this.#likeButton.addEventListener('click', () => {
            if (this.#likeButton.className === 'element__button element__button_active') {
                this.#handleLikeClickDelete(this, this.#id);
            } else {
                this.#handleLikeClick(this, this.#id);
            }
        });
        this.#cardsTemplateImage.addEventListener('click', () => {
            this.#handelCardClick(this.#cardsTemplateImage, this.#cardsTemplateText)
        });
        this.#cardsDeleteButton.addEventListener('click', () => {
            this.#deleteConfirmOpen(this.#id);
            this.#deleteCardButton();
        });
    }

    //Создание карточки
    createCard() {
        // Клонируем содержимое тега <template>
        this.#popupButtonYes = document.querySelector('.popup__button');
        this.#cardsTemplateElement = this.#getTemplate();
        this.#cardsTemplateImage = this.#cardsTemplateElement.querySelector('.element__image');
        this.#cardsDeleteButton = this.#cardsTemplateElement.querySelector('.element__delete');
        if (this.#ownerId === this.#userId) {
            this.#cardsDeleteButton.classList.toggle('element__delete_active');
        }
        const cardsGroupTemplate = this.#cardsTemplateElement.querySelector('.element__group');
        this.#cardsTemplateText = cardsGroupTemplate.querySelector('.element__text');
        this.#likeButton = cardsGroupTemplate.querySelector('.element__button');
        this.#elementNumberLike = cardsGroupTemplate.querySelector('.element__number');
        this.#likes.forEach(el => {
            if (el['_id'] === this.#userId) {
                this.#likeButton.classList.add('element__button_active');
            }
        })
        this.#elementNumberLike.textContent = this.#likes.length;
        this.#cardsTemplateText.textContent = this.#name;
        this.#cardsTemplateImage.src = this.#link;
        this.#cardsTemplateImage.alt = this.#name;
        this.#setEventListeners();
        return this.#cardsTemplateElement;
    }

    removeCard() {
        this.#cardsTemplateElement.remove();
    }
}
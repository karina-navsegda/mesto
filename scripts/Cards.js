export class Card {
  constructor(data, templateSelector) {
    this._title = data.title;
    this._image = data.image;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__item")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners(cardElement) {
    const likeButton = cardElement.querySelector(".elements__like-button");
    const deleteButton = cardElement.querySelector(".elements__delete-button");

    likeButton.addEventListener("click", () => {
      this._handleLikeIcon(likeButton);
    });

    deleteButton.addEventListener("click", () => {
      this._handleDeleteCard(cardElement);
    });
  }

  _handleLikeIcon(likeButton) {
    likeButton.classList.toggle("elements__like-button_active");
  }

  _handleDeleteCard(cardElement) {
    cardElement.remove();
  }

  generateCard() {
    const cardElement = this._getTemplate();

    const cardImage = cardElement.querySelector(".elements__photo");
    const cardText = cardElement.querySelector(".elements__title");

    cardImage.src = this._image;
    cardImage.alt = this._title;
    cardText.textContent = this._title;

    this._setEventListeners(cardElement);

    return cardElement;
  }
}

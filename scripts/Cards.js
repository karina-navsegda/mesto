export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._cardElement = this._getTemplate();
    this._likeButton = this._cardElement.querySelector(
      ".elements__like-button"
    );
    this._deleteButton = this._cardElement.querySelector(
      ".elements__delete-button"
    );
    this._zoomPopupButton = this._cardElement.querySelector(".elements__photo");
    this._zoomImg = document.querySelector(".popup-zoom__photo");
    this._zoomTitle = document.querySelector(".popup-zoom__title");
    this._zoomPopup = document.querySelector(".popup-zoom");
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__item")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });

    this._zoomPopupButton.addEventListener("click", () => {
      this._handleOpenPopup();
    });
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle("elements__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
  }

  _handleOpenPopup() {
    this._zoomImg.src = this._link;
    this._zoomImg.alt = this._name;
    this._zoomTitle.textContent = this._name;
    this._zoomPopup.classList.add("popup_opened");
  }

  generateCard() {
    this._setEventListeners();

    this._cardElement.querySelector(".elements__photo").src = this._link;
    this._cardElement.querySelector(".elements__photo").alt = this._name;
    this._cardElement.querySelector(".elements__title").textContent =
      this._name;

    return this._cardElement;
  }
}

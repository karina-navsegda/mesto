export class Card {
  constructor(data, templateSelector, handleCardClick) {
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

  //  this._handleOpenPopup= handleOpenPopup;
  this._handleCardClick = handleCardClick;


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

   this._zoomPopupButton.addEventListener('click', () =>{ 
      this._handleCardClick(this._name, this._link); 
      console.log(this._name);
      console.log(this._link);
    });  
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle("elements__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
  }

  generateCard() {
    this._setEventListeners();

    this._zoomPopupButton.src = this._link;
    this._zoomPopupButton.alt = this._name;
    this._cardElement.querySelector(".elements__title").textContent =
      this._name;

    return this._cardElement;
  }
}

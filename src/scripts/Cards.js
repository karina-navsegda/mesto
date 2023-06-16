export class Card {
  constructor(data, templateSelector, handleCardClick, deletePopup, changeLike) {
    console.log(data);
    this._name = data.name;
    this._link = data.link;
    this._myId = data.myid;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._likes = data.likes;
    this._likesCount = data.likes.length;
    this._templateSelector = templateSelector;
    this._deletePopup = deletePopup;
    this._changeLike = changeLike;
    this._cardElement = this._getTemplate();
    this._likesCounter = this._cardElement.querySelector(".elements__like-counter");
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

_checkDeleteButton() {

 this._myId === this._ownerId ? this._deleteButton.style.display = 'block' : this._deleteButton.style.display = 'none'; 
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
      this._handleCardClick(); 
    });  
  }

  _checkLikes() {
    this._likes.forEach(element => {
      if (element._id === this._myId) {
        this._likeButton.classList.add("elements__like-button_active");
        return
      }
    })
    this._likesCounter.textContent = this._likesCount;

  }

  _handleLikeIcon = () => {
   this._changeLike(this._likeButton, this._cardId);
    // this._likeButton.classList.toggle("elements__like-button_active");
  }

  _handleDeleteCard() {
    this._deletePopup({ card: this, cardId: this._cardId });
   /* this._deleteCard(this); */
  }

  toggleLike(likes) {
    this._likeButton.classList.toggle('elements__like-button_active');
    this._likesCounter.textContent = likes.length
  }

  removeCard() {
    this._cardElement.remove();
  }

  generateCard() {
    this._setEventListeners();
    
    this._zoomPopupButton.src = this._link;
    this._zoomPopupButton.alt = this._name;
    this._cardElement.querySelector(".elements__title").textContent =
      this._name;
    this._checkDeleteButton();
    this._checkLikes();

    return this._cardElement;
  }
}


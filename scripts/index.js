let popup = document.querySelector(".popup");
let popupPlace = document.querySelector(".popup-place");

let openPopupButton = document.querySelector(".profile__edit-button");
let closePopupButton = document.querySelector(".popup__close");
let closePopupPlaceButton = popupPlace.querySelector(".popup__close");
let formElement = document.querySelector(".popup__form");

let nameInput = document.querySelector(".popup__item_type_username");
let jobInput = document.querySelector(".popup__item_type_description");

let profileName = document.querySelector(".profile__name");
let jobName = document.querySelector(".profile__subtitle");

let addPopupButton = document.querySelector(".profile__add-button");

let imgInput = document.querySelector(".popup__item_type_link");
let placeName = document.querySelector(".popup__item_type_place-name");

let cardTitle = document.querySelector(".elements__title");
let cardLink = document.querySelector(".elements__photo");

let formElementPlace = popupPlace.querySelector(".popup__form");

function openPopup() {
  popup.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = jobName.textContent;
}
function closePopup() {
  popup.classList.remove("popup_opened");
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  jobName.textContent = jobInput.value;

  closePopup();
}

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const page = document.querySelector(".elements");

// initialCards.forEach(function createCard(card) {
function createCard(card) {
  const newCard = document.querySelector(".template").content.cloneNode(true);
  const cardHeading = newCard.querySelector(".elements__title");
  cardHeading.textContent = card.name;
  const cardImage = newCard.querySelector(".elements__photo");
  const deleteCardButton = newCard.querySelector(".elements__delete-button");
  const likeCardButton = newCard.querySelector(".elements__like-button");
  likeCardButton.addEventListener("click", likeCard);
  cardImage.setAttribute("src", card.link);
  deleteCardButton.addEventListener("click", deleteCard);
  cardImage.addEventListener("click", zoomIn);
  // page.append(newCard);
  return newCard;
}

function renderCard(card, page) {
  const newCard = createCard(card);
  page.prepend(newCard);
}

initialCards.forEach((card) => {
  const cardItem = createCard(card);
  page.appendChild(cardItem);
});

function likeCard(evt) {
  evt.target.classList.toggle("elements__like-button_active");
}

function deleteCard(evt) {
  evt.target.closest(".elements__item").remove();
}

function openPopupPlace() {
  popupPlace.classList.add("popup_opened");
}

function closePopupPlace() {
  popupPlace.classList.remove("popup_opened");
}
function addNewCard(evt) {
  evt.preventDefault();
  const cardTitle = placeName.value;
  const cardLink = imgInput.value;

  const newCard = {
    name: cardTitle,
    link: cardLink,
  };
  renderCard(newCard, page);
  closePopupPlace();
}

openPopupButton.addEventListener("click", openPopup);
closePopupButton.addEventListener("click", closePopup);
formElement.addEventListener("submit", handleFormSubmit);

closePopupPlaceButton.addEventListener("click", closePopupPlace);
addPopupButton.addEventListener("click", openPopupPlace);
formElementPlace.addEventListener("submit", addNewCard);

const zoomPopup = document.querySelector(".zoom");
const zoomImg = document.querySelector(".zoom__photo");
const zoomTitile = document.querySelector(".zoom__title");

function zoomIn(evt) {
  zoomPopup.classList.add("popup_opened");
  zoomImg.src = evt.target.src;
  const cardName = evt.target
    .closest(".elements__item")
    .querySelector(".elements__title").textContent;
  zoomTitile.textContent = cardName;
}

const zoomClose = document.querySelector(".zoom__close-button");

function closeZoom() {
  zoomPopup.classList.remove("popup_opened");
}

zoomClose.addEventListener("click", closeZoom);

import { Card } from "./Cards.js";
import { FormValidator, enableValidation } from "./FormValidator.js";

const popup = document.querySelector(".popup");
const popupAll = document.querySelectorAll(".popup");

const popupEdit = document.querySelector(".popup-edit");
const popupPlace = document.querySelector(".popup-place");

const openPopupButton = document.querySelector(".profile__edit-button");
const closePopupButton = document.querySelector(".popup__close");
const closePopupPlaceButton = popupPlace.querySelector(".popup__close");
const addPopupButton = document.querySelector(".profile__add-button");
const formEditProfile = document.querySelector(".popup__form");

const nameInput = document.querySelector(".popup__item_type_username");
const jobInput = document.querySelector(".popup__item_type_description");

const profileName = document.querySelector(".profile__name");
const jobName = document.querySelector(".profile__subtitle");

const imgInput = document.querySelector(".popup__item_type_link");
const placeName = document.querySelector(".popup__item_type_place-name");

const cardTitle = document.querySelector(".elements__title");
const cardLink = document.querySelector(".elements__photo");

const formElementPlace = popupPlace.querySelector(".popup__form");
const buttonSubmitAddCardForm = popupPlace.querySelector(".popup__button");

function openPopup(popupName) {
  popupName.classList.add("popup_opened");
  document.addEventListener("keydown", escapeClose);
}

function closePopup(popupName) {
  popupName.classList.remove("popup_opened");
  document.addEventListener("keydown", escapeClose);
}

function openPopupEdit() {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = jobName.textContent;
}

function submitEditProfilePopup(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  jobName.textContent = jobInput.value;

  closePopup(popupEdit);
}

function escapeClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

const initialCards = [
  {
    title: "Архыз",
    image:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    title: "Челябинская область",
    image:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    title: "Иваново",
    image:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    title: "Камчатка",
    image:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    title: "Холмогорский район",
    image:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    title: "Байкал",
    image:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const page = document.querySelector(".elements");

const editFormValidator = new FormValidator(enableValidation, popupEdit);
editFormValidator.enableValidation;

const cardFormValidator = new FormValidator(enableValidation, popupPlace);
cardFormValidator.enableValidation;

initialCards.forEach((card) => {
  const cardItem = new Card(card, ".template");
  page.appendChild(cardItem.generateCard());
});

function handleFormSubmitCard(evt) {
  evt.preventDefault();

  const newCard = {
    title: placeName.value,
    image: imgInput.value,
    alt: placeName.value,
  };

  const cardElement = new Card(newCard, ".template").generateCard();
  page.prepend(cardElement);
  console.log(placeName.value);

  closePopup(popupPlace);
}

formElementPlace.addEventListener("submit", handleFormSubmitCard);

openPopupButton.addEventListener("click", openPopupEdit);
closePopupButton.addEventListener("click", function () {
  closePopup(popupEdit);
});
formEditProfile.addEventListener("submit", submitEditProfilePopup);

closePopupPlaceButton.addEventListener("click", function () {
  closePopup(popupPlace);
});
addPopupButton.addEventListener("click", function () {
  openPopup(popupPlace);
});

popupAll.forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      closePopup(popup);
    }
  });
});

const zoomPopup = document.querySelector(".popup-zoom");
const zoomImg = document.querySelector(".popup-zoom__photo");
const zoomTitile = document.querySelector(".popup-zoom__title");

function zoomIn(evt) {
  openPopup(zoomPopup);
  zoomImg.src = evt.target.src;
  const cardAlt = evt.target.getAttribute("alt");
  zoomImg.setAttribute("alt", cardAlt);
  const cardName = evt.target
    .closest(".elements__item")
    .querySelector(".elements__title").textContent;
  zoomTitile.textContent = cardName;
}

const zoomClose = document.querySelector(".popup-zoom__close-button");

zoomClose.addEventListener("click", function () {
  closePopup(zoomPopup);
});

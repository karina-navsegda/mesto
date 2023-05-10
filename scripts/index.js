import { Card } from "./Cards.js";
import { FormValidator } from "./FormValidator.js";

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

const formElementPlace = popupPlace.querySelector(".popup__form");

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
    closePopup(openedPopup);
  }
}

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    alt: "Архыз",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    alt: "Челябинская область",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    alt: "Иваново",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    alt: "Камчатка",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    alt: "Холмогорский район",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    alt: "Байкал",
  },
];

const page = document.querySelector(".elements");

const validationEnable = {
  formSelector: ".popup__form",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__item_type_error",
  errorClass: "popup__input-error_active",
};

const editFormValidator = new FormValidator(validationEnable, popupEdit);
editFormValidator.enableValidation;

const cardFormValidator = new FormValidator(validationEnable, popupPlace);
cardFormValidator.enableValidation;

const formElements = document.querySelectorAll(validationEnable.formSelector);
formElements.forEach((formElement) => {
  const formValidator = new FormValidator(validationEnable, formElement);
  formValidator.enableValidation();
});

initialCards.forEach((card) => {
  const cardItem = new Card(card, ".template");
  page.append(cardItem.generateCard());
});

function handleFormSubmitCard(evt) {
  evt.preventDefault();

  const newCard = {
    name: placeName.value,
    link: imgInput.value,
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
const zoomClose = document.querySelector(".popup-zoom__close-button");

zoomClose.addEventListener("click", function () {
  closePopup(zoomPopup);
});

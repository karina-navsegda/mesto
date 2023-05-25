import '../pages/index.css';

import { Card } from "../scripts/Cards.js";
import { FormValidator } from "../scripts/FormValidator.js";
import { Section } from "../scripts/Section.js";
import { Popup } from "../scripts/Popup.js";
import { PopupWithForm } from "../scripts/PopupWithForm.js";
import { UserInfo } from "../scripts/UserInfo.js";
import { PopupWithImage } from "../scripts/PopupWithImage.js";

const popupAll = document.querySelectorAll(".popup");

const popupEdit = document.querySelector(".popup-edit");
const popupPlace = document.querySelector(".popup-place");
const popupZoom = document.querySelector(".popup-zoom");

const openPopupEditButton = document.querySelector(".profile__edit-button");
const closePopupEditButton = popupEdit.querySelector(".popup__close");
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

function closePopup(popupName) {
  popupName.classList.remove("popup_opened");
  document.removeEventListener("keydown", escapeClose);
}

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

function openPopupEdit() {
  popupEditProfile.open();
  popupEditProfile.setEventListeners();
  editFormValidator.resetValidation();

 nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().about;
}

const popupEditProfile = new PopupWithForm(".popup-edit", (formData) => {
  console.log(formData);
});
openPopupEditButton.addEventListener("click", openPopupEdit);

addPopupButton.addEventListener("click", function () {
  popupAddPlace.open();
  popupAddPlace.setEventListeners();
  cardFormValidator.resetValidation();
  imgInput.value = "";
  placeName.value = "";
});

const popupAddPlace = new PopupWithForm(".popup-place", (formData) => {
  console.log(formData);
});

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


const zoomCard = new PopupWithImage('.popup-zoom');
zoomCard.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__subtitle'
});


const section = new Section(
  {
    data: initialCards,
    renderer: (item) => {
     const card = new Card(item, ".template", (name, link) => {
      zoomCard.open(item);
     })
     const cardElement = card.generateCard();
     section.setItem(cardElement);
    },
  },
  ".elements"
);


console.log(section);
section.renderItems();

function handleFormSubmitCard(evt) {
  evt.preventDefault();

  const newCard = {
    name: placeName.value,
    link: imgInput.value,
    alt: placeName.value,
  };
  addCard(page, createCard(newCard));
  console.log(newCard);
  closePopup(popupPlace);
}

formElementPlace.addEventListener("submit", handleFormSubmitCard);
closePopupEditButton.addEventListener("click", function () {
  closePopup(popupEdit);
});
formEditProfile.addEventListener("submit", submitEditProfilePopup);

closePopupPlaceButton.addEventListener("click", function () {
  closePopup(popupPlace);
});



popupAll.forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      closePopup(popup);
    }
  });
});

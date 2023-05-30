import '../pages/index.css';

import { Card } from "../scripts/Cards.js";
import { FormValidator } from "../scripts/FormValidator.js";
import { Section } from "../scripts/Section.js";
import { PopupWithForm } from "../scripts/PopupWithForm.js";
import { UserInfo } from "../scripts/UserInfo.js";
import { PopupWithImage } from "../scripts/PopupWithImage.js";

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
const popupEdit = document.querySelector(".popup-edit");
const popupPlace = document.querySelector(".popup-place");

const popupEditOpenButton = document.querySelector(".profile__edit-button");
const popupEditCloseButton = popupEdit.querySelector(".popup__close");
const popupPlaceCloseButton = popupPlace.querySelector(".popup__close");
const popupAddButton = document.querySelector(".profile__add-button");
const formEditProfile = document.querySelector(".popup__form");

const nameInput = document.querySelector(".popup__item_type_username");
const jobInput = document.querySelector(".popup__item_type_description");

const imgInput = document.querySelector(".popup__item_type_link");
const placeName = document.querySelector(".popup__item_type_place-name");

const formElementPlace = popupPlace.querySelector(".popup__form");

const validationEnable = {
  formSelector: ".popup__form",
  inputSelector: ".popup__item",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__item_type_error",
  errorClass: "popup__input-error_active",
};

const editFormValidator = new FormValidator(validationEnable, popupEdit);
editFormValidator.enableValidation();

const cardFormValidator = new FormValidator(validationEnable, popupPlace);
cardFormValidator.enableValidation();

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
popupEditOpenButton.addEventListener("click", openPopupEdit);
popupEditProfile.setEventListeners();

popupAddButton.addEventListener("click", function () {
  popupAddPlace.open();
  popupAddPlace.setEventListeners();
  cardFormValidator.resetValidation();
  imgInput.value = "";
  placeName.value = "";
});

const popupAddPlace = new PopupWithForm(".popup-place", (formData) => {
  console.log(formData);
});
popupAddPlace.setEventListeners();

function submitEditProfilePopup(evt) {
  evt.preventDefault();
userInfo.setUserInfo();
popupEditProfile.close();
}



const page = document.querySelector(".elements");


const zoomCard = new PopupWithImage('.popup-zoom');
zoomCard.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__subtitle'
});

function createCard(item) { 
  const card = new Card(item, ".template", (name, link) => {
  zoomCard.open(item);});
  return card.generateCard();
 };

const cardsContainer = new Section({ data: initialCards, renderer: renderCard }, ".elements");

console.log(cardsContainer);
cardsContainer.renderItems();

function renderCard(item) {
  const cardElement = createCard(item);
  cardsContainer.addItem(cardElement);
}

function handleFormSubmitCard(evt) {
  evt.preventDefault();

  const newCard = {
    name: placeName.value,
    link: imgInput.value,
    alt: placeName.value,
  };
 cardsContainer.addItem(newCard);
  console.log(newCard);
  popupAddPlace.close();
}

formElementPlace.addEventListener("submit", handleFormSubmitCard);
popupEditCloseButton.addEventListener("click", function () {
  popupEditProfile.close();
});
formEditProfile.addEventListener("submit", submitEditProfilePopup);

popupPlaceCloseButton.addEventListener("click", function () {
  popupAddPlace.close();
});

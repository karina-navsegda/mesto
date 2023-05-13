import { Card } from "./Cards.js";
import { FormValidator } from "./FormValidator.js";


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

const zoomImg = document.querySelector(".popup-zoom__photo");
const zoomTitle = document.querySelector(".popup-zoom__title");


function openPopup(popupName) {
  popupName.classList.add("popup_opened");
  document.addEventListener("keydown", escapeClose);
}

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

  openPopup(popupEdit);
  editFormValidator.resetValidation();

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

function handleOpenPopup(name, link) {
 zoomImg.src = link; 
  zoomImg.alt = name; 
  zoomTitle.textContent = name; 
  openPopup(popupZoom); 
}   


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const page = document.querySelector(".elements");



function createCard(element) {
  const card = new Card(element, ".template", handleOpenPopup);
  const cardItem = card.generateCard();
  return cardItem;
}

function addCard(container, card) {
  container.prepend(card);
}

initialCards.forEach((element) => {
 addCard(page, createCard(element));
});

function handleFormSubmitCard(evt) {
  evt.preventDefault();

  const newCard = {
    name: placeName.value,
    link: imgInput.value,
    alt: placeName.value,
  };

 // createCard(newCard);
  addCard(page, createCard(newCard)); 
  console.log(newCard);
  closePopup(popupPlace);
}

formElementPlace.addEventListener("submit", handleFormSubmitCard);

openPopupEditButton.addEventListener("click", openPopupEdit);
closePopupEditButton.addEventListener("click", function () {
  closePopup(popupEdit);
});
formEditProfile.addEventListener("submit", submitEditProfilePopup);

closePopupPlaceButton.addEventListener("click", function () {
  closePopup(popupPlace);
});
addPopupButton.addEventListener("click", function () {
  openPopup(popupPlace);
  cardFormValidator.resetValidation();
  imgInput.value = '';
  placeName.value = '';
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

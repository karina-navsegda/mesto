import "../pages/index.css";

import { Card } from "../scripts/Cards.js";
import { FormValidator } from "../scripts/FormValidator.js";
import { Section } from "../scripts/Section.js";
import { PopupWithForm } from "../scripts/PopupWithForm.js";
import { UserInfo } from "../scripts/UserInfo.js";
import { PopupWithImage } from "../scripts/PopupWithImage.js";
import { Api } from "../scripts/Api.js";
import { PopupWithDelete } from "../scripts/PopupWithDelete.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-68",
  headers: {
    authorization: "e00d62af-84dc-4f42-9fe9-f9707f668d85",
    "Content-Type": "application/json",
  },
});

const popupEdit = document.querySelector(".popup-edit");
const popupPlace = document.querySelector(".popup-place");
const popupAvatar = document.querySelector(".popup-profile");

const popupEditOpenButton = document.querySelector(".profile__edit-button");
const popupAddButton = document.querySelector(".profile__add-button");
const popupNewAvatar = document.querySelector(".profile__overlay-button");

const nameInput = document.querySelector(".popup__item_type_username");
const jobInput = document.querySelector(".popup__item_type_description");

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

const avatarFormValidator = new FormValidator(validationEnable, popupAvatar);
avatarFormValidator.enableValidation();

function openPopupEdit() {
  popupEditProfile.open();
  editFormValidator.resetValidation();

  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().about;
}

popupEditOpenButton.addEventListener("click", openPopupEdit);

popupAddButton.addEventListener("click", function () {
  popupAddPlace.open();
  cardFormValidator.resetValidation();
});

popupNewAvatar.addEventListener("click", function () {
  popupAddAvatar.open();
  avatarFormValidator.resetValidation();
});

const popupAddPlace = new PopupWithForm(".popup-place", handleFormSubmitCard);
const popupEditProfile = new PopupWithForm(
  ".popup-edit",
  handleFormSubmitProfile
);

const popupAddAvatar = new PopupWithForm(
  ".popup-profile",
  handleFormSubmitAvatar
);
const popupDelete = new PopupWithDelete(".popup-delete", ({ card, cardId }) => {
  api
    .deleteCard(cardId)
    .then(() => {
      card.removeCard();
      popupDelete.close();
    })
    .catch((error) => console.log(`Ошибка: ${error}`))
    .finally();
});

popupEditProfile.setEventListeners();
popupAddPlace.setEventListeners();
popupAddAvatar.setEventListeners();
popupDelete.setEventListeners();

const imagePopup = new PopupWithImage(".popup-zoom");
imagePopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__subtitle",
  avatarSelector: ".profile__avatar",
});

 function createCard(item) {
  const card = new Card(
    item,
    ".template",
    () => {
      imagePopup.open(item);
    },
    popupDelete.openPopup,
    (isLiked, cardId) => {
     const liked = card.isLiked();
      if (liked) {
        api
          .removeLike(cardId)
          .then((res) => {
            card.toggleLike(res.likes);
          })
          .catch((error) => console.log(`Ошибка: ${error}`));
      } else {
        api
          .addLike(cardId)
          .then((res) => {
            card.toggleLike(res.likes);
          })
          .catch((error) => console.log(`Ошибка: ${error}`));
      }
    }
  );
  return card.generateCard();
} 
  
const cardsContainer = new Section((element) => {
  cardsContainer.addItem(createCard(element));
}, ".elements");

function handleFormSubmitCard(data) {
  Promise.all([api.setCard(data)])
    .then(([dataCard]) => {
      dataCard.myid = dataCard.owner._id;
      cardsContainer.addItem(createCard(dataCard));
      popupAddPlace.close();
    })
    .catch((error) => console.log(`Ошибка: ${error}`))
    .finally(() => popupAddPlace.setButtonText());
}

function handleFormSubmitProfile(data) {
  api
    .setProfile(data)
    .then((res) => {
      userInfo.setUserInfo({
        name: res.name,
        about: res.about,
        avatar: res.avatar
      });
      popupEditProfile.close();
    })
    .catch((error) => console.log(`Ошибка: ${error}`))
    .finally(() => popupEditProfile.setButtonText());

}

function handleFormSubmitAvatar(data) {
  api
    .setAvatarImg(data)
    .then((res) => {
      userInfo.setUserInfo({
        name: res.name,
        about: res.about,
        avatar: res.avatar,
      });
      popupAddAvatar.close();
    })
    .catch((error) => console.log(`Ошибка: ${error}`))
    .finally(() => popupAddAvatar.setButtonText());

}

Promise.all([api.getProfile(), api.getCards()])
  .then(([dataUser, dataCard]) => {
    userInfo.setUserInfo({
      name: dataUser.name,
      about: dataUser.about,
      avatar: dataUser.avatar,
    });
    dataCard.forEach((element) => (element.myid = dataUser._id));
    cardsContainer.renderItems(dataCard);
    console.log(dataUser);
  })
  .catch((error) => console.log(`Ошибка: ${error}`));

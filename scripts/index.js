const popup = document.querySelector(".popup");
const popupAll = document.querySelectorAll('.popup')

const popupEdit = document.querySelector(".popup-edit");
const popupPlace = document.querySelector(".popup-place");

const openPopupButton = document.querySelector(".profile__edit-button");
const closePopupButton = document.querySelector(".popup__close");
const closePopupPlaceButton = popupPlace.querySelector(".popup__close");
const addPopupButton = document.querySelector(".profile__add-button");
const formElement = document.querySelector(".popup__form");

const nameInput = document.querySelector(".popup__item_type_username");
const jobInput = document.querySelector(".popup__item_type_description");

const profileName = document.querySelector(".profile__name");
const jobName = document.querySelector(".profile__subtitle");

const imgInput = document.querySelector(".popup__item_type_link");
const placeName = document.querySelector(".popup__item_type_place-name");

const cardTitle = document.querySelector(".elements__title");
const cardLink = document.querySelector(".elements__photo");

const formElementPlace = popupPlace.querySelector(".popup__form");

function openPopup(popupName) {
  popupName.classList.add('popup_opened');
  document.addEventListener("keydown", escapeClose);
}

function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  document.addEventListener("keydown", escapeClose);
}

function openPopupEdit() {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = jobName.textContent;
}

function handleFormSubmit(evt) {
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
    alt:   "Иваново",
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

function createCard(card) {
  const newCard = document.querySelector(".template").content.cloneNode(true);
  const cardHeading = newCard.querySelector(".elements__title");
  cardHeading.textContent = card.name;
  const cardImage = newCard.querySelector(".elements__photo");
  const deleteCardButton = newCard.querySelector(".elements__delete-button");
  const likeCardButton = newCard.querySelector(".elements__like-button");
  likeCardButton.addEventListener("click", likeCard);
  cardImage.setAttribute("src", card.link);
  cardImage.setAttribute('alt', card.alt)
  deleteCardButton.addEventListener("click", deleteCard);
  cardImage.addEventListener("click", zoomIn);
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

function addNewCard(evt) {
  evt.preventDefault();
  const cardTitle = placeName.value;
  const cardLink = imgInput.value;

  const newCard = {
    name: cardTitle,
    link: cardLink,
    alt: cardTitle,
  };
  renderCard(newCard, page);
  closePopup(popupPlace);
  placeName.value = '';
  imgInput.value = '';
}

openPopupButton.addEventListener("click", openPopupEdit);
closePopupButton.addEventListener("click", function() {
  closePopup(popupEdit);
});
formElement.addEventListener("submit", handleFormSubmit);

closePopupPlaceButton.addEventListener("click", function() {
  closePopup(popupPlace);
});;
addPopupButton.addEventListener("click", function() {
  openPopup(popupPlace);
});;
formElementPlace.addEventListener("submit", addNewCard);

popupAll.forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      popup.classList.remove("popup_opened");
    }
  });
});


const zoomPopup = document.querySelector(".popup-zoom");
const zoomImg = document.querySelector(".popup-zoom__photo");
const zoomTitile = document.querySelector(".popup-zoom__title");

function zoomIn(evt) {
  openPopup(zoomPopup);
  zoomImg.src = evt.target.src;
  const cardName = evt.target
    .closest(".elements__item")
    .querySelector(".elements__title").textContent;
  zoomTitile.textContent = cardName;
}

const zoomClose = document.querySelector(".popup-zoom__close-button");

zoomClose.addEventListener("click", function() {
  closePopup(zoomPopup);
});


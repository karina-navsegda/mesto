let popup = document.querySelector('.popup');

let openPopupButton = document.querySelector('.profile__edit-button');
let closePopupButton = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');

let nameInput = document.querySelector('.popup__item_type_username');

let jobInput = document.querySelector('.popup__item_type_description');

let profileName = document.querySelector('.profile__name');
let jobName = document.querySelector('.profile__subtitle');

function openPopup(evt) {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = jobName.textContent;

}
function closePopup(evt) {
  popup.classList.remove('popup_opened');
}


function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  jobName.textContent = jobInput.value;

  popup.classList.remove('popup_opened');
}


openPopupButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
formElement.addEventListener("submit", handleFormSubmit);

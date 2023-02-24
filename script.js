let popup = document.querySelector(".popup");

let openPopupButtons = document.querySelectorAll(".profile__edit-button");
let closePopupButton = document.querySelector(".popup__close");

openPopupButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    popup.classList.add("popup__opened");
  });
});
closePopupButton.addEventListener("click", () => {
  popup.classList.remove("popup__opened");
});
let formElement = document.querySelector(".popup__form");

let nameInput = document.querySelector(".popup__username");

let jobInput = document.querySelector(".popup__description");

let profileName = document.querySelector(".profile__name");
let jobName = document.querySelector(".profile__subtitle");

nameInput.value = profileName.textContent;
jobInput.value = jobName.textContent;

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  jobName.textContent = jobInput.value;

  popup.classList.remove("popup__opened");
}

formElement.addEventListener("submit", handleFormSubmit);

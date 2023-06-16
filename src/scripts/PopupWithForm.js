import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__item");
    this._submitButton = this._form.querySelector(".popup__button");
    this._buttonText =   this._submitButton.textContent;
  }

  _getInputValues() {
    {
      const inputValues = {};

      this._inputList.forEach((input) => {
        inputValues[input.name] = input.value;
      });

      return inputValues;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitButton.textContent = `${this._submitButton.textContent}...`
      this._submitCallback(this._getInputValues());
   //   this.close();
    });
  }

  setButtonText() {
   this._submitButton.textContent = this._buttonText;
  }

  close() {
    super.close();
    this._form.reset();
  }
}

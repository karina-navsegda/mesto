export class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._config = config;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    this._submitButton = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._config.errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState() {
  const hasInvalidInput = this._inputList.some(
      (input) => !input.validity.valid
    ); 
    if (hasInvalidInput) {
  this._disableButton();
    } else {
   this._enableButton();  
    }
    console.log(hasInvalidInput);
  } 

  _disableButton() {
    this._submitButton.classList.add(this._config.inactiveButtonClass);
      this._submitButton.disabled = true;
  }

  _enableButton() {
    this._submitButton.classList.remove(this._config.inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });

  this._toggleButtonState();
  }

  enableValidation() {
    this._setEventListeners();
    
  }

  resetValidation() {  
    this._inputList.forEach(inputElement => {
    this._hideInputError(inputElement);

   this._disableButton();
  });

    console.log('uuuuuu');
  }
}

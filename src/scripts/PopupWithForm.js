import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
      super(popupSelector);
      this._submitCallback = submitCallback;
      this._form = this._popup.querySelector('.popup__form');
      console.log(this._form);
    }
  
    _getInputValues() {
      const inputs = Array.from(this._form.querySelectorAll('.popup__input'));
      return inputs.reduce((values, input) => {
        values[input.name] = input.value;
        return values;
      }, {});
    }
  
    setEventListeners() {
      super.setEventListeners();
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._submitCallback(this._getInputValues());
        this.close();
      });
    }
  
    close() {
      super.close();
      this._form.reset();
    }
  }
  
 /* // Пример создания экземпляра класса PopupWithForm
  const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', (formData) => {
    // Обработчик сабмита формы
    console.log(formData);
  });
  popupEditProfile.setEventListeners(); */
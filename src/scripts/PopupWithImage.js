import { Popup } from './Popup.js'
/* export class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
      this._popupImage = this._popup.querySelector('.popup-zoom__photo');
      this._popupCaption = this._popup.querySelector('.popup-zoom__title');
    }
  
    open = ({name, link}) => {
      this._popupImage.src = link;
      this._popupCaption.textContent = name;
      this._popupImage.alt = name;
      super.open()
      console.log(this._popupImage);
    } 
    open(data) {
      this._popupImage.src = data.link;
      this._popupImage.alt = data.name;
      this._popupCaption.textContent = data.name;
      super.open();
      console.log(data);
    }

  } */

  export class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
      this._popupImage = this._popup.querySelector('.popup-zoom__photo');
      this._popupCaption = this._popup.querySelector('.popup-zoom__title');
    }

    open = (data) => {
      this._popupImage.src = data.link;
      this._popupCaption.textContent = data.name;
      this._popupImage.alt = data.name;
      super.open()
      console.log(this._popupImage);
    } 
  }
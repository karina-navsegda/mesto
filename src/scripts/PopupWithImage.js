import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup-zoom__photo");
    this._popupCaption = this._popup.querySelector(".popup-zoom__title");
  }

  open = (data) => {
    this._popupImage.src = data.link;
    this._popupCaption.textContent = data.name;
    this._popupImage.alt = data.name;
    super.open();
    console.log(this._popupImage);
  };
}

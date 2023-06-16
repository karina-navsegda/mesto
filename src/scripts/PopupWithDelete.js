import { Popup } from "./Popup.js";

export class PopupWithDelete extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this._submitCallback = submitCallback;
    }

    setEventListeners(){
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._submitCallback({card: this._element, cardId: this._cardId});
    });
    }

    openPopup = ({card, cardId}) => {
        super.open();
        this._element = card;
        this._cardId = cardId;
    }
}
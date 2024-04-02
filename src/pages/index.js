export const cardContainer = document.querySelector(".places__list");

import {
  initialCards,
  createCard,
  deleteCard,
  activatelike,
  addEventHandlers,
  newCardForm,
} from "../components/cards.js";
import "./index.css";
import {
  openPopup,
  closePopup,
  openPopopImage,
  handleFormSubmit,
} from "../components/modal.js";

initialCards.forEach(function (card) {
  cardContainer.append(createCard(card, activatelike, openPopopImage));
});

const formElement = document.querySelector(".popup__form");
formElement.addEventListener("submit", handleFormSubmit);

document.addEventListener("mousedown", function (evt) {
  if (evt.target.classList.contains("popup_is-opened")) {
    closePopup();
  }
});

newCardForm.addEventListener("submit", addEventHandlers);

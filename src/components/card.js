import { closePopup } from "./modal.js";
import { cardContainer } from "../pages/index.js";

const newCardForm = document.getElementsByName("new-place")[0];
const placeNameInput = document.querySelector(".popup__input_type_card-name");
const linkInput = document.querySelector(".popup__input_type_url");

function createCard(card, activatelike, openPopopImage, deleteCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__title").textContent = card.name;
  cardElement.querySelector(".card__image").alt = card.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
    deleteCard(cardElement);
  });

  cardContainer.addEventListener("click", activatelike);
  cardContainer.addEventListener("click", openPopopImage);
  return cardElement;
}

function deleteCard(element) {
  element.remove();
}

function activatelike(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}

export {
  createCard,
  deleteCard,
  activatelike,
  newCardForm,
  placeNameInput,
  linkInput,
};

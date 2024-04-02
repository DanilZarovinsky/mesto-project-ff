export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

import { closePopup } from "./modal.js";
import { cardContainer } from "../pages/index.js";

const newCardForm = document.getElementsByName("new-place")[0];
const placeNameInput = document.querySelector(".popup__input_type_card-name");
const linkInput = document.querySelector(".popup__input_type_url");

function createCard(card, activatelike, openPopopImage) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__title").textContent = card.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
    deleteCard(cardElement);
  });

  cardContainer.addEventListener("click", activatelike);
  cardContainer.addEventListener("click", openPopopImage);
  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function activatelike(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}

function addEventHandlers(evt) {
  evt.preventDefault();
  const placeNameValue = placeNameInput.value;
  const linkValue = linkInput.value;
  const newCard = [];
  newCard.name = placeNameValue;
  newCard.link = linkValue;
  cardContainer.prepend(createCard(newCard));
  closePopup();
  newCardForm.reset();
}

export { createCard, deleteCard, activatelike, addEventHandlers, newCardForm };

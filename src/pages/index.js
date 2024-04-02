export const cardContainer = document.querySelector(".places__list");
import { initialCards } from "../components/cards.js";
import {
  createCard,
  deleteCard,
  activatelike,
  newCardForm,
  placeNameInput,
  linkInput,
} from "../components/card.js";
import "./index.css";
import {
  openPopup,
  closePopup,
  openPopopImage,
  closePopupByOverlay,
} from "../components/modal.js";

Array.from(document.querySelectorAll(".popup__close")).forEach(function (
  element
) {
  element.addEventListener("click", () =>
    closePopup(element.closest(".popup"))
  );
});

initialCards.forEach(function (card) {
  cardContainer.append(
    createCard(card, activatelike, openPopopImage, deleteCard)
  );
});

document.addEventListener("mousedown", closePopupByOverlay);

function handleAddEvent(evt) {
  evt.preventDefault();
  const placeNameValue = placeNameInput.value;
  const linkValue = linkInput.value;
  const newCard = [];
  newCard.name = placeNameValue;
  newCard.link = linkValue;
  cardContainer.prepend(
    createCard(newCard, activatelike, openPopopImage, deleteCard)
  );
  closePopup(newCardForm.closest(".popup_is-opened"));
  newCardForm.reset();
}

newCardForm.addEventListener("submit", handleAddEvent);

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobvalue = jobInput.value;
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobvalue;
  closePopup(popupEditProfile.closest(".popup_is-opened"));
}

const popupEditProfile = document.getElementById("popup__form");
popupEditProfile.addEventListener("submit", handleFormSubmitEdit);

const profileEdit = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const profileAdd = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");

profileEdit.addEventListener("click", () => {
  openPopup(popupEdit);
  const profileTitle = document.querySelector(".profile__title").textContent;
  const profileDescription = document.querySelector(
    ".profile__description"
  ).textContent;
  const popupInputName = document.querySelector(".popup__input_type_name");
  const popupInputDescription = document.querySelector(
    ".popup__input_type_description"
  );
  popupInputName.value = profileTitle;
  popupInputDescription.value = profileDescription;
});

profileAdd.addEventListener("click", () => {
  openPopup(popupNewCard);
});

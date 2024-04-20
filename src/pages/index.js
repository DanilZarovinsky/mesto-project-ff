import { sendUserData, addNewCard,sendNewAvatar } from "../components/api.js";
import {
  createCard,
  deleteCard,
  toggleLike,
  newCardForm,
  placeNameInput,
  linkInput,
} from "../components/card.js";
import "./index.css";
import {
  openPopup,
  closePopup,
  closePopupByOverlay,
} from "../components/modal.js";
import {userId} from "../components/api.js" ;
import {enableValidation} from "../components/validation.js";
export const cardContainer = document.querySelector(".places__list");

Array.from(document.querySelectorAll(".popup__close")).forEach(function (
  element
) {
  element.addEventListener("click", () =>
    closePopup(element.closest(".popup"))
  );
});

document.addEventListener("mousedown", closePopupByOverlay);

function renderLoading(isLoading, popup) {
  const popupButton = popup.querySelector(".button");
  if (isLoading) {
    popupButton.textContent = "Сохранение...";
  } else {
    popupButton.textContent = "Сохранить";
  }
}

function handleAddEvent(evt) {
  evt.preventDefault();
  renderLoading(true, newCardForm);
  const placeNameValue = placeNameInput.value;
  const linkValue = linkInput.value;
  const newCard = [];
  newCard.name = placeNameValue;
  newCard.link = linkValue;
  const likes = [];
  addNewCard(placeNameValue, linkValue)
    .then((response) => response.json())
    .then((cardData) => {
      cardData = {
        ownerId: cardData.owner._id,
        cardId: cardData._id,
      };
      cardContainer.prepend(
        createCard(
          newCard,
          toggleLike,
          openPopopImage,
          deleteCard,
          likes,
          userId,
          cardData.ownerId,
          cardData.cardId,
          onDelete
        )
      );

      newCardForm.reset();
      renderLoading(false, newCardForm);
      closePopup(newCardForm.closest(".popup_is-opened"));
    });
}

newCardForm.addEventListener("submit", handleAddEvent);

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  renderLoading(true, popupEditProfile);
  const nameValue = nameInput.value;
  const jobvalue = jobInput.value;
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobvalue;
  sendUserData(profileTitle.textContent, profileDescription.textContent);
  renderLoading(false, popupEditProfile);
  closePopup(popupEditProfile.closest(".popup_is-opened"));
}

const popupEditProfile = document.getElementById("popup__form");
popupEditProfile.addEventListener("submit", handleFormSubmitEdit);

let cardData = {};
export const onDelete = (cardItem, id, popupConfirmDelete) => {
  openPopup(popupConfirmDelete);
  cardData.cardItem = cardItem;
  cardData.id = id;
  cardData.popup = popupConfirmDelete;
};
const formConfirmDelete = document.querySelector(".popup__form-confirm-delete");

formConfirmDelete.addEventListener("submit", (evt) => {
  evt.preventDefault();
  deleteCard(cardData.cardItem, cardData.id);
  closePopup(cardData.popup);
});

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

export function openPopopImage(evt) {
  if (evt.target.classList.contains("card__image")) {
    const popupTypeImage = document.querySelector(".popup_type_image");
    const evtImage = evt.target
      .closest(".places__item")
      .querySelector(".card__image").src;
    const imageTitle = evt.target
      .closest(".places__item")
      .querySelector(".card__title").textContent;
    const popupImageLink = popupTypeImage.querySelector(".popup__image");
    const popupTitle = popupTypeImage.querySelector(".popup__caption");
    popupImageLink.src = evtImage;
    popupTitle.textContent = imageTitle;
    openPopup(popupTypeImage);
  }
}

const editAvatar = document.querySelector(".profile__image");
const editAvatarPopup = document.querySelector(".popup_type_edit-avatar");
editAvatar.addEventListener("click", () => {
  openPopup(editAvatarPopup);
});

const formEditProfile = document.querySelector(".popup__form-edit-profile");
formEditProfile.addEventListener("submit", handleFormEditAvatar);
function handleFormEditAvatar(evt) {
  renderLoading(false, formEditProfile);
  evt.preventDefault();
  const inputValue = document.querySelector(
    ".popup__avatar-input_type_url"
  ).value;
  editAvatar.style.backgroundImage = `url(${inputValue})`;
  sendNewAvatar(inputValue);
  renderLoading(false, formEditProfile);
  closePopup(editAvatarPopup);
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});




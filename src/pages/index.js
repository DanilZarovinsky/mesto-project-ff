import {
  sendUserData,
  addNewCard,
  sendNewAvatar,
  getUserData,
  getInitialCards,
} from "../components/api.js";
import { createCard, deleteCard, toggleLike } from "../components/card.js";
import "./index.css";
import {
  openPopup,
  closePopup,
  closePopupByOverlay,
} from "../components/modal.js";
import {
  enableValidation,
  clearValidation,
  clearInput,
  buttonLock,
} from "../components/validation.js";

const newCardForm = document.querySelector(".form-new-place");
const placeNameInput = document.querySelector(".popup__input_type_card-name");
const cardContainer = document.querySelector(".places__list");
const profilename = document.querySelector(".profile__title");
const profiledescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
let userId = null;
Promise.all([getUserData(), getInitialCards()])
  .then(([resultUser, resultCard]) => {
    profilename.textContent = resultUser.name;
    profiledescription.textContent = resultUser.about;
    profileImage.style.backgroundImage = `url(${resultUser.avatar})`;
    userId = resultUser._id;
    resultCard.forEach((card) => {
      cardContainer.append(
        createCard(
          card,
          toggleLike,
          openPopopImage,
          card.likes,
          userId,
          card.owner._id,
          card._id,
          onDelete,
          popupConfirmDelete
        )
      );
    });
  })
  .catch((err) => console.log(err));

Array.from(document.querySelectorAll(".popup__close")).forEach(function (
  element
) {
  element.addEventListener("click", () =>
    closePopup(element.closest(".popup"))
  );
});
const popupList = document.querySelectorAll(".popup");
popupList.forEach((popup) => {
  popup.addEventListener("mousedown", closePopupByOverlay);
});

function renderLoading(isLoading, popup) {
  const popupButton = popup.querySelector(".button");
  if (isLoading) {
    popupButton.textContent = "Сохранение...";
  } else {
    popupButton.textContent = "Сохранить";
  }
}

const linkInput = document.querySelector(".popup__input_type_url");
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
          likes,
          userId,
          cardData.ownerId,
          cardData.cardId,
          onDelete,
          popupConfirmDelete
        )
      );
      newCardForm.reset();
      closePopup(popupNewCard);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, newCardForm);
    });
}

newCardForm.addEventListener("submit", handleAddEvent);

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const popupConfirmDelete = document.querySelector(".popup_type_confirm-delete");

function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  renderLoading(true, popupEditProfile);
  const nameValue = nameInput.value;
  const jobvalue = jobInput.value;
  sendUserData(profilename.textContent, profiledescription.textContent)
    .then(() => {
      profilename.textContent = nameValue;
      profiledescription.textContent = jobvalue;
      closePopup(popupEdit);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, popupEditProfile);
    });
}

const popupEditProfile = document.getElementById("popup__form");
popupEditProfile.addEventListener("submit", handleFormSubmitEdit);

let cardData = {};
const onDelete = (cardItem, id, popupConfirmDelete) => {
  openPopup(popupConfirmDelete);
  cardData.cardItem = cardItem;
  cardData.id = id;
  cardData.popup = popupConfirmDelete;
};
const formConfirmDelete = document.querySelector(".popup__form-confirm-delete");

formConfirmDelete.addEventListener("submit", (evt) => {
  evt.preventDefault();
  deleteCard(cardData.cardItem, cardData.id).then(() => {
    closePopup(cardData.popup);
  });
});
const profileEdit = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const profileAdd = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");

profileEdit.addEventListener("click", () => {
  clearValidation(popupEdit, validationConfig);
  clearInput(popupEdit, validationConfig);
  openPopup(popupEdit);
  const popupInputName = document.querySelector(".popup__input_type_name");
  const popupInputDescription = document.querySelector(
    ".popup__input_type_description"
  );
  popupInputName.value = profilename.textContent;
  popupInputDescription.value = profiledescription.textContent;
});

profileAdd.addEventListener("click", () => {
  clearValidation(popupNewCard, validationConfig);
  buttonLock(popupNewCard);
  clearInput(popupNewCard, validationConfig);
  openPopup(popupNewCard);
});

function openPopopImage(evt) {
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
const editAvatarPopup = document.querySelector(".popup_type_edit-avatar");
profileImage.addEventListener("click", () => {
  clearValidation(editAvatarPopup, validationConfig);
  buttonLock(editAvatarPopup);
  clearInput(editAvatarPopup, validationConfig);
  openPopup(editAvatarPopup);
});

const formEditProfile = document.querySelector(".popup__form-edit-profile");
formEditProfile.addEventListener("submit", handleFormEditAvatar);
function handleFormEditAvatar(evt) {
  evt.preventDefault();
  renderLoading(true, formEditProfile);
  const inputValue = document.querySelector(
    ".popup__avatar-input_type_url"
  ).value;

  sendNewAvatar(inputValue)
    .then(() => {
      profileImage.style.backgroundImage = `url(${inputValue})`;
      closePopup(editAvatarPopup);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, formEditProfile);
    });
}

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__input_error_visible",
};

enableValidation(validationConfig);

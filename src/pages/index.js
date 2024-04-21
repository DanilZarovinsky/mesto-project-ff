import {
  sendUserData,
  addNewCard,
  sendNewAvatar,
  getUserData,
  getInitialCards,
} from "../components/api.js";
import {
  cardContainer,
  createCard,
  deleteCard,
  toggleLike,
  newCardForm,
  placeNameInput,
} from "../components/card.js";
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
} from "../components/validation.js";

let userId = null;
Promise.all([getUserData(), getInitialCards()])
  .then(([resultUser, resultCard]) => {
    console.log(resultUser._id);
    const profilename = document.querySelector(".profile__title");
    profilename.textContent = resultUser.name;
    const profiledescription = document.querySelector(".profile__description");
    profiledescription.textContent = resultUser.about;
    const profileImage = document.querySelector(".profile__image");
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

document.addEventListener("mousedown", closePopupByOverlay);

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
          likes,
          userId,
          cardData.ownerId,
          cardData.cardId,
          onDelete,
          popupConfirmDelete
        )
      );

      newCardForm.reset();
      renderLoading(false, newCardForm);
      closePopup(newCardForm.closest(".popup_is-opened"));
    })
    .catch((err) => console.log(err));
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
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobvalue;
  sendUserData(profileTitle.textContent, profileDescription.textContent).then(
    () => {
      renderLoading(false, popupEditProfile);
    }
  );

  closePopup(popupEditProfile.closest(".popup_is-opened"));
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
  deleteCard(cardData.cardItem, cardData.id);
  closePopup(cardData.popup);
});

const profileEdit = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const profileAdd = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");

profileEdit.addEventListener("click", () => {
  clearValidation(popupEdit, validationConfig);
  clearInput(popupEdit, validationConfig);
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
  clearValidation(popupNewCard, validationConfig);
  clearInput(popupNewCard, validationConfig);
  openPopup(popupNewCard);
});

function openPopopImage(evt) {
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
  clearValidation(editAvatarPopup, validationConfig);
  clearInput(editAvatarPopup, validationConfig);
  openPopup(editAvatarPopup);
});

const formEditProfile = document.querySelector(".popup__form-edit-profile");
formEditProfile.addEventListener("submit", handleFormEditAvatar);
function handleFormEditAvatar(evt) {
  renderLoading(true, formEditProfile);
  evt.preventDefault();
  const inputValue = document.querySelector(
    ".popup__avatar-input_type_url"
  ).value;
  editAvatar.style.backgroundImage = `url(${inputValue})`;
  sendNewAvatar(inputValue).then(() => {
    renderLoading(false, formEditProfile);
  });
  closePopup(editAvatarPopup);
}

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: ".popup__input_error",
  errorClass: "popup__input_error_visible",
};

enableValidation(validationConfig);

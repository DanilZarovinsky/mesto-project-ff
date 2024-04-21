import { requestDeleteCard, addLike, removeLike } from "./api.js";
const cardContainer = document.querySelector(".places__list");
const newCardForm = document.getElementsByName("new-place")[0];
const placeNameInput = document.querySelector(".popup__input_type_card-name");

function createCard(
  card,
  toggleLike,
  openPopopImage,
  likes,
  userId,
  cardOwnerId,
  cardId,
  onDelete,
  popupConfirmDelete
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__title").textContent = card.name;
  cardElement.querySelector(".card__image").alt = card.name;

  const likesCounter = cardElement.querySelector(".card__like-counter");
  likesCounter.textContent = likes.length;
  if (userId !== cardOwnerId) {
    cardDeleteButton.classList.add("card__delete-button-visible");
  } else {
    cardDeleteButton.addEventListener("click", () =>
      onDelete(cardElement, cardId, popupConfirmDelete)
    );
  }
  likes.forEach((element) => {
    if (element._id === userId || element.length === 0) {
      likeButton.classList.add("card__like-button_is-active");
    }
  });

  likeButton.addEventListener("click", () =>
    toggleLike(cardId, likeButton, likesCounter)
  );
  cardContainer.addEventListener("click", openPopopImage);

  return cardElement;
}

function deleteCard(element, cardId) {
  element.remove();
  requestDeleteCard(cardId);
}

function toggleLike(cardId, likeButton, likesCounter) {
  if (likeButton.classList.contains("card__like-button_is-active")) {
    likeButton.classList.remove("card__like-button_is-active");
    likesCounter.textContent--;
    removeLike(cardId)
      .then((response) => response.json())
      .then((res) => {
        likesCounter.textContent = res.likes.length;
      })
      .catch((err) => console.log(err));
  } else {
    likeButton.classList.add("card__like-button_is-active");
    addLike(cardId)
      .then((response) => response.json())
      .then((res) => {
        likesCounter.textContent = res.likes.length;
      })
      .catch((err) => console.log(err));
  }
}

export {
  createCard,
  deleteCard,
  toggleLike,
  newCardForm,
  placeNameInput,
  cardContainer,
};

import { requestDeleteCard, addLike, removeLike } from "./api.js";

const newCardForm = document.querySelector(".form-new-place");

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
  const cardImage = cardElement.querySelector(".card__image");
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
  cardImage.addEventListener("click", openPopopImage);

  return cardElement;
}

function deleteCard(element, cardId) {
  requestDeleteCard(cardId)
    .then(() => {
      element.remove();
    })
    .catch((err) => console.log(err));
}

function toggleLike(cardId, likeButton, likesCounter) {
  if (likeButton.classList.contains("card__like-button_is-active")) {
    likesCounter.textContent--;
    removeLike(cardId)
      .then((res) => {
        likesCounter.textContent = res.likes.length;
        likeButton.classList.remove("card__like-button_is-active");
      })
      .catch((err) => console.log(err));
  } else {
    addLike(cardId)
      .then((res) => {
        likesCounter.textContent = res.likes.length;
        likeButton.classList.add("card__like-button_is-active");
      })
      .catch((err) => console.log(err));
  }
}

export { createCard, deleteCard, toggleLike, newCardForm };

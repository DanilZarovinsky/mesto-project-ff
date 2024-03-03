const cardContainer = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(nameValue, linkValue) {
  // @todo: Темплейт карточки
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = linkValue;
  cardElement.querySelector(".card__title").textContent = nameValue;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleleCard);

  return cardElement;
}

// @todo: Функция удаления карточки
function deleleCard(event) {
  const deletingCard = event.target.closest(".card");
  deletingCard.remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach(function (card) {
  cardContainer.append(createCard(card.name, card.link));
});

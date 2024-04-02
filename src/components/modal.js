const profileEdit = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const profileAdd = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");

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

function openPopup(item) {
  item.classList.add("popup_is-animated");
  setTimeout(function () {
    item.classList.add("popup_is-opened");
  }, 10);
  const buttonClose = item.querySelector(".popup__close");
  buttonClose.addEventListener("click", closePopup);
  document.addEventListener("keydown", closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    closePopup();
  }
}

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

profileAdd.addEventListener("click", () => {
  openPopup(popupNewCard);
});

profileEdit.addEventListener("click", () => {
  openPopup(popupEdit);
});

function closePopup() {
  const activePopup = document.querySelector(".popup_is-opened");
  activePopup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEscape);
}

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

function handleFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobvalue = jobInput.value;
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobvalue;
  closePopup();
}

export { openPopup, closePopup, openPopopImage, handleFormSubmit };

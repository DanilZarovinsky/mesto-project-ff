function openPopup(item) {
  item.classList.add("popup_is-animated");
  setTimeout(function () {
    item.classList.add("popup_is-opened");
  }, 10);
  document.addEventListener("keydown", closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
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

function closePopup(element) {
  element.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEscape(element));
}

function closePopupByOverlay(evt) {
  if (evt.target.classList.contains("popup_is-opened")) {
    closePopup(evt.target);
  }
}

export { openPopup, closePopup, openPopopImage, closePopupByOverlay };

import {clearValidation,clearInput} from './validation.js'

function openPopup(item) {
  item.classList.add("popup_is-animated");
  setTimeout(function () {
    item.classList.add("popup_is-opened");
  }, 10);
  document.addEventListener("keydown", closeByEscape);
  clearValidation(item);
  clearInput(item);
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
  }
}

function closePopup(element) {
  element.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEscape);
}

function closePopupByOverlay(evt) {
  if (evt.target.classList.contains("popup_is-opened")) {
    closePopup(evt.target);
  }
}

export { openPopup, closePopup, closePopupByOverlay };

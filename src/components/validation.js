function isValid(formElement, inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
  inputElement.removeEventListener("input", () => {
    isValid(formElement, inputElement);
    toggleButtonState(inputList, buttonElement);
  });
}

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input_error_visible");
  inputElement.classList.add("popup__input_error");
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = "";
  errorElement.classList.remove("popup__input_error_visible");
  inputElement.classList.remove("popup__input_error");
}

function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

function enableValidation(validationConfig) {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
}



function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__button_disabled");
  } else {
    buttonElement.classList.remove("popup__button_disabled");
  }
}

 function clearValidation(formElement) {
  const errorElement = Array.from(
    formElement.querySelectorAll(".popup__input-error-text")
  );
  errorElement.forEach((element) => {
    element.textContent = "";
  });
  const errorInput = Array.from(formElement.querySelectorAll(".popup__input"));
  errorInput.forEach((input) => {
    input.classList.remove("popup__input_error");
  });
}

 function clearInput(formElement) {
  const inputPopup = Array.from(formElement.querySelectorAll(".popup__input"));
  inputPopup.forEach((elm) => {
    elm.value = "";
  });
}



export { enableValidation,clearInput,clearValidation };

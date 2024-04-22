function isValid(formElement, inputElement, validationConfig) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig
    );
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
  inputElement.removeEventListener("input", () => {
    isValid(formElement, inputElement, validationConfig);
    toggleButtonState(inputList, buttonElement, validationConfig);
  });
}

function showInputError(
  formElement,
  inputElement,
  errorMessage,
  validationConfig
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
  inputElement.classList.add(validationConfig.inputErrorClass);
}

function hideInputError(formElement, inputElement, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = "";
  errorElement.classList.remove(validationConfig.errorClass);
  inputElement.classList.remove(validationConfig.inputErrorClass);
}

function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, validationConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
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

function toggleButtonState(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
}

function clearValidation(formElement, validationConfig) {
  const errorElement = Array.from(
    formElement.querySelectorAll(`.${validationConfig.errorClass}`)
  );
  errorElement.forEach((element) => {
    element.textContent = "";
  });
  const errorInput = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  errorInput.forEach((input) => {
    input.classList.remove(validationConfig.inputErrorClass);
  });
}

function clearInput(formElement, validationConfig) {
  const inputPopup = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  inputPopup.forEach((elm) => {
    elm.value = "";
  });
  formElement
    .querySelector(".button")
    .classList.add(validationConfig.inactiveButtonClass);
}

export { enableValidation, clearInput, clearValidation };

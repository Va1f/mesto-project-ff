// Function to show error message
function showError(inputElement, errorMessage, errorClass) {
  const errorElement = inputElement.parentElement.querySelector(`.${errorClass}`);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(errorClass);
}

// Function to hide error message
function hideError(inputElement, errorClass) {
  const errorElement = inputElement.parentElement.querySelector(`.${errorClass}`);
  errorElement.textContent = "";
  inputElement.classList.remove(errorClass);
}

// Function to check input validity
function checkInputValidity(inputElement, validationConfig) {
  // Removed the hardcoded check for "place-name"
  if (!inputElement.validity.valid) {
    const errorMessage = inputElement.dataset.errorMessage || inputElement.validationMessage || inputElement.title;
    showError(inputElement, errorMessage, validationConfig.errorClass);
  } else {
    hideError(inputElement, validationConfig.errorClass);
  }
}

// Function to disable the submit button
function disableButton(buttonElement, inactiveButtonClass) {
  buttonElement.setAttribute("disabled", true);
  buttonElement.classList.add(inactiveButtonClass);
}

// Function to toggle the state of the submit button
function toggleButtonState(inputList, buttonElement, validationConfig) {
  const isFormValid = inputList.every((inputElement) => inputElement.validity.valid);
  if (isFormValid) {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  } else {
    disableButton(buttonElement, validationConfig.inactiveButtonClass);
  }
}


function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });

  formElement.addEventListener("reset", function () {
    inputList.forEach((inputElement) => hideError(inputElement, validationConfig.errorClass));
    disableButton(buttonElement, validationConfig.inactiveButtonClass);
  });

  toggleButtonState(inputList, buttonElement, validationConfig);
}


function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
}


function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach((inputElement) => hideError(inputElement, validationConfig.errorClass));
  disableButton(buttonElement, validationConfig.inactiveButtonClass);
}

module.exports = { enableValidation, clearValidation };
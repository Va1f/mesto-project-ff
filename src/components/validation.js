function showError(inputElement, errorMessage, errorClass) {
  const errorElement = inputElement.parentElement.querySelector(
    `.${errorClass}`
  );
  errorElement.textContent = errorMessage;
  inputElement.classList.add(errorClass);
}

function hideError(inputElement, errorClass) {
  const errorElement = inputElement.parentElement.querySelector(
    `.${errorClass}`
  );
  errorElement.textContent = "";
  inputElement.classList.remove(errorClass);
}

function checkInputValidity(inputElement, validationConfig) {
  if (!inputElement.validity.valid) {
    if (inputElement.validity.valueMissing) {
      showError(
        inputElement,
        inputElement.dataset.errorMessage || inputElement.validationMessage,
        validationConfig.errorClass
      );
    } else if (inputElement.validity.patternMismatch) {
      showError(
        inputElement,
        inputElement.dataset.errorMessage || inputElement.validationMessage,
        validationConfig.errorClass
      );
    } else if (
      inputElement.name === "place-name" &&
      inputElement.value.trim().length > 0 &&
      inputElement.value.trim().length < inputElement.minLength
    ) {
      showError(
        inputElement,
        inputElement.dataset.errorMessage || inputElement.title,
        validationConfig.errorClass
      );
    }
  } else {
    hideError(inputElement, validationConfig.errorClass);
  }
}
function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  const isFormValid = inputList.every(
    (inputElement) => inputElement.validity.valid
  );
  if (isFormValid) {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove(inactiveButtonClass);
  } else {
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add(inactiveButtonClass);
  }
}

function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(inputElement, validationConfig);
      toggleButtonState(
        inputList,
        buttonElement,
        validationConfig.inactiveButtonClass
      );
    });
  });

  formElement.addEventListener("reset", function () {
    inputList.forEach((inputElement) => {
      hideError(inputElement, validationConfig.errorClass);
    });
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  });

  toggleButtonState(
    inputList,
    buttonElement,
    validationConfig.inactiveButtonClass
  );
}

function enableValidation(validationConfig) {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
}

function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    hideError(inputElement, validationConfig.errorClass);
  });

  buttonElement.setAttribute("disabled", true);
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
}

module.exports = { enableValidation, clearValidation };

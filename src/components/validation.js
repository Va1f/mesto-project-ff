export function showInputError(formElement, inputElement, errorMessage, { inputErrorClass, errorClass }) {
  const errorElement = inputElement.closest('.popup__field').querySelector('.popup__input-error');
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

function hideInputError(formElement, inputElement, { inputErrorClass, errorClass }) {
  const errorElement = inputElement.closest('.popup__field').querySelector('.popup__input-error');
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
}

function checkInputValidity(formElement, inputElement, { inputErrorClass, errorClass }) {
  if (inputElement.validity.valueMissing) {
    const errorMessage = 'Это обязательное поле';
    showInputError(formElement, inputElement, errorMessage, { inputErrorClass, errorClass });
  } else if (inputElement.validity.typeMismatch) {
    const errorMessage = 'Пожалуйста, введите корректный URL';
    showInputError(formElement, inputElement, errorMessage, { inputErrorClass, errorClass });
  } else if (inputElement.validity.tooShort || inputElement.validity.tooLong) {
    const errorMessage = 'Должно быть от 2 до 30 символов';
    showInputError(formElement, inputElement, errorMessage, { inputErrorClass, errorClass });
  } else if (inputElement.validity.patternMismatch) {
    const pattern = inputElement.getAttribute('pattern');
    let errorMessage = 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы';
    showInputError(formElement, inputElement, errorMessage, { inputErrorClass, errorClass });
  } else {
    hideInputError(formElement, inputElement, { inputErrorClass, errorClass });
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

function toggleButtonState(inputList, buttonElement, { inactiveButtonClass }) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
}


function setEventListeners(formElement, { inputSelector, submitButtonSelector, ...rest }) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, rest);
      toggleButtonState(inputList, buttonElement, rest);
    });
  });

  formElement.addEventListener('reset', () => {
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, rest);
      toggleButtonState(inputList, buttonElement, rest);
    });
  });
}

export function enableValidation(validationConfig) {
  const forms = document.querySelectorAll(validationConfig.formSelector);
  forms.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationConfig);
  });
}

export function clearValidation(formElement, { inputErrorClass, errorClass, ...rest }) {
  const inputList = Array.from(formElement.querySelectorAll(rest.inputSelector));
  const buttonElement = formElement.querySelector(rest.submitButtonSelector);
  
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, { inputErrorClass, errorClass });
  });

  toggleButtonState(inputList, buttonElement, { inactiveButtonClass: rest.inactiveButtonClass });
}


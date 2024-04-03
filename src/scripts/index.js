import "../pages/index.css";
import { createCard,handleLikeClick } from "../components/card.js";
import { openPopup, closePopup, closePopupByOverlay } from "../components/modal.js";
import { enableValidation, clearValidation } from "../components/validation.js";
import * as Api from "../components/Api.js";

const editProfileButton = document.querySelector(".profile__edit-button");
const addPlaceButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");
const editProfilePopup = document.querySelector(".popup_type_edit");
const addPlacePopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const editProfileForm = editProfilePopup.querySelector(".popup__form");
const nameInput = editProfileForm.querySelector(".popup__input_type_name");
const jobInput = editProfileForm.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const placesList = document.querySelector(".places__list");
const addPlaceForm = document.querySelector(".popup_type_new-card .popup__form");
const confirmDeletePopup = document.querySelector(".popup_type_confirm-delete");
const confirmDeleteButton = document.querySelector(".popup__button_confirm-delete");
const editAvatarIcon = document.querySelector('.profile__edit-icon');
document.querySelector('.profile__image-overlay').addEventListener('click', openAvatarUpdatePopup);

editAvatarIcon.addEventListener("click", openAvatarUpdatePopup);
let cardIdToDelete;
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

function fetchUserInfo() {
  Api.fetchUserInfo()
    .then(data => {
      updateProfileInfo(data);
    })
    .catch(err => console.error(err));
}

function updateProfileInfo(userData) {
  const profileAvatar = document.querySelector('.profile__image');

  if (profileAvatar) {
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
  }
  
  if (profileName) {
    profileName.textContent = userData.name;
  }
  
  if (profileJob) {
    profileJob.textContent = userData.about;
  }
}

document.addEventListener('DOMContentLoaded', fetchUserInfo);

const addPlaceFormElement = document.querySelector('.popup__form[name="new-place"]');
clearValidation(addPlaceFormElement, {
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
});

function handleDeleteClick(cardId) {
  const confirmDeletePopup = document.querySelector('.popup_type_confirm-delete');
  openPopup(confirmDeletePopup);
  
  // Установить значение cardIdToDelete
  cardIdToDelete = cardId;

  // Нужно получить DOM элемент карточки, используя cardId
  const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
}

function fillProfileForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function handleProfileEditFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector('.popup__button');
  const initialButtonText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';

  const newName = nameInput.value;
  const newAbout = jobInput.value;

  Api.saveUserInfo(newName, newAbout)
    .then(userInfo => {
      profileName.textContent = userInfo.name;
      profileJob.textContent = userInfo.about;
      closePopup(editProfilePopup);
    })
    .catch(err => console.error('Ошибка при сохранении информации о пользователе:', err))
    .finally(() => {
      submitButton.textContent = initialButtonText;
    });
}

function handleAddPlaceSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector('.popup__button');
  const initialButtonText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
  
  const placeName = addPlaceForm.querySelector(".popup__input_type_card-name").value;
  const placeLink = addPlaceForm.querySelector(".popup__input_type_url").value;

  // Получаем информацию о пользователе
  Api.fetchUserInfo()
    .then(userInfo => {
      // Сохраняем новую карточку
      return Api.saveNewCard(placeName, placeLink)
        .then(newCardData => {
          // Создаем карточку и добавляем ее на страницу
          const newCard = createCard(newCardData, userInfo._id, openImagePopup, handleDeleteClick, handleLikeClick, false);
          placesList.prepend(newCard);
          closePopup(addPlacePopup);
          addPlaceForm.reset();
        });
    })
    .catch(err => console.error('Ошибка при добавлении новой карточки:', err))
    .finally(() => {
      submitButton.textContent = initialButtonText;
    });
}

function openImagePopup(link, name) {
  const imagePopupImage = imagePopup.querySelector(".popup__image");
  const imagePopupCaption = imagePopup.querySelector(".popup__caption");

  imagePopupImage.src = link;
  imagePopupImage.alt = name;
  imagePopupCaption.textContent = name;

  openPopup(imagePopup);
}

function handleConfirmDelete(evt) {
  evt.preventDefault();

  Api.deleteCard(cardIdToDelete)
    .then(() => {
      const cardElement = document.querySelector(`[data-card-id="${cardIdToDelete}"]`);
      cardElement.remove();
      closePopup(confirmDeletePopup);
    })
    .catch(err => console.error('Ошибка при удалении карточки:', err));
}

function openAvatarUpdatePopup() {
  const avatarUpdatePopup = document.querySelector(".popup_type_avatar");
  openPopup(avatarUpdatePopup);
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector('.popup__button');
  const initialButtonText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';

  const avatarUrlInput = document.querySelector(".popup__input_type_avatar-link");

  Api.updateUserAvatar(avatarUrlInput.value)
    .then(data => {
      const profileImageDiv = document.querySelector('.profile__image');
      if(profileImageDiv) {
        profileImageDiv.style.backgroundImage = `url(${data.avatar})`;
      }
      closePopup(document.querySelector(".popup_type_avatar"));
    })
    .catch(err => console.error('Ошибка при обновлении аватара:', err))
    .finally(() => {
      submitButton.textContent = initialButtonText;
    });
}

const avatarUpdateForm = document.querySelector(".popup_type_avatar .popup__form");
avatarUpdateForm.addEventListener("submit", handleAvatarFormSubmit);

function setEventListeners() {
  editProfileButton.addEventListener("click", () => {
    fillProfileForm();
    openPopup(editProfilePopup);
  });
  addPlaceButton.addEventListener("click", () => openPopup(addPlacePopup));
  closeButtons.forEach((button) => {
    button.addEventListener("click", () =>
      closePopup(button.closest(".popup"))
    );
  });
  editProfileForm.addEventListener("submit", handleProfileEditFormSubmit);
  addPlaceForm.addEventListener("submit", handleAddPlaceSubmit);
  document.querySelectorAll(".popup").forEach((popup) => {
    closePopupByOverlay(popup);
  });
  confirmDeleteButton.addEventListener('click', handleConfirmDelete);
}

function initApp() {
  setEventListeners();

  Promise.all([Api.fetchUserInfo(), Api.loadInitialCards()])
  .then(([userInfo, cards]) => {
    profileName.textContent = userInfo.name;
    profileJob.textContent = userInfo.about;
    
    cards.forEach(cardData => {
      placesList.appendChild(
        createCard(cardData, userInfo._id, openImagePopup, handleDeleteClick, handleLikeClick)
      );
    });
  })
  .catch(err => console.error('Ошибка инициализации приложения:', err));
}

initApp();

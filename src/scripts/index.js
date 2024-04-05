import "../pages/index.css";
import { createCard, handleLikeClick } from "../components/card.js";
import {
  openPopup,
  closePopup,
  closePopupByOverlay,
} from "../components/modal.js";
import { enableValidation, clearValidation } from "../components/validation.js";
import * as api from "../components/api.js";

// DOM-элементы
const editProfileButton = document.querySelector(".profile__edit-button");
const addPlaceButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");
const editProfilePopup = document.querySelector(".popup_type_edit");
const addPlacePopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const editProfileForm = editProfilePopup.querySelector(".popup__form");
const nameInput = editProfileForm.querySelector(".popup__input_type_name");
const jobInput = editProfileForm.querySelector(
  ".popup__input_type_description"
);
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const placesList = document.querySelector(".places__list");
const addPlaceForm = addPlacePopup.querySelector(".popup__form");
const confirmDeletePopup = document.querySelector(".popup_type_confirm-delete");
const confirmDeleteButton = confirmDeletePopup.querySelector(
  ".popup__button_confirm-delete"
);
const editAvatarIcon = document.querySelector(".profile__edit-icon");
const avatarUpdatePopup = document.querySelector(".popup_type_avatar");
const avatarUpdateForm = avatarUpdatePopup.querySelector(".popup__form");
const avatarUrlInput = avatarUpdateForm.querySelector(
  ".popup__input_type_avatar-link"
);
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");
const profileAvatar = document.querySelector(".profile__image");
let cardIdToDelete;
let userId;

// Включение валидации
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

// Обновление информации профиля
function updateProfileInfo(userData) {
  profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
  profileName.textContent = userData.name;
  profileJob.textContent = userData.about;
  userId = userData._id;
}

// Функции для обработки событий
function fillProfileForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function handleDeleteClick(cardId) {
  cardIdToDelete = cardId;
  openPopup(confirmDeletePopup);
}

function handleProfileEditFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';
  api
    .saveUserInfo(nameInput.value, jobInput.value)
    .then(updateProfileInfo)
    .then(() => closePopup(editProfilePopup))
    .catch((error) => console.error("Ошибка при сохранении информации о пользователе:", error))
    .finally(() => submitButton.textContent = 'Сохранить');
}

function handleAddPlaceSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';
  const placeName = addPlaceForm.elements["place-name"].value;
  const placeLink = addPlaceForm.elements["link"].value;
  api
    .saveNewCard(placeName, placeLink)
    .then((newCardData) => {
      placesList.prepend(createCard(newCardData, userId, openImagePopup, handleDeleteClick, handleLikeClick));
      closePopup(addPlacePopup);
    })
    .catch((error) => console.error("Ошибка при добавлении новой карточки:", error))
    .finally(() => {
      submitButton.textContent = 'Создать';
      addPlaceForm.reset();
    });
}

function openImagePopup(link, name) {
  imagePopupImage.src = link;
  imagePopupImage.alt = name;
  imagePopupCaption.textContent = name;
  openPopup(imagePopup);
}

function handleConfirmDelete(evt) {
  evt.preventDefault();
  api
    .deleteCard(cardIdToDelete)
    .then(() =>
      document.querySelector(`[data-card-id="${cardIdToDelete}"]`).remove()
    )
    .then(() => closePopup(confirmDeletePopup))
    .catch((error) => console.error("Ошибка при удалении карточки:", error));
}

function openAvatarUpdatePopup() {
  openPopup(avatarUpdatePopup);
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';
  api
    .updateUserAvatar(avatarUrlInput.value)
    .then(updateProfileInfo)
    .then(() => closePopup(avatarUpdatePopup))
    .catch((error) => console.error("Ошибка при обновлении аватара пользователя:", error))
    .finally(() => submitButton.textContent = 'Сохранить');
}


// Установка слушателей событий
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
  avatarUpdateForm.addEventListener("submit", handleAvatarFormSubmit);
  confirmDeleteButton.addEventListener("click", handleConfirmDelete);

  document
    .querySelector(".profile__image-overlay")
    .addEventListener("click", openAvatarUpdatePopup);
  editAvatarIcon.addEventListener("click", openAvatarUpdatePopup);

  document.querySelectorAll(".popup").forEach((popup) => {
    popup.addEventListener("click", (evt) => {
      if (evt.target === popup) closePopup(popup);
    });
  });
}

function initApp() {
  setEventListeners();
  Promise.all([api.fetchUserInfo(), api.loadInitialCards()])
    .then(([userData, cards]) => {
      updateProfileInfo(userData);
      cards.forEach((cardData) => {
        placesList.appendChild(createCard(cardData, userId, openImagePopup, handleDeleteClick, handleLikeClick));
      });
    })
    .catch((err) => console.error("Ошибка инициализации приложения:", err));
}

initApp();
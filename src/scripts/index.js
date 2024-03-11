// Импорт стилей и данных
import "../pages/index.css";
import { initialCards, createCard} from "../components/cards.js";
import { openPopup, closePopup } from "../components/modal.js";

// Получение DOM-элементов
const editProfileButton = document.querySelector(".profile__edit-button");
const addPlaceButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");
const editProfilePopup = document.querySelector(".popup_type_edit");
const addPlacePopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const formElement = editProfilePopup.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const placesList = document.querySelector(".places__list");
const addPlaceForm = document.querySelector(".popup_type_new-card .popup__form");

function fillProfileForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(editProfilePopup);
}

function handleAddPlaceSubmit(evt) {
  evt.preventDefault();
  const placeName = addPlaceForm.querySelector(".popup__input_type_card-name").value;
  const placeLink = addPlaceForm.querySelector(".popup__input_type_url").value;
  const newCard = createCard({ name: placeName, link: placeLink }, openImagePopup);
  placesList.prepend(newCard);
  closePopup(addPlacePopup);
  addPlaceForm.reset();
}

// Функция для открытия попапа с изображением
function openImagePopup(link, name) {
  const imagePopup = document.querySelector(".popup_type_image");
  const imagePopupImage = imagePopup.querySelector(".popup__image");
  const imagePopupCaption = imagePopup.querySelector(".popup__caption");
  
  imagePopupImage.src = link;
  imagePopupImage.alt = name;
  imagePopupCaption.textContent = name;
  
  openPopup(imagePopup);
}

// Установка слушателей событий
function setEventListeners() {
  editProfileButton.addEventListener("click", () => {
      fillProfileForm();
      openPopup(editProfilePopup);
  });
  addPlaceButton.addEventListener("click", () => openPopup(addPlacePopup));
  closeButtons.forEach(button => {
      button.addEventListener("click", () => closePopup(button.closest(".popup")));
  });
  formElement.addEventListener("submit", handleFormSubmit);
  addPlaceForm.addEventListener("submit", handleAddPlaceSubmit);

  // Слушатель для закрытия попапов по оверлею
  document.querySelectorAll(".popup").forEach(popup => {
      popup.addEventListener("click", (e) => {
          if (e.target === e.currentTarget) closePopup(popup);
      });
  });
}

// Инициализация начальных карточек
function initCards() {
  initialCards.forEach(cardData => {
      placesList.appendChild(createCard(cardData, openImagePopup));
  });
}

// Инициализация приложения
function initApp() {
  setEventListeners();
  initCards();
}

initApp();
import * as Api from "../components/api.js";

function updateLikeCounter(cardElement, likesCount) {
  const likeCounter = cardElement.querySelector(".card__like-counter");
  likeCounter.textContent = likesCount;
}

function updateLikeButtonState(likeButton, isLiked) {
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  } else {
    likeButton.classList.remove("card__like-button_is-active");
  }
}

export function handleLikeClick(cardId) {
  const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
  const likeButton = cardElement.querySelector(".card__like-button");
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  // Выбор действия на основе текущего состояния лайка
  const action = isLiked ? Api.removeLike : Api.addLike;

  action(cardId)
    .then((updatedCard) => {
      updateLikeCounter(cardElement, updatedCard.likes.length);
      updateLikeButtonState(likeButton, !isLiked);
    })
    .catch((err) => console.error("Ошибка при изменении лайка:", err));
}

export function createCard(
  { name, link, likes, owner, _id },
  currentUserID,
  handleCardClick,
  handleDeleteClick,
  showDeleteButton = true
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const image = cardElement.querySelector(".card__image");
  image.src = link;
  image.alt = name;
  cardElement.querySelector(".card__title").textContent = name;

  image.addEventListener("click", () => handleCardClick(link, name));

  const deleteButton = cardElement.querySelector(".card__delete-button");

  if (owner._id === currentUserID && showDeleteButton) {
    deleteButton.addEventListener("click", () => handleDeleteClick(_id));
  } else {
    deleteButton.remove();
  }

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => handleLikeClick(_id));

  const isLikedByCurrentUser = likes.some((like) => like._id === currentUserID);
  updateLikeButtonState(likeButton, isLikedByCurrentUser);

  updateLikeCounter(cardElement, likes.length);
  cardElement.setAttribute("data-card-id", _id);

  return cardElement;
}

export function addLike(cardId) {
  return Api.addLike(cardId)
    .then((updatedCard) => {
      const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
      updateLikeCounter(cardElement, updatedCard.likes.length);
      const likeButton = cardElement.querySelector(".card__like-button");
      updateLikeButtonState(likeButton, true);
    })
    .catch((err) => console.error("Ошибка при добавлении лайка:", err));
}

export function removeLike(cardId) {
  return Api.removeLike(cardId)
    .then((updatedCard) => {
      const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
      updateLikeCounter(cardElement, updatedCard.likes.length);
      const likeButton = cardElement.querySelector(".card__like-button");
      updateLikeButtonState(likeButton, false);
    })
    .catch((err) => console.error("Ошибка при удалении лайка:", err));
}

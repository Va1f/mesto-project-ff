import * as Api from "../components/Api.js";

export function createCard({ name, link, likes, owner, _id }, currentUserID, handleCardClick, handleDeleteClick, handleLikeClick) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  
  const image = cardElement.querySelector(".card__image");
  image.src = link;
  image.alt = name;
  cardElement.querySelector(".card__title").textContent = name;
  
  image.addEventListener("click", () => handleCardClick(link, name));
  
  const deleteButton = cardElement.querySelector(".card__delete-button");

  // Check if the current user is the owner of the card
  if (owner._id === currentUserID) {
   deleteButton.addEventListener("click", () => handleDeleteClick(cardElement));
  } else {
    deleteButton.remove(); // If the current user is not the owner, remove the delete button
  }

  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");

  // Set initial state of the like button and like counter
  const isLikedByCurrentUser = likes.some(like => like._id === currentUserID);
  updateLikeButtonState(likeButton, isLikedByCurrentUser);

  likeButton.addEventListener("click", () => handleLikeClick(_id, isLikedByCurrentUser));

  likeCounter.textContent = likes.length; // Display the number of likes

  // Add data-card-id attribute with _id of the card
  cardElement.setAttribute('data-card-id', _id);

  return cardElement;
}

export function addLike(cardId) {
  return Api.addLike(cardId)
    .then(updatedCard => {
      const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
      updateLikeCounter(cardElement, updatedCard.likes.length);
      const likeButton = cardElement.querySelector(".card__like-button");
      updateLikeButtonState(likeButton, true);
    })
    .catch(err => console.error('Error while adding like:', err));
}

export function removeLike(cardId) {
  return Api.removeLike(cardId)
    .then(updatedCard => {
      const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
      updateLikeCounter(cardElement, updatedCard.likes.length);
      const likeButton = cardElement.querySelector(".card__like-button");
      updateLikeButtonState(likeButton, false);
    })
    .catch(err => console.error('Error while removing like:', err));
}

export function updateLikeCounter(cardElement, likesCount) {
  const likeCounter = cardElement.querySelector(".card__like-counter");
  likeCounter.textContent = likesCount;
}

export function updateLikeButtonState(likeButton, isLiked) {
  if (likeButton) {
    if (isLiked) {
      likeButton.classList.add("card__like-button_is-active");
    } else {
      likeButton.classList.remove("card__like-button_is-active");
    }
  }
}
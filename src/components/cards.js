
const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

export function createCard({ name, link }, handleCardClick) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const image = cardElement.querySelector(".card__image");
  image.src = link;
  image.alt = name;
  cardElement.querySelector(".card__title").textContent = name;

  image.addEventListener("click", () => handleCardClick(link, name));
  cardElement.querySelector(".card__delete-button").addEventListener("click", () => cardElement.remove());
  cardElement.querySelector(".card__like-button").addEventListener("click", function () {
      this.classList.toggle("card__like-button_is-active");
  });

  return cardElement;
}

export {initialCards};
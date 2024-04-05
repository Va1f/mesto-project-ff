import { checkResponse } from "../scripts/utilits.js";

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-10",
  headers: {
    authorization: "936d1ed8-a428-4bb8-ad74-c2df3594c068",
    "Content-Type": "application/json",
  },
};

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export const fetchUserInfo = () => {
  return request(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  });
};

export const loadInitialCards = () => {
  return request(`${config.baseUrl}/cards`, {
    headers: config.headers,
  });
};

export const saveUserInfo = (name, about) => {
  return request(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      ...config.headers,
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  });
};

export const saveNewCard = (name, link) => {
  return request(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: {
      ...config.headers,
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  });
};

export const addLike = (cardId) => {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  });
};

export const removeLike = (cardId) => {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
};

export const deleteCard = (cardId) => {
  return request(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
};

export const updateUserAvatar = (url) => {
  return request(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      ...config.headers,
    },
    body: JSON.stringify({ avatar: url }),
  });
};

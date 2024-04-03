const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-10',
  headers: {
    authorization: '936d1ed8-a428-4bb8-ad74-c2df3594c068',
    'Content-Type': 'application/json'
  }
};

export const fetchUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(`Ошибка: ${res.status}`);
  })
  .catch(err => {
    console.error('Ошибка загрузки информации о пользователе:', err);
  });
};

export const loadInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(`Ошибка: ${res.status}`);
  })
  .catch(err => {
    console.error('Ошибка загрузки карточек:', err);
  });
};

export const saveUserInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      ...config.headers,
    },
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(`Ошибка: ${res.status}`);
  })
  .catch(err => {
    console.error('Ошибка при сохранении информации о пользователе:', err);
  });
};

export const saveNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      ...config.headers,
    },
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(`Ошибка: ${res.status}`);
  })
  .catch(err => {
    console.error('Ошибка при добавлении новой карточки:', err);
  });
};

export const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(`Ошибка: ${res.status}`);
  })
  .catch(err => {
    console.error('Ошибка при постановке лайка:', err);
  });
};

export const removeLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(`Ошибка: ${res.status}`);
  })
  .catch(err => {
    console.error('Ошибка при снятии лайка:', err);
  });
};

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => {
    if (!res.ok) {
      throw new Error(`Ошибка: ${res.status}`);
    }
  })
  .catch(err => {
    console.error('Ошибка при удалении карточки:', err);
  });
};


export const updateUserAvatar = (url) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      ...config.headers,
    },
    body: JSON.stringify({ avatar: url })
  })
  .then(res => {
    if (!res.ok) {
      throw new Error(`Ошибка: ${res.status}`);
    }
    return res.json();
  })
  .then(data => {
    return data;
  })
  .catch(err => {
    console.error('Ошибка при обновлении аватара:', err);
  });
};


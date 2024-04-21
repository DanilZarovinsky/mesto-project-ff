const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-11",
  headers: {
    authorization: "a05cfe34-771a-4bf5-8666-626b8e6ea135",
    "Content-Type": "application/json",
  },
};

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else return Promise.reject(`Ошибка: ${res.status}`);
};

export const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => checkResponse(res));
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => checkResponse(res));
};

export const sendUserData = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).catch((err) => console.log(err));
};

export const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: {
      authorization: "a05cfe34-771a-4bf5-8666-626b8e6ea135",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).catch((err) => console.log(err));
};

export const requestDeleteCard = (cardId) => {
  fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "a05cfe34-771a-4bf5-8666-626b8e6ea135",
      "Content-Type": "application/json",
    },
  }).catch((err) => console.log(err));
};

export const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: "a05cfe34-771a-4bf5-8666-626b8e6ea135",
      "Content-Type": "application/json",
    },
  }).catch((err) => console.log(err));
};

export const removeLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "a05cfe34-771a-4bf5-8666-626b8e6ea135",
      "Content-Type": "application/json",
    },
  }).catch((err) => console.log(err));
};

export const sendNewAvatar = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar `, {
    method: "PATCH",
    headers: {
      authorization: "a05cfe34-771a-4bf5-8666-626b8e6ea135",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  }).catch((err) => console.log(err));
};

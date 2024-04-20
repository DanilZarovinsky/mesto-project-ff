import {
    cardContainer,openPopopImage,onDelete
  } from "../pages/index.js";
  import {createCard,toggleLike,deleteCard} from "./card.js"
export let userId =null;
const getUserData = () => {
  fetch("https://nomoreparties.co/v1/wff-cohort-11/users/me", {
    headers: {
      authorization: "a05cfe34-771a-4bf5-8666-626b8e6ea135",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      const profilename = document.querySelector(".profile__title");
      profilename.textContent = result.name;
      const profiledescription = document.querySelector(
        ".profile__description"
      );
      profiledescription.textContent = result.about;
      const profileImage = document.querySelector(".profile__image");
      profileImage.style.backgroundImage = `url(${result.avatar})`;
      userId = result._id;
    })
    .catch((err) => console.log(err));
};

const getInitialCards = () => {
  fetch("https://nomoreparties.co/v1/wff-cohort-11/cards", {
    headers: {
      authorization: "a05cfe34-771a-4bf5-8666-626b8e6ea135",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      result.forEach((card) => {
        cardContainer.append(
          createCard(
            card,
            toggleLike,
            openPopopImage,
            deleteCard,
            card.likes,
            userId,
            card.owner._id,
            card._id,
            onDelete
          )
        );
      });
    })
    .catch((err) => console.log(err));
};

Promise.all([getUserData, getInitialCards]).then(
  () => getUserData(),
  getInitialCards()
);

export const sendUserData = (name, about) => {
  fetch("https://nomoreparties.co/v1/wff-cohort-11/users/me", {
    method: "PATCH",
    headers: {
      authorization: "a05cfe34-771a-4bf5-8666-626b8e6ea135",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).catch((err) => console.log(err));
};

export const addNewCard = (name, link) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-11/cards", {
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
  fetch(`https://nomoreparties.co/v1/wff-cohort-11/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "a05cfe34-771a-4bf5-8666-626b8e6ea135",
      "Content-Type": "application/json",
    },
  }).catch((err) => console.log(err));
};

export const addLike = (cardId) => {
  return fetch(
    `https://nomoreparties.co/v1/wff-cohort-11/cards/likes/${cardId}`,
    {
      method: "PUT",
      headers: {
        authorization: "a05cfe34-771a-4bf5-8666-626b8e6ea135",
        "Content-Type": "application/json",
      },
    }
  ).catch((err) => console.log(err));
};

export const removeLike = (cardId) => {
  return fetch(
    `https://nomoreparties.co/v1/wff-cohort-11/cards/likes/${cardId}`,
    {
      method: "DELETE",
      headers: {
        authorization: "a05cfe34-771a-4bf5-8666-626b8e6ea135",
        "Content-Type": "application/json",
      },
    }
  ).catch((err) => console.log(err));
};

export const sendNewAvatar = (avatarLink) => {
  fetch("https://nomoreparties.co/v1/wff-cohort-11/users/me/avatar ", {
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

class Api {
  constructor(data) {
    this._url = data.url;
    this._headers = data.headers;
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`Ошибка: ${response.status}`));
  }
  //Загрузка информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then((response) => this._checkResponse(response));
  }
  //Редактирование профиля
  changeUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((response) => this._checkResponse(response));
  }
  //Обновление аватара пользователя
  changeUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((response) => this._checkResponse(response));
  }
  //Загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then((response) => this._checkResponse(response));
  }
  //Добавление новой карточки
  getNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((response) => this._checkResponse(response));
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.deleteLikeCard(cardId);
    } else {
      return this.setLikeCard(cardId);
    }
  }
  //Удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((response) => this._checkResponse(response));
  }
  //Постановка лайка
  setLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((response) => this._checkResponse(response));
  }
  // Снятие лайка
  deleteLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((response) => this._checkResponse(response));
  }
}

const configApi = {
  url: "https://mesto.nomoreparties.co/v1/cohort-58",
  headers: {
    authorization: "c72a15ee-41f4-4087-ba87-6f0ec1118b16",
    "Content-Type": "application/json",
  },
};

const api = new Api(configApi);

export default api;

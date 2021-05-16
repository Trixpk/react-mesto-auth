class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _checkRequest(result) {
        if(result.ok) {
            return result.json();
        }

        return Promise.reject(`Ошибка: ${result.status}`);
    }

    getInitialCards() {
        return fetch(this._baseUrl + '/cards', {
            headers: this._headers
        })
        .then((result) => {
            return this._checkRequest(result);
        })
    }

    addCard(data) {
        return fetch(this._baseUrl + '/cards', {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify(data)
        }).then((result) => {
            return this._checkRequest(result);
        })
    }

    deleteCard(itemId) {
        return fetch(this._baseUrl + '/cards/' + itemId, {
            headers: this._headers,
            method: 'DELETE'
        }).then((result) => {
            return this._checkRequest(result);
        })
    }

    getUserInfo() {
        return fetch(this._baseUrl + '/users/me', {
            headers: this._headers
        })
        .then((result) => {
            return this._checkRequest(result);
        })
    }

    setUserInfo(data) {
        return fetch(this._baseUrl + '/users/me', {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify(data)
        }).then((result) => {
            return this._checkRequest(result);
        })
    }

    changeAvatar(data) {
        return fetch(this._baseUrl + '/users/me/avatar', {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify(data)
        }).then((result) => {
            return this._checkRequest(result);
        })
    }

    addLike(itemId) {
        return fetch(this._baseUrl + '/cards/likes/' + itemId, {
            headers: this._headers,
            method: 'PUT'
        }).then((result) => {
            return this._checkRequest(result);
        })
    }

    deleteLike(itemId) {
        return fetch(this._baseUrl + '/cards/likes/' + itemId, {
            headers: this._headers,
            method: 'DELETE'
        }).then((result) => {
            return this._checkRequest(result);
        })
    }
}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
    headers: {
      authorization: '96e957a5-3fa6-45d2-8d74-380f98a0cb16',
      'Content-Type': 'application/json'
    }
});
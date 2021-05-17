class ApiAuth {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _checkRequest(result) {
        return result.ok ? result.json() : Promise.reject(new Error(`Ошибка: ${result.status}`));
    }

    authorize = (data) => {
        return fetch(this._baseUrl + '/signup', {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify(data)
        }).then((res) => {
            return this._checkRequest(res);
        })
    }

    login = (data) => {
        return fetch(this._baseUrl + '/signin', {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify(data)
        }).then((res) => {
            return this._checkRequest(res);
        })
    }

    checkToken = (token) => {
        return fetch(this._baseUrl + '/users/me', {
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${localStorage.getItem('jwt')}`
            },
            method: 'GET'
        }).then((res) => {
            return this._checkRequest(res);
        })
    }
}

export const apiAuth = new ApiAuth({
    baseUrl: 'https://auth.nomoreparties.co',
    headers: {
        "Content-Type": "application/json"
    }
});
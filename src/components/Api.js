export class Api {
    #url;
    #headers;

    constructor({url, headers}) {
        this.#url = url;
        this.#headers = headers;
    }

    _sendRequest(url, options) {
        return fetch(url, options)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Что-то пошло не так...')
            })
    }

    getCards() {
        return this._sendRequest(`${this.#url}/cards`, {
            method: "GET",
            headers: this.#headers,
        });
    }

    getUser() {
        return this._sendRequest(`${this.#url}/users/me`, {
            method: "GET",
            headers: this.#headers,
        });
    }

    patchUser(data) {
        return this._sendRequest(`${this.#url}/users/me`, {
            method: 'PATCH',
            headers: this.#headers,
            body: JSON.stringify({
                name: data['input-name'],
                about: data['input-job']
            })
        });
    }

    postCard(data) {
        return this._sendRequest(`${this.#url}/cards`, {
            method: 'POST',
            headers: this.#headers,
            body: JSON.stringify({
                name: data['input-username'],
                link: data['input-url']
            })
        })
    }

    deleteCard(id) {
        return this._sendRequest(`${this.#url}/cards/${id}`, {
            method: 'DELETE',
            headers: this.#headers,
        });
    }

    likeCard(id) {
        return this._sendRequest(`${this.#url}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this.#headers,
        });
    }

    deleteLikeCard(id) {
        return this._sendRequest(`${this.#url}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this.#headers,
        });
    }

    patchAvatar(data) {
        return this._sendRequest(`${this.#url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.#headers,
            body: JSON.stringify({
                avatar: data['input-url-avatar']
            })
        });
    }
}
export class Api {
    #url;
    #headers;

    constructor({url, headers}) {
        this.#url = url;
        this.#headers = headers;
    }

    getCards() {
        return fetch(`${this.#url}/cards`, {
            method: "GET",
            headers: this.#headers,
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Что-то пошло не так...')
            })
            .catch((error) => {
                console.log(error);
            })
    }

    getUser() {
     return fetch(`${this.#url}/users/me`, {
            method: "GET",
            headers: this.#headers,
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Что-то пошло не так...')
            })
            .catch((error) => {
                console.log(error);
            })
    }

    patchUser(data) {
       return fetch(`${this.#url}/users/me`, {
            method: 'PATCH',
            headers: this.#headers,
            body: JSON.stringify({
                name: data['input-name'],
                about: data['input-job']
            })
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Что-то пошло не так...')
            })
            .catch((error) => {
                console.log(error);
            })
    }

    postCard(data){
        return fetch(`${this.#url}/cards`, {
            method: 'POST',
            headers: this.#headers,
            body: JSON.stringify({
                name: data['input-username'],
                link: data['input-url']
            })

        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Что-то пошло не так...')
            })
            .catch((error) => {
                console.log(error);
            })
    }
    deleteCard(id){
        return fetch(`${this.#url}/cards/${id}`, {
            method: 'DELETE',
            headers: this.#headers,
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Что-то пошло не так...')
            })
            .catch((error) => {
                console.log(error);
            })
    }
    likeCard(id){
        return fetch(`${this.#url}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this.#headers,
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Что-то пошло не так...')
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteLikeCard(id){
        return fetch(`${this.#url}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this.#headers,
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Что-то пошло не так...')
            })
            .catch((error) => {
                console.log(error);
            })
    }
}

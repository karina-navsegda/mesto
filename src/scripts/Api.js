export class Api {
    constructor(options) {
this._url = options.baseUrl;
this._headers = options.headers;
this._authorization = options.headers.authorization
    }
getProfile(){
    return fetch (`${this._url}/users/me`, {
        headers: {
            authorization: this._authorization
        }
    })
    .then(res => res.ok ? res.json() : Promise.reject);
}

getCards() {
    return fetch (`${this._url}/cards`, {
        headers: {
            authorization: this._authorization
        }
    })
    .then(res => res.ok ? res.json() : Promise.reject);
}

setProfile(data) {
    return fetch (`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
            name: data.edit__username,
            about: data.edit__description
        })
    })
    .then(res => res.ok ? res.json() : Promise.reject);
}

setAvatarImg(data) {
    return fetch (`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
            avatar: data.avatar
        })
    })
    .then(res => res.ok ? res.json() : Promise.reject);
}

setCard(data) {
    return fetch (`${this._url}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
            name: data.place__name,
            link: data.place__link
        })
    })
    .then(res => res.ok ? res.json() : Promise.reject);
}

addLike(cardId) {
    return fetch (`${this._url}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
            authorization: this._authorization
        }
       
    })
    .then(res => res.ok ? res.json() : Promise.reject);
}

removeLike(cardId) {
    return fetch (`${this._url}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
            authorization: this._authorization
        }
       
    })
    .then(res => res.ok ? res.json() : Promise.reject);
}

deleteCard(cardId) {
    return fetch (`${this._url}/cards/${cardId}`, {
   
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject);
      
  }

}

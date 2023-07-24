import { apiSettings } from './variables'

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl
    this._headers = headers
  }

  _doFetch = async (url, method, data) => {
    let res;

    if (data) {

      res = await fetch(url, {
        method,
        headers: this._headers,
        body: JSON.stringify(data)
      });

    } else {

      res = await fetch(url, {
        method,
        headers: this._headers,
      });

    }

    if (!res.ok) {
      throw new Error(`Fail to fetch - ${url}, status: ${res.status}`);
    }

    return res.json();
  }

  getUserInfo = async () => {
    return await this._doFetch(`${this._baseUrl}/users/me`, 'GET')
  }

  getCards = async () => {
    return await this._doFetch(`${this._baseUrl}/cards`, 'GET')
  }

  patchUserInfo = async (data) => {
    return await this._doFetch(`${this._baseUrl}/users/me`, 'PATCH', data)
  }

  updateAvatar = async (data) => {
    return await this._doFetch(`${this._baseUrl}/users/me/avatar`, 'PATCH', data)
  }

  addCard = async (data) => {
    return await this._doFetch(`${this._baseUrl}/cards`, 'POST', data)
  }

  deleteCard = async (id) => {
    return await this._doFetch(`${this._baseUrl}/cards/${id}`, 'DELETE')
  }

  toggleLike = async (id, method) => {
    return await this._doFetch(`${this._baseUrl}/cards/${id}/likes`, method)
  }
}

const api = new Api(apiSettings)

export default api;
import { authSettings } from './variables'

class Auth {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl
    this._headers = headers
  }

  _doFetch = async (url, method, { data, token }) => {
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
        headers: {
          ...this._headers,
          'Authorization': `Bearer ${token}`
        },
      });
    }

    if (!res.ok) {
      throw new Error(`Fail to fetch - ${url}, status: ${res.status}`);
    }

    return res.json();
  }

  login = async (data) => {
    return await this._doFetch(`${this._baseUrl}/signin`, 'POST', { data })
  }

  register = async (data) => {
    return await this._doFetch(`${this._baseUrl}/signup`, 'POST', { data })
  }

  checkToken = async (token) => {
    return await this._doFetch(`${this._baseUrl}/users/me`, 'GET', { token })
  }
}

const auth = new Auth(authSettings)

export default auth
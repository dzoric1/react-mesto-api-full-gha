export const
  apiSettings = {
    baseUrl: 'https://api.mesto.dzoric1.nomoredomains.xyz',
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  }

export const
  authSettings = {
    baseUrl: 'https://api.mesto.dzoric1.nomoredomains.xyz',
    headers: {
      'Content-Type': 'application/json'
    }
  }
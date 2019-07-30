import { authHeader } from '../helpers/auth-header'
import { handleJSONResponse } from './middleware/handle-response'

export const userService = {
  createUser,
  deleteUser,
  login,
  logout,
  getUsers,
  resetPassword,
  changePassword,
}

async function getUsers() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  }

  return fetch(`${process.env.VUE_APP_API_URL}/users`, requestOptions).then(handleJSONResponse)
}

async function createUser(email, teamId, role) {
  const requestOptions = {
    method: 'POST',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      teamId,
      role,
    }),
  }

  return fetch(`${process.env.VUE_APP_API_URL}/users/signup`, requestOptions).then(handleJSONResponse)
}

async function changePassword(password) {
  const requestOptions = {
    method: 'PUT',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password }),
  }

  return fetch(`${process.env.VUE_APP_API_URL}/users/`, requestOptions).then(handleJSONResponse)
}

async function resetPassword(userId) {
  const requestOptions = {
    method: 'PUT',
    headers: authHeader(),
  }

  return fetch(`${process.env.VUE_APP_API_URL}/users/reset/${userId}`, requestOptions).then(handleJSONResponse)
}

async function deleteUser(userIds) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
  }

  let queryParameters = '?'

  console.log(userIds)

  for (const id of userIds) {
    if (!queryParameters.length) {
      queryParameters = queryParameters.concat(`userIds=${id}`)
    } else {
      queryParameters = queryParameters.concat(`&userIds=${id}`)
    }
  }

  console.log(queryParameters)

  return fetch(`${process.env.VUE_APP_API_URL}/users${queryParameters}`, requestOptions).then(handleJSONResponse)
}

async function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
    }),
  }

  return fetch(`${process.env.VUE_APP_API_URL}/users/signin`, requestOptions)
    .then(handleJSONResponse)
    .then(user => {
      // login successful if there's a jwt token in the response
      if (user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user))
      }

      return user
    })
}

function logout() {
  localStorage.removeItem('user')
}

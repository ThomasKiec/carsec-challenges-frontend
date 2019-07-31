import { authHeader } from '../helpers/auth-header'
import { handleJSONResponse } from './middleware/handle-response'

export const userKeysService = {
  getUserKeys,
  updateUserKeys,
  deleteUserKeyValues,
}

async function getUserKeys() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  }

  return fetch(`/api/hardware-keys/user`, requestOptions).then(handleJSONResponse)
}

async function updateUserKeys(userKeys) {
  const requestOptions = {
    method: 'PUT',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userKeys }),
  }

  return fetch(`/api/hardware-keys/user`, requestOptions).then(handleJSONResponse)
}

async function deleteUserKeyValues(userId) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
  }

  return fetch(`/api/hardware-keys/user/${userId}`, requestOptions).then(handleJSONResponse)
}

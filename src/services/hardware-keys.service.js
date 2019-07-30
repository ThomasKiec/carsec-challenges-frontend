import { authHeader } from '../helpers/auth-header'
import { handleJSONResponse } from './middleware/handle-response'

export const hardwareKeysService = {
  createHardwareKeys,
  deleteHardwareKey,
  getHardwareKeys,
  updateUserKeys,
}

async function getHardwareKeys() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  }

  return fetch(`${process.env.VUE_APP_API_URL}/hardware-keys`, requestOptions)
    .then(handleJSONResponse)
    .then(({ hardwareKeys }) => hardwareKeys)
}

async function createHardwareKeys(name) {
  const requestOptions = {
    method: 'POST',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  }

  return fetch(`${process.env.VUE_APP_API_URL}/hardware-keys`, requestOptions).then(handleJSONResponse)
}

async function deleteHardwareKey(keyId) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
  }

  return fetch(`${process.env.VUE_APP_API_URL}/hardware-keys/${keyId}`, requestOptions).then(handleJSONResponse)
}

async function updateUserKeys(keys) {
  const requestOptions = {
    method: 'PUT',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ keys }),
  }

  return fetch(`${process.env.VUE_APP_API_URL}/hardware-keys/user`, requestOptions).then(handleJSONResponse)
}

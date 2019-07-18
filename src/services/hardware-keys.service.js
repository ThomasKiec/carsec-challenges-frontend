import { authHeader } from '../helpers/auth-header'
import { handleResponse } from './middleware/handle-response'

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
    .then(handleResponse)
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

  return fetch(`${process.env.VUE_APP_API_URL}/hardware-keys`, requestOptions).then(handleResponse)
}

async function deleteHardwareKey(keyId) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
  }

  return fetch(`${process.env.VUE_APP_API_URL}/hardware-keys/${keyId}`, requestOptions).then(handleResponse)
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

  return fetch(`${process.env.VUE_APP_API_URL}/hardware-keys/user`, requestOptions).then(handleResponse)
}

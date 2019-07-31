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

  return fetch(`/api/hardware-keys`, requestOptions)
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

  return fetch(`/api/hardware-keys`, requestOptions).then(handleJSONResponse)
}

async function deleteHardwareKey(keyId) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
  }

  return fetch(`/api/hardware-keys/${keyId}`, requestOptions).then(handleJSONResponse)
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

  return fetch(`/api/hardware-keys/user`, requestOptions).then(handleJSONResponse)
}

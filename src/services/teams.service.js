import { authHeader } from '../helpers/auth-header'
import { handleResponse } from './middleware/handle-response'

export const teamService = {
  getTeams,
  createTeam,
  deleteTeam,
}

async function getTeams() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  }

  return fetch(`${process.env.VUE_APP_API_URL}/teams`, requestOptions).then(handleResponse)
}

async function createTeam(name) {
  const requestOptions = {
    method: 'POST',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
    }),
  }

  return fetch(`${process.env.VUE_APP_API_URL}/teams`, requestOptions).then(handleResponse)
}

async function deleteTeam(teamId) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
  }

  return fetch(`${process.env.VUE_APP_API_URL}/teams/${teamId}`, requestOptions).then(handleResponse)
}

import { authHeader } from '../helpers/auth-header'
import { handleJSONResponse } from './middleware/handle-response'

export const teamService = {
  getTeams,
  createTeam,
  deleteTeam,
  getTeamScores,
}

async function getTeams() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  }

  return fetch(`/api/teams`, requestOptions).then(handleJSONResponse)
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

  return fetch(`/api/teams`, requestOptions).then(handleJSONResponse)
}

async function deleteTeam(teamId) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
  }

  return fetch(`/api/teams/${teamId}`, requestOptions).then(handleJSONResponse)
}

async function getTeamScores() {
  const requstOptions = {
    method: 'GET',
    headers: authHeader(),
  }

  return fetch(`/api/teams/scores`, requstOptions).then(handleJSONResponse)
}

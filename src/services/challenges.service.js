import { authHeader } from '../helpers/auth-header'
import { handleJSONResponse, handleDownloadResponse } from './middleware/handle-response'
import download from 'downloadjs'

export const challengesService = {
  createChallenge,
  deleteChallenge,
  getUserChallenges,
  solveUserChallenge,
  downloadUserChallenge,
}

async function getUserChallenges() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  }

  return fetch(`${process.env.VUE_APP_API_URL}/challenges`, requestOptions)
    .then(handleJSONResponse)
    .then(({ challenges }) => challenges)
}

async function createChallenge(project, title, points, topic, buildCall, description, challengeKeys) {
  const requestOptions = {
    method: 'POST',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      project,
      title,
      points,
      topic,
      buildCall,
      description,
      challengeKeys,
    }),
  }

  return fetch(`${process.env.VUE_APP_API_URL}/challenges`, requestOptions).then(handleJSONResponse)
}

async function deleteChallenge(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
  }

  return fetch(`${process.env.VUE_APP_API_URL}/challenges/${id}`, requestOptions).then(handleJSONResponse)
}

async function solveUserChallenge(challengeId, result) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  }

  return fetch(`${process.env.VUE_APP_API_URL}/user-challenge/solve/${challengeId}/${result}`, requestOptions).then(
    handleJSONResponse
  )
}

async function downloadUserChallenge(challengeId) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
    responseType: 'application/octet-stream',
  }

  return fetch(`${process.env.VUE_APP_API_URL}/user-challenge/${challengeId}`, requestOptions)
    .then(handleDownloadResponse)
    .then(response => {
      console.log(response)
      return response.blob().then(data => download(data, 'someFiles'))
    })
}

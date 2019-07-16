import { authHeader } from '../helpers/auth-header'

export const challengesService = {
  createChallenge,
  deleteChallenge,
  getUserChallenges,
  solveUserChallenge,
}

async function getUserChallenges() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  }

  return fetch(`${process.env.VUE_APP_API_URL}/challenges`, requestOptions)
    .then(handleResponse)
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

  return fetch(`${process.env.VUE_APP_API_URL}/challenges`, requestOptions).then(handleResponse)
}

async function deleteChallenge(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
  }

  return fetch(`${process.env.VUE_APP_API_URL}/challenges/${id}`, requestOptions).then(handleResponse)
}

async function solveUserChallenge(challengeId, result) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  }

  return fetch(`${process.env.VUE_APP_API_URL}/user-challenge/solve/${challengeId}/${result}`, requestOptions).then(
    handleResponse
  )
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('user')
        location.reload(true)
      }

      const error = (data && data.message) || response.statusText

      return Promise.reject(error)
    }

    return data
  })
}

import { authHeader } from '../helpers/auth-header'

export const challengesService = {
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
        .then(({ challenges }) => {
            if (challenges) {
                localStorage.setItem('challenges', JSON.stringify(challenges))
            }

            return challenges
        })
}

async function solveUserChallenge(challengeId, result) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    }

    return fetch(
        `${process.env.VUE_APP_API_URL}/user-challenge/${challengeId}/${result}`,
        requestOptions
    ).then(handleResponse)
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text)
        if (!response.ok) {
            if (response.status === 401) {
                location.reload(true)
            }

            const error = (data && data.message) || response.statusText

            return Promise.reject(error)
        }

        return data
    })
}

import { challengesService } from '../services/challenges.service'

export const challenges = {
    namespaced: true,
    state: {
        items: {},
        solved: {},
    },
    actions: {
        getAllChallenges({ commit }) {
            commit('getAllRequest')

            challengesService
                .getUserChallenges()
                .then(
                    challenges => commit('getAllSuccess', challenges),
                    error => commit('getAllFailure', error)
                )
        },
        solveUserChallenge({ commit }, { challengeId, result }) {
            commit('solveChallengeRequest')

            challengesService
                .solveUserChallenge(challengeId, result)
                .then(
                    solved => commit('solveChallengeSuccess', solved),
                    error => commit('solveChallengeFailure', error)
                )
        },
    },
    mutations: {
        getAllRequest(state) {
            state.items = { loading: true }
        },
        getAllSuccess(state, challenges) {
            state.items = challenges
        },
        getAllFailure(state, error) {
            state.items = { error }
        },
        solveChallengeRequest(state) {
            state.solved = { loading: true }
        },
        solveChallengeSuccess(state) {
            state.solved = { success: true }
        },
        solveChallengeFailure(state) {
            state.solved = { error: true }
        },
    },
}

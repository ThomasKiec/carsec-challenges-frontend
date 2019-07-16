import { challengesService } from '../services/challenges.service'

export const challenges = {
  namespaced: true,
  state: {
    items: {},
    solved: {},
    created: {},
    deleted: {},
  },
  actions: {
    getAllChallenges({ commit }) {
      commit('getAllRequest')

      challengesService
        .getUserChallenges()
        .then(challenges => commit('getAllSuccess', challenges), error => commit('getAllFailure', error))
    },
    solveUserChallenge({ commit }, { challengeId, result }) {
      commit('solveChallengeRequest')

      challengesService
        .solveUserChallenge(challengeId, result)
        .then(solved => commit('solveChallengeSuccess', solved), error => commit('solveChallengeFailure', error))
    },
    createChallenge({ commit }, { project, title, points, topic, buildCall, description, challengeKeys }) {
      commit('createChallengeRequest')

      challengesService
        .createChallenge(project, title, points, topic, buildCall, description, challengeKeys)
        .then(() => commit('createChallengeSuccess'), error => commit('createChallengeFailure', error))
    },
    deleteChallenge({ commit }, { challengeId }) {
      commit('deleteChallengeRequest')

      challengesService
        .deleteChallenge(challengeId)
        .then(() => commit('deleteChallengeSuccess'), error => commit('deleteChallengeFailure', error))
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
      state.items = { error: true, message: error }
    },
    solveChallengeRequest(state) {
      state.solved = { loading: true }
    },
    solveChallengeSuccess(state) {
      state.solved = { success: true }
    },
    solveChallengeFailure(state, error) {
      state.solved = { error: true, message: error }
    },
    createChallengeRequest(state) {
      state.created = { loading: true }
    },
    createChallengeSuccess(state) {
      state.created = { success: true }
    },
    createChallengeFailure(state, error) {
      state.created = { error: true, message: error }
    },
    deleteChallengeRequest(state) {
      state.deleted = { loading: true }
    },
    deleteChallengeSuccess(state) {
      state.deleted = { success: true }
    },
    deleteChallengeFailure(state, error) {
      state.deleted = { error: true, message: error }
    },
  },
}

import { teamService } from '../services/teams.service'

export const teams = {
  namespaced: true,
  state: {
    items: {},
    created: {},
    deleted: {},
  },
  actions: {
    getTeams({ commit }) {
      commit('getTeamsRequest')

      teamService.getTeams().then(teams => commit('getTeamsSuccess', teams), error => commit('getTeamsFailure', error))
    },
    createTeam({ commit }, { name }) {
      commit('createTeamRequest')

      teamService.createTeam(name).then(() => commit('createTeamSuccess'), error => commit('createTeamFailure', error))
    },
    deleteTeam({ commit }, { teamId }) {
      commit('deleteTeamRequest')

      teamService
        .deleteTeam(teamId)
        .then(() => commit('deleteTeamSuccess'), error => commit('deleteTeamFailure', error))
    },
  },
  mutations: {
    getTeamsRequest(state) {
      state.items = { loading: true }
    },
    getTeamsSuccess(state, { teams }) {
      state.items = teams
    },
    getTeamsFailure(state, error) {
      state.items = { error: true, message: error }
    },
    createTeamRequest(state) {
      state.created = { loading: true }
    },
    createTeamSuccess(state) {
      state.created = { success: true }
    },
    createTeamFailure(state, error) {
      state.created = { error: true, message: error }
    },
    deleteTeamRequest(state) {
      state.deleted = { loading: true }
    },
    deleteTeamSuccess(state) {
      state.deleted = { success: true }
    },
    deleteTeamFailure(state, error) {
      state.deleted = { error: true, message: error }
    },
  },
}

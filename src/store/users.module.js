import { userService } from '../services/user.service'

export const users = {
  namespaced: true,
  state: {
    items: {},
    created: {},
    deleted: {},
  },
  actions: {
    getUsers({ commit }) {
      commit('getUsersRequest')

      userService.getUsers().then(users => commit('getUsersSuccess', users), error => commit('getUsersFailure', error))
    },
    createUser({ commit }, { email, teamId, role }) {
      commit('createUserRequest')

      userService
        .createUser(email, teamId, role)
        .then(() => commit('createUserSuccess'), error => commit('createUserFailure', error))
    },
    deleteUser({ commit }, { userIds }) {
      commit('deleteUserRequest')

      userService
        .deleteUser(userIds)
        .then(() => commit('deleteUserSuccess'), error => commit('deleteUserFailure', error))
    },
  },
  mutations: {
    getUsersRequest(state) {
      state.items = { loading: true }
    },
    getUsersSuccess(state, { users }) {
      state.items = users
    },
    getUsersFailure(state, error) {
      state.items = { error: true, message: error }
    },
    createUserRequest(state) {
      state.created = { loading: true }
    },
    createUserSuccess(state) {
      state.created = { success: true }
    },
    createUserFailure(state, error) {
      state.created = { error: true, message: error }
    },
    deleteUserRequest(state) {
      state.deleted = { loading: true }
    },
    deleteUserSuccess(state) {
      state.deleted = { success: true }
    },
    deleteUserFailure(state, error) {
      state.deleted = { error: true, message: error }
    },
  },
}

import { userKeysService } from '../services/user-keys.service'

export const userKeys = {
  namespaced: true,
  state: {
    items: {},
    updated: {},
    values: {
      deleted: {},
    },
  },
  actions: {
    getUserKeys({ commit }) {
      commit('getUserKeysRequest')

      userKeysService
        .getUserKeys()
        .then(userKeys => commit('getUserKeysSuccess', userKeys), error => commit('getUserKeysFailure', error))
    },
    updateUserKeys({ commit }, { userKeys }) {
      commit('updateUserKeysRequest')

      userKeysService
        .updateUserKeys(userKeys)
        .then(() => commit('updateUserKeysSuccess'), error => commit('updateUserKeysFailure', error))
    },
    deleteUserKeyValues({ commit }, { userId }) {
      commit('deleteUserKeyValuesRequest')

      userKeysService
        .deleteUserKeyValues(userId)
        .then(() => commit('deleteUserKeyValuesSuccess'), error => commit('deleteUserKeyValuesFailure', error))
    },
  },
  mutations: {
    getUserKeysRequest(state) {
      state.items = { loading: true }
    },
    getUserKeysSuccess(state, { userKeys }) {
      state.items = userKeys
    },
    getUserKeysFailure(state, error) {
      state.items = { error: true, message: error }
    },
    updateUserKeysRequest(state) {
      state.updated = { loading: true }
    },
    updateUserKeysSuccess(state) {
      state.updated = { success: true }
    },
    updateUserKeysFailure(state, error) {
      state.updated = { error: true, message: error }
    },
    deleteUserKeyValuesRequest(state) {
      state.values.deleted = { loading: true }
    },
    deleteUserKeyValuesSuccess(state) {
      state.values.deleted = { success: true }
    },
    deleteUserKeyValuesFailure(state, error) {
      state.values.deleted = { error: true, message: error }
    },
  },
}

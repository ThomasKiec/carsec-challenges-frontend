import { hardwareKeysService } from '../services/hardware-keys.service'

export const hardwareKeys = {
  namespaced: true,
  state: {
    items: {},
    created: {},
    deleted: {},
    updated: {},
  },
  actions: {
    getHardwareKeys({ commit }) {
      commit('getHardwareKeysRequest')

      hardwareKeysService
        .getHardwareKeys()
        .then(
          hardwareKeys => commit('getHardwareKeysSuccess', hardwareKeys),
          error => commit('getHardwareKeysFailure', error)
        )
    },
    createHardwareKey({ commit }, { name }) {
      commit('createHardwareKeyRequest')

      hardwareKeysService
        .createHardwareKeys(name)
        .then(() => commit('createHardwareKeysSuccess'), error => commit('createHardwareKeysFailure', error))
    },
    updateHardwareKey({ commit }, { keys }) {
      commit('updateHardwareKeyRequest')

      hardwareKeysService
        .updateUserKeys(keys)
        .then(() => commit('updateHardwareKeySuccess'), error => commit('updateHardwareKeyFailure', error))
    },
    deleteHardwareKey({ commit }, { keyId }) {
      commit('deleteHardwareKeyRequest')

      hardwareKeysService
        .deleteHardwareKey(keyId)
        .then(() => commit('deleteHardwareKeySuccess'), error => commit('deleteHardwareKeyFailure', error))
    },
  },
  mutations: {
    getHardwareKeysRequest(state) {
      state.items = { loading: true }
    },
    getHardwareKeysSuccess(state, hardwareKeys) {
      state.items = hardwareKeys
    },
    getHardwareKeysFailure(state, error) {
      state.items = { error }
    },
    createHardwareKeyRequest(state) {
      state.createed = { loading: true }
    },
    createHardwareKeysSuccess(state) {
      state.created = { success: true }
    },
    createHardwareKeysFailure(state, error) {
      state.created = { error: true, message: error.message }
    },
    updateHardwareKeyRequest(state) {
      state.updated = { loading: true }
    },
    updateHardwareKeySuccess(state) {
      state.updated = { success: true }
    },
    updateHardwareKeyFailure(state, error) {
      state.updated = { error: true, message: error.message }
    },
    deleteHardwareKeyRequest(state) {
      state.deleted = { loading: true }
    },
    deleteHardwareKeySuccess(state) {
      state.deleted = { success: true }
    },
    deleteHardwareKeyFailure(state, error) {
      state.deleted = { error: true, message: error.message }
    },
  },
}

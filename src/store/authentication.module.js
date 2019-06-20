import { userService } from '../services/user.service'
import { router } from '../routes/index'

const user = JSON.parse(localStorage.getItem('user'))
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null }

export const authentication = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ dispatch, commit }, { email, password }) {
            commit('loginRequest', { email })

            userService.login(email, password).then(
                user => {
                    commit('loginSuccess', user)
                    router.push('/')
                },
                error => {
                    commit('loginFailure', error)
                    dispatch('alert/error', error, { root: true })
                }
            )
        },
        logout({ commit }) {
            userService.logout()
            commit('logout')
            router.push('/')
        },
    },
    mutations: {
        loginRequest(state, user) {
            state.status = { loggingIn: true }
            state.user = user
        },
        loginSuccess(state, user) {
            state.status = { loggedIn: true }
            state.user = user
        },
        loginFailure(state) {
            state.status = {}
            state.user = null
        },
        logout(state) {
            state.status = {}
            state.user = null
        },
    },
}

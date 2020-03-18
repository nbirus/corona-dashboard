import Vue from 'vue'
import get from 'lodash/get'

const defaultState = {
	authenticated: false,
	preAuthRoute: '/',
	username: '',
	name: '',
	email: '',
	roles: [],
}

export default {
	namespaced: true,
	state() {
		return {
			...defaultState,
		}
	},
	getters: {
		authenticated: state => state.authenticated,
		preAuthRoute: state => state.preAuthRoute,
		username: state => state.username,
		name: state => state.name,
		email: state => state.email,
		roles: state => state.roles,
	},
	mutations: {
		SET_AUTH(state, payload) {
			state.username = get(payload, 'preferred_username', defaultState.username)
			state.name = get(payload, 'name', defaultState.name)
			state.email = get(payload, 'email', defaultState.email)
			state.roles = get(payload, 'roles', defaultState.roles)
		},
		CHECK_AUTH(state, authenticated) {
			state.authenticated = authenticated
		},
		SET_PREV_ROUTE(state, route) {
			state.preAuthRoute = route || '/'
		},
	},
	actions: {
		async login({ commit, dispatch }) {
			commit('SET_AUTH', await Vue.prototype.$sm.auth.getUserInfo())
			commit('SET_PREV_ROUTE')
			dispatch('check')
		},
		logout({ commit, dispatch }) {
			commit('SET_AUTH', {})
			dispatch('check')
		},
		setPreAuth({ commit }, route) {
			commit('SET_PREV_ROUTE', route)
		},
		async check({ commit }) {
			commit('CHECK_AUTH', await Vue.prototype.$sm.auth.isAuthenticated())
		},
	},
}

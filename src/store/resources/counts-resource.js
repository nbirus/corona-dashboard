import { requestResource } from '@/services/RequestService'

export default {
	namespaced: true,
	state() {
		return {
			data: undefined,
			total: null,
			loading: false,
			error: null,
		}
	},
	getters: {
		state: state => ({
			loading: state.loading,
			error: state.error,
			data: state.data,
			total: state.total,
		}),
	},
	mutations: {
		SET_LOADING(state, loading = true) {
			state.loading = loading
		},
		SET_ERROR(state, error = null) {
			state.error = error
		},
		SET_DATA(state, data = {}) {
			state.data = data.data
			state.total = data.total
		},
	},
	actions: {
		async get({ commit }) {
			try {
				commit('SET_LOADING')
				commit('SET_ERROR')
				commit('SET_DATA', await requestResource('counts'))
			} catch (error) {
				commit('SET_ERROR', error)
			} finally {
				commit('SET_LOADING', false)
			}
		},
	},
}

import { requestResource } from '@/services/RequestService'

export default {
	namespaced: true,
	state() {
		return {
			loading: false,
			error: null,
			data: null,
			total: null,
		}
	},
	getters: {
		state: state => ({
			loading: state.loading,
			error: state.error,
			data: state.data,
		}),
	},
	mutations: {
		SET_LOADING(state, loading = true) {
			state.loading = loading
		},
		SET_ERROR(state, error = null) {
			state.error = error
		},
		SET_DATA(state, data = null) {
			state.data = data
		},
		SET_TOTAL(state) {
			if (state.data) {
				state.total = state.data.length
			}
		},
	},
	actions: {
		async get({ commit }, resource) {
			try {
				commit('SET_LOADING')
				commit('SET_ERROR')
				commit('SET_DATA', await requestResource(resource))
				commit('SET_TOTAL')
			} catch (error) {
				commit('SET_ERROR', error)
			} finally {
				commit('SET_LOADING', false)
			}
		},
	},
}

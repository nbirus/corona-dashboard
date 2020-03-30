import set from 'lodash/set'

export default {
	namespaced: true,
	state() {
		return {
			loading: true,
			key: 'world',
			data: {},
		}
	},
	getters: {
		loading: state => state.loading,
		key: state => state.key,
		get: state => ({
			...state.data[state.key],
		}),
	},
	mutations: {
		SET(state, context) {
			set(state, 'data', context)
		},
		SET_KEY(state, key) {
			set(state, 'key', key)
		},
	},
	actions: {
		set({ commit }, context) {
			commit('SET', context)
		},
		setKey({ commit }, key) {
			commit('SET_KEY', key)
		},
		setLoading({ state }, loading) {
			state.loading = loading
		},
	},
}

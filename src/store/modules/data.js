import set from 'lodash/set'

export default {
	namespaced: true,
	state() {
		return {
			key: 'world',
			data: {},
		}
	},
	getters: {
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
	},
}

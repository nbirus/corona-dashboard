import get from 'lodash/get'
import set from 'lodash/set'

export default {
	namespaced: true,
	state() {
		return {
			state: {},
		}
	},
	getters: {
		get: state => id => get(state, id, []),
	},
	mutations: {
		SET(state, { id, items }) {
			set(state, id, items)
		},
	},
	actions: {
		set({ commit }, { id, items }) {
			commit('SET', { id, items })
		},
	},
}

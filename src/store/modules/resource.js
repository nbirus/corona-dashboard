import set from 'lodash/set'
import get from 'lodash/get'

export default {
	namespaced: true,
	state() {
		return {
			resources: {},
		}
	},
	getters: {
		getState: state => resource => get(state, `resources.${resource}`),
	},
	mutations: {
		SET_STATE(state, { resource, resourceState }) {
			set(state, `resources.${resource}`, resourceState)
		},
	},
	actions: {
		set({ commit }, { resource, state }) {
			commit('SET_STATE', { resource, resourceState: state })
		},
	},
}

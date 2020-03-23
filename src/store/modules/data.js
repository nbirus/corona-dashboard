import set from 'lodash/set'

export default {
	namespaced: true,
	state() {
		return {
			data: {
				totals: {},
				timeline: [],
				today: {},
				countries: {},
				highestDeathsPerCases: {},
				lowestDeathsPerCases: {},
			},
		}
	},
	getters: {
		get: state => ({
			...state.data,
		}),
	},
	mutations: {
		SET(state, context) {
			set(state, 'data', context)
		},
	},
	actions: {
		set({ commit }, context) {
			commit('SET', context)
		},
	},
}

export default {
	namespaced: true,
	state() {
		return {
			width: 0,
		}
	},
	getters: {
		width$: state => state.width,
	},
	mutations: {
		SET_WIDTH(state, width) {
			state.width = width
		},
	},
	actions: {
		width({ commit }) {
			commit('SET_WIDTH', document.body.clientWidth)
		},
	},
}

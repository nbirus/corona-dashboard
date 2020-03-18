export default {
	namespaced: true,
	state() {
		return {
			open: false,
			mixed: false,
			props: {},
		}
	},
	getters: {
		open: state => state.open,
		mixed: state => state.mixed,
		props: state => state.props,
	},
	mutations: {
		SHOW(state, value) {
			state.open = value
		},
		SET(state, options = {}) {
			state.props = options
			state.mixed = options.mixed !== undefined ? options.mixed : false
		},
	},
	actions: {
		open({ commit }, options) {
			commit('SHOW', true)
			commit('SET', options)
		},
		close({ commit }) {
			commit('SHOW', false)
			commit('SET')
		},
	},
}

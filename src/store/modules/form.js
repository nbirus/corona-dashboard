import get from 'lodash/get'

export default {
	namespaced: true,
	state() {
		return {
			forms: {},
		}
	},
	getters: {
		getModel: state => (id, base) => get(state.forms, id, base),
	},
	mutations: {
		setModel(state, { id, model }) {
			state.forms[id] = model
		},
		setForms(state, forms) {
			state.forms = forms
		},
	},
	actions: {
		setModel({ commit }, { id, model }) {
			commit('setModel', { id, model })
		},
		clearForms({ commit }) {
			commit('setForms', {})
		},
	},
}

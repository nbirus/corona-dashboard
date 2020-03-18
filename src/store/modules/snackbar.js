import Vue from 'vue'

const defaultOptions = () => ({
	message: '',
	color: undefined,
	timeout: 4000,
	persist: false,
	multiLine: false,
	vertical: false,
	textButton: false,
	position: 'bottom right',
})

export default {
	namespaced: true,
	state() {
		return {
			options: defaultOptions(),
		}
	},
	getters: {
		options: state => state.options,
	},
	mutations: {
		SET(state, options = {}) {
			Vue.set(state, 'options', {
				...defaultOptions(),
				...options,
			})
		},
	},
	actions: {
		open({ commit }, options) {
			commit('SET', options)
		},
		clear({ commit }) {
			commit('SET')
		},
	},
}

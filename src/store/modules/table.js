import get from 'lodash/get'
import set from 'lodash/set'
import cloneDeep from 'lodash/cloneDeep'

const tables = () => ({
	example: {
		visibleColumns: [],
		dense: false,
		sort: {
			key: undefined,
			desc: undefined,
		},
		pagination: {
			from: 0,
			size: 20,
		},
	},
})

export default {
	namespaced: true,
	state() {
		return {
			...cloneDeep(tables()),
		}
	},
	getters: {
		getTable: state => id => get(state, id),
	},
	mutations: {
		SET_TABLE(state, payload) {
			set(state, `${payload.id}.${payload.key}`, payload.data)
		},
	},
	actions: {
		setDense({ commit }, payload) {
			commit('SET_TABLE', {
				key: 'dense',
				...payload,
			})
		},
		setColumns({ commit }, payload) {
			commit('SET_TABLE', {
				key: 'columns',
				...payload,
			})
		},
		setSort({ commit }, payload) {
			commit('SET_TABLE', {
				key: 'sort',
				...payload,
			})
		},
		setPagination({ commit }, payload) {
			commit('SET_TABLE', {
				key: 'pagination',
				...payload,
			})
		},
	},
}

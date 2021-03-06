import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

// modules
import example from '@/store/modules/example'
import snackbar from '@/store/modules/snackbar'
import form from '@/store/modules/form'
import table from '@/store/modules/table'
import presentor from '@/store/modules/presentor'
import resource from '@/store/modules/resource'
import keyword from '@/store/modules/keyword'
import dialogTable from '@/store/modules/dialogTable'
import data from '@/store/modules/data'
import timeline from '@/store/modules/timeline'
import base from '@/store/base'

// resources
import mainResource from '@/store/resources/main-resource'

const vuexLocal = new VuexPersistence({
	key: `${process.env.VUE_APP_PROJECT_TITLE}-store`,
	storage: window.localStorage,
	reducer: state => ({
		// persisted modules
		example: state.example,
		form: state.form,
		table: state.table,
		keyword: state.keyword,
	}),
})

Vue.use(Vuex)

export default new Vuex.Store({
	plugins: [vuexLocal.plugin],
	...base,
	modules: {
		example,
		data,
		snackbar,
		form,
		table,
		presentor,
		resource,
		keyword,
		dialogTable,
		mainResource,
		timeline,
	},
})

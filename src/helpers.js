import Vue from 'vue'
import { exists } from '@/services/UtilsService'
import get from 'lodash/get'
import cloneDeep from 'lodash/cloneDeep'

const helpers = {
	get,
	cloneDeep,
	exists,
}

const constants = {
	support: 'support_link@help.com',
}

Vue.use({
	install() {
		Vue.prototype.$h = helpers
		Vue.prototype.$c = constants
	},
})

// export for testing
export default helpers

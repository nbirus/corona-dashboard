import Vue from 'vue'
import { exists } from '@/services/UtilsService'
import { hasAccess, hasRole } from '@/services/RoleService'
import get from 'lodash/get'
import cloneDeep from 'lodash/cloneDeep'

const helpers = {
	get,
	cloneDeep,
	exists,
	hasAccess,
	hasRole,
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

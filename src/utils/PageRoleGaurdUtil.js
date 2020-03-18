import get from 'lodash/get'
import { exists } from '@/services/UtilsService'
import { hasAccess, compareRoles, getRoles, hasRole } from '@/services/RoleService'

export default (to, from, next) => {
	const routeSection = get(to, 'meta.section')
	const routeRoles = get(to, 'meta.allowedRoles', [])

	if (skipGaurd()) {
		next()
	} else {
		if (routeHasAccess()) {
			next()
		} else {
			next('/unauthorized')
		}
	}

	// check if route doesn't need guarding
	function skipGaurd() {
		return (!exists(routeSection) && !exists(routeRoles)) || hasRole('DEVELOPER')
	}

	// see if route is allowed based on `section` or `allowedRoles` meta properties
	function routeHasAccess() {
		return hasAccess(routeSection) || compareRoles(getRoles(), routeRoles)
	}
}

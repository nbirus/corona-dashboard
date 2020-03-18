import get from 'lodash/get'
import intersection from 'lodash/intersection'
import { RoleSections, RoleHome } from '@/roles'

/**
 * Does user have access to section
 * @param {string} section
 */
export function hasAccess(section) {
	if (RoleSections.hasOwnProperty(section)) {
		return compareRoles(getRoles(), RoleSections[section])
	} else {
		// eslint-disable-next-line no-console
		console.warn(
			'The section provided does not exist. You can add/update sections in "src/roles.js"'
		)
		return false
	}
}

/**
 * Compare two arrays of roles against each other
 * @param {array} roles
 * @param {array} compareRoles
 */
export function compareRoles(roles, compareRoles) {
	return intersection(roles, compareRoles).length !== 0
}

/**
 * Compare roles against current user roles
 * @param {string} roles
 */
export function hasRole(role) {
	return getRoles().includes(role)
}

/**
 * Get user roles, returns empty array if none found
 * */
export function getRoles() {
	return get(getStorage(), 'idToken.claims.roles', [])
}

/** Get home page for current role, the last role on the list has priority */
export function getRoleHome(defaultPath = '/scenarios') {
	let to = defaultPath
	getRoles().forEach(role => {
		if (RoleHome[role]) {
			to = RoleHome[role]
		}
	})
	return to
}

function getStorage() {
	return JSON.parse(window.sessionStorage.getItem('okta-token-storage'))
}

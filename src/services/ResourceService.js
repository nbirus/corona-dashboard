import Resources from '@/data/resources'
import { exists } from '@/services/UtilsService'
import get from 'lodash/get'
import camelCase from 'lodash/camelCase'

/**
 * Finds a resource and returns a query
 * @param {string} resource
 * @param {object} params
 */
export function getResourceQuery(resource, params) {
	const query = get(Resources, `${camelCase(resource)}.query`)

	if (exists(query)) {
		return query(params)
	} else {
		// eslint-disable-next-line no-console
		console.warn(`Resource: "${resource}" was not found. Is it defined in "src/data/resources"?`)
		return {}
	}
}

/**
 * Finds a resource formatter for the passed in resource
 * @param {string} resource
 */
export function getResourceFormatter(resource) {
	return get(Resources, `${camelCase(resource)}.formatter`)
}

/**
 * Finds a resource validator for the passed in resource
 * @param {string} resource
 */
export function getResourceValidator(resource) {
	return get(Resources, `${camelCase(resource)}.validator`)
}

/**
 * Finds a resource error formatter for the passed in resource
 * @param {string} resource
 */
export function getResourceTotalFormatter(resource) {
	return get(Resources, `${camelCase(resource)}.total`)
}

/**
 * Finds a resource error formatter for the passed in resource
 * @param {string} resource
 */
export function getResourceErrorFormatter(resource) {
	return get(Resources, `${camelCase(resource)}.errorFormatter`)
}

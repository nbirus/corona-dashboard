import {
	getResourceQuery,
	getResourceFormatter,
	getResourceValidator,
	getResourceTotalFormatter,
	getResourceErrorFormatter,
} from '@/services/ResourceService'
import HttpService from '@/services/HttpService'
import { exists } from '@/services/UtilsService'
import get from 'lodash/get'

/**
 * Base request, pass a valid config object.
 * To intercept and format the response, use 'formatter' param
 * To ensure result is expected, use 'validator' param
 * @param {object} config
 * @param {function} formatter
 * @param {function} validator
 * @param {function} errorFormatter
 */
export function request(
	config,
	formatter = r => r,
	totalFormatter = () => null,
	validator = () => null,
	errorFormatter = e => e
) {
	return new Promise((resolve, reject) => {
		// mock url
		// config.baseURL = 'http://localhost:3003/'

		HttpService(config.endpoint, config)
			.then(handleValidation)
			.then(handleFormatting)
			.catch(handleError)

		function handleValidation(response) {
			let result = validator(response)
			if (exists(result)) {
				throw new Error(result)
			} else {
				return response
			}
		}

		function handleFormatting(response) {
			return resolve({
				data: formatter(response),
				total: totalFormatter(response),
			})
		}

		function handleError(error) {
			return reject({
				data: get(error, 'response.data'),
				status: get(error, 'response.status'),
				message: errorFormatter(error),
			})
		}
	})
}

/**
 * Make a request using the `resource` service. Pass a resouce string
 * value that corresponds to a resouce file
 * @param {string} resource
 * @param {object} params
 */
export function requestResource(resource, params) {
	// get config and formatter for requested resource
	const query = getResourceQuery(resource, params)
	const formatter = getResourceFormatter(resource)
	const validator = getResourceValidator(resource)
	const errorFormatter = getResourceErrorFormatter(resource)
	const totalFormatter = getResourceTotalFormatter(resource)

	// make request
	return request(query, formatter, totalFormatter, validator, errorFormatter)
}

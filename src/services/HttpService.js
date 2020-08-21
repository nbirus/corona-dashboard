import axios from 'axios'
import { exists } from '@/services/UtilsService'
import { stringify } from 'querystring'

/** Remove empty paramaters, correctly stringify arrays and objects */
export const paramsSerializer = params => {
	for (let key in params) {
		if (params.hasOwnProperty(key) && !exists(params[key])) {
			delete params[key] // delete empty values
		}
	}
	return stringify(params)
}

/** Creating the instance for axios, set a default config */
const httpClient = axios.create({
	method: 'get',
	baseURL: process.env.VUE_APP_PROJECT_BASE_API,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
	paramsSerializer,
})

export default httpClient

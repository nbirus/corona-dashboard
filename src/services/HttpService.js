import Vue from 'vue'
import axios from 'axios'
import get from 'lodash/get'
import { exists } from '@/services/UtilsService'
import { stringify } from 'querystring'

/** Auth token interceptors */
export const authInterceptor = async config => {
	// disable authentication header if flag exists
	if (get(config, 'headers.authentication', true)) {
		let token = await Vue.prototype.$sm.auth.getAccessToken()
		config.headers.common.Authorization = `Bearer ${get(token, 'accessToken')}`
	} else {
		delete config.headers['authentication']
	}

	return config
}

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

/** Adding the request interceptors */
httpClient.interceptors.request.use(authInterceptor)

export default httpClient

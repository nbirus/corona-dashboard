import get from 'lodash/get'

export default {
	totals: {
		query: () => ({
			baseURL: 'https://corona.lmao.ninja',
			endpoint: 'all',
		}),
		formatter(response) {
			return get(response, 'data', {})
		},
	},
	countries: {
		query: () => ({
			baseURL: 'https://corona.lmao.ninja',
			endpoint: 'countries',
		}),
		formatter(response) {
			return get(response, 'data', {})
		},
	},
	jhucsse: {
		query: () => ({
			baseURL: 'https://corona.lmao.ninja',
			endpoint: 'v2/jhucsse',
		}),
		formatter(response) {
			return get(response, 'data', {})
		},
	},
	history: {
		query: () => ({
			baseURL: 'https://corona.lmao.ninja',
			endpoint: 'v2/historical',
		}),
		formatter(response) {
			return get(response, 'data', {})
		},
	},
	countryHistory: {
		query: params => ({
			baseURL: 'https://corona.lmao.ninja',
			endpoint: `historical/${params.country}`,
		}),
		formatter(response) {
			return get(response, 'data', {})
		},
	},
	news: {
		query: params => ({
			baseURL: 'https://www.reddit.com',
			endpoint: 'r/coronavirus/top.json',
			params: {
				limit: params.size,
				raw_json: 1,
			},
		}),
		formatter(response) {
			return get(response, 'data.data.children')
		},
	},
}

import get from 'lodash/get'

export default {
	counts: {
		query: () => ({
			baseURL: 'https://corona.lmao.ninja',
			endpoint: 'all',
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

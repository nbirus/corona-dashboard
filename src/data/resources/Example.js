// NOTE: This file is used for unit and integration tests

export default {
	example: {
		query: () => ({
			endpoint: 'example',
		}),
		total: response => {
			return response.data.reduce((acc, item) => {
				acc = acc + item.data
				return acc
			}, 0)
		},
	},

	exampleWithFormatter: {
		query: () => ({
			endpoint: 'example-with-formatter',
			params: {},
		}),
		formatter: response => {
			return response
		},
	},

	exampleWithAsyncFormatter: {
		query: () => ({
			endpoint: 'example-with-async-formatter',
			params: {},
		}),
		formatter: async response => {
			return await format(response)
		},
	},

	exampleWithParams: {
		query: params => ({
			endpoint: 'example-with-params',
			params: {
				...params,
			},
		}),
	},

	exampleWithNoAuth: {
		query: () => ({
			endpoint: 'example-with-no-auth',
			headers: {
				authentication: false,
			},
		}),
	},

	exampleWithExtraHeaders: {
		query: () => ({
			endpoint: 'example-with-extra-headers',
			headers: {
				header: 'test',
			},
		}),
	},

	exampleWithPagination: {
		query: params => ({
			endpoint: 'example',
			params,
		}),
		validator: response => {
			if (response.status !== 200) {
				return 'Error message'
			} else if (response.data === 'error') {
				return 'Different Error message'
			} else {
				return
			}
		},
	},

	exampleWithError: {
		query: () => ({
			endpoint: 'example-error',
		}),
		errorFormatter: () => {
			return 'There was an error'
		},
	},
}

function format(r) {
	return new Promise(resolve => {
		setTimeout(() => resolve(r), 4000)
	})
}

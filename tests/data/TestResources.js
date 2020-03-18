export default {

  example: {
    query: () => ({
      endpoint: 'example',
    }),
  },

  exampleWithFormatter: {
    query: () => ({
      endpoint: 'example-with-formatter',
      params: {},
    }),
    formatter: (response) => {
      return response
    },
  },

  exampleWithParams: {
    query: params => ({
      endpoint: 'example-with-params',
      params: {
        ...params
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

  exampleWithValidation: {
    query: params => ({
      endpoint: 'example',
      params,
    }),
    validator: (response) => {
      if (response.status !== 200) {
        return 'Error message'
      }
      return
    },
  },

}

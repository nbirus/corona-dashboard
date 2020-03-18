import { request, requestResource } from '@/services/RequestService'

export default {
	data() {
		return {
			RequestMixin_state: {
				data: undefined,
				total: 0,
				loading: true,
				error: undefined,
			},
		}
	},
	computed: {
		$state() {
			return this.RequestMixin_state
		},
	},
	methods: {
		// generic request method, takes a config
		async $request(config) {
			this.$setState()
			return request(config)
				.then(this.$requestResolve)
				.catch(this.$requestReject)
		},

		// preset 'requests' method, provide a resource along with any additional params
		async $requestResource(resource, params) {
			this.$setState()
			return requestResource(resource, params)
				.then(this.$requestResolve)
				.catch(this.$requestReject)
		},

		$requestResolve(response) {
			const data = this.$getData(response.data.data)
			const total = this.$getTotal(response.total)
			this.$setState(data, false, undefined, total)
			this.$emit('resolve', { data, total })
		},
		$requestReject(error) {
			this.$setState(undefined, false, error)
			this.$emit('reject', error)
		},

		// set state, set to new ref to trigger watchers
		$setState(data = this.RequestMixin_state.data, loading = true, error = undefined, total = 0) {
			const state = {
				total,
				data,
				loading,
				error,
			}

			// set state
			this.RequestMixin_state = state

			// persist data if nessesary
			if (this.persistData) {
				this.$store.dispatch('resource/set', {
					resource: this.resource,
					state,
				})
			}
		},

		$getData(response) {
			return this.$h.exists(this.dataKey) ? this.$h.get(response, this.dataKey) : response
		},
		$getTotal(total) {
			try {
				return this.$h.exists(total) ? total : total.length
			} catch (e) {
				console.log(e)
				return 0
			}
		},
	},
}

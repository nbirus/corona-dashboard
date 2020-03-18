<script>
import RequestMixin from '@/mixins/RequestMixin'
import debounce from 'lodash/debounce'
import isEqual from 'lodash/isEqual'

export default {
	name: 'asnyc-data-wrapper',
	inheritAttrs: false,
	mixins: [RequestMixin],
	props: {
		resource: String,
		dataKey: String,
		params: Object,
		pagination: Object,
		config: Object,
		noCallOnMount: Boolean,
		disabled: Boolean,
		persistData: Boolean,
		debounce: {
			type: Number,
			default: 10,
		},
	},
	data() {
		return {
			request: undefined,
		}
	},
	computed: {
		useResource() {
			return this.$h.exists(this.resource)
		},
		updateWatcher() {
			// watch for change in any of these
			return (
				this.resource +
				JSON.stringify(this.params) +
				JSON.stringify(this.pagination) +
				JSON.stringify(this.config)
			)
		},
	},
	created() {
		this.createRequest()
	},
	mounted() {
		// get inital state
		const initalState = this.$store.getters['resource/getState'](this.resource)

		// use persisted data
		if (this.$h.exists(initalState) && this.persistData && this.useResource) {
			this.$setState(initalState.data, initalState.loading, initalState.error, initalState.total)
		}
		// init request if allowed and not initilized
		else if (!this.noCallOnMount) {
			this.makeRequest()
		}
	},
	methods: {
		createRequest() {
			// get correct request type
			const requestFunction = this.useResource ? this.$requestResource : this.$request

			// set debounce for request
			this.request = debounce(requestFunction, this.debounce)
		},
		makeRequest() {
			if (!this.disabled) {
				// set up paramaters, pass extra params if they're using a resoure
				const params = this.useResource
					? [this.resource, { ...this.params, ...this.pagination }]
					: [this.config]

				this.request(...params)
				this.$emit('request')
			}
		},
	},
	watch: {
		updateWatcher: 'makeRequest',
		params: {
			handler(params, oldParams) {
				if (!isEqual(params, oldParams)) {
					this.$emit('params', params) // called on update to params
				}
			},
			deep: true,
		},
	},
	render() {
		if (this.$scopedSlots.default !== undefined) {
			return this.$scopedSlots.default({
				_state: this.RequestMixin_state,
				_refresh: this.makeRequest,
			})
		} else {
			return this.$slots
		}
	},
}
</script>

// ignore-coverage

<script>
import { search, sort, paginate } from '@/services/SearchService'
import debounce from 'lodash/debounce'
import isEqual from 'lodash/isEqual'

export default {
	name: 'local-data-wrapper',
	inheritAttrs: false,
	props: {
		data: {
			type: [Array, Object],
			required: true,
		},
		dataKey: String,
		params: Object,
		sort: Object,
		pagination: Object,
		disabled: Boolean,
		noCallOnMount: Boolean,
		updateKey: [String, Boolean, Number],
		debounce: {
			type: Number,
			default: 100,
		},
	},
	data() {
		return {
			request: undefined,
			returnData: this.data, // default to passed in data
			total: this.data.length, // default to passed in data
			loading: true,
			error: undefined,
		}
	},
	computed: {
		updateWatcher() {
			// make use of cacheing to watch multiple objects, use this to trigger updates
			return (
				JSON.stringify(this.pagination) +
				JSON.stringify(this.sort) +
				JSON.stringify(this.params) +
				JSON.stringify(this.data) +
				this.dataKey +
				this.updateKey
			)
		},
		activeData() {
			return this.$h.get(this.data, this.dataKey, this.data)
		},
	},
	created() {
		this.createRequest()
	},
	mounted() {
		if (!this.noCallOnMount) {
			this.makeRequest()
		}
	},
	methods: {
		createRequest() {
			this.request = debounce(this._request, this.debounce)
		},
		makeRequest() {
			if (!this.disabled) {
				this.request(this.params)
				this.$emit('request')
			}
		},
		_request(params) {
			this.loading = true
			this.error = undefined

			search(this.$h.cloneDeep(this.activeData), params)
				.then(result => sort(result, this.sort))
				.then(result => paginate(result, this.pagination))
				.then(this.onResolve)
				.catch(this.onError)
		},

		onResolve({ data, total }) {
			this.returnData = data
			this.total = total
			this.loading = false
			this.$emit('resolve', { data, total })
		},
		onError(error) {
			this.error = error
			this.loading = false
		},
	},
	watch: {
		updateWatcher: 'makeRequest',
		params: {
			/* istanbul ignore next */
			handler(params, oldParams) {
				if (!isEqual(params, oldParams)) {
					this.$emit('params', params) // called on update to params, make sure params have changed
				}
			},
			deep: true,
		},
	},
	render() {
		if (this.$scopedSlots.default !== undefined) {
			return this.$scopedSlots.default({
				_state: {
					data: this.returnData,
					total: this.total,
					loading: this.loading,
					error: undefined,
				},
				_refresh: this.makeRequest,
			})
		} else {
			return this.$slots
		}
	},
}
</script>

// ignore-coverage

<script>
export default {
	name: 'asnyc-data-wrapper',
	inheritAttrs: false,
	props: {
		resourceAccessor: String,
	},
	computed: {
		resourceState() {
			return this.$store.getters[`${this.resourceAccessor}/state`]
		},
	},
	render() {
		if (this.$scopedSlots.default !== undefined) {
			return this.$scopedSlots.default({
				_state: {
					loading: this.resourceState.loading,
					data: this.resourceState.data,
					error: this.resourceState.error,
				},
				_refresh() {},
			})
		} else {
			return this.$slots
		}
	},
}
</script>

// ignore-coverage

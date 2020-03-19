<script>
export default {
	name: 'asnyc-data-wrapper',
	inheritAttrs: false,
	props: {
		resource: String,
	},
	computed: {
		resourceState() {
			return this.$store.getters[`${this.resource}/state`]
		},
	},
	render() {
		if (this.$scopedSlots.default !== undefined) {
			return this.$scopedSlots.default({
				_state: this.resourceState,
			})
		} else {
			return this.$slots
		}
	},
}
</script>

// ignore-coverage

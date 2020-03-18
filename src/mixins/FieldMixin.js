export default {
	props: ['value'],
	computed: {
		$value: {
			get() {
				return this.value
			},
			set(val) {
				return this.$emit('input', val)
			},
		},
	},
}

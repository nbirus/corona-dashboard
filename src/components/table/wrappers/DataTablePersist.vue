<script>
export default {
	name: 'data-table-persist',
	inheritAttrs: false,
	props: {
		id: {
			type: String,
			required: true,
		},
	},
	computed: {
		table() {
			return this.$store.getters['table/getTable'](this.id)
		},
	},
	methods: {
		updateSort(sort) {
			this.$store.dispatch('table/setSort', {
				id: this.id,
				data: sort,
			})
		},
		updateDense(dense) {
			this.$store.dispatch('table/setDense', {
				id: this.id,
				data: dense,
			})
		},
		updatePagination(pagination) {
			this.$store.dispatch('table/setPagination', {
				id: this.id,
				data: pagination,
			})
		},
	},
	render() {
		if (this.$scopedSlots.default !== undefined) {
			return this.$scopedSlots.default({
				...this.table,
				updateSort: this.updateSort,
				updatePagination: this.updatePagination,
				updateDense: this.updateDense,
			})
		}
		return this.$slots
	},
}
</script>

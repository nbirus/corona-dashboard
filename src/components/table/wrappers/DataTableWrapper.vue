<template>
	<data-wrapper
		v-bind="$attrs"
		v-slot="{ _state }"
		:pagination="wrapperPagination"
		:sort="wrapperSort"
		@params="paramsUpdate"
	>
		<state-handler
			v-bind="_state"
			:loading="_state.loading"
			ignore-loading
			@change="update(_state)"
		>
			<div key="error" slot="error">{{ _state.error }}</div>
			<div>
				<data-table
					v-bind="$attrs"
					:key="`${updateKey} ${manualKey}`"
					:data="_state.data"
					:loading="_state.loading"
					:server-items-length="_state.total"
					disable-pagination
					disable-sort
					:sort="wrapperSort"
					:dense="dense"
					@update:sort-by="wrapperSort.key = $event[0]"
					@update:sort-desc="wrapperSort.desc = $event[0]"
				/>
				<data-table-pagination
					ref="pagination"
					v-if="!noPagination"
					:disabled="_state.loading"
					:from.sync="wrapperPagination.from"
					:size.sync="wrapperPagination.size"
					:total="_state.total"
				/>
			</div>
		</state-handler>
	</data-wrapper>
</template>

<script>
import DataTable from '@/components/table/base/DataTable'
import DataTablePagination from '@/components/table/base/DataTablePagination'

export default {
	name: 'data-table-wrapper',
	inheritAttrs: false,
	components: {
		DataTable,
		DataTablePagination,
	},
	props: {
		updateKey: [String, Boolean, Number],
		pagination: Object,
		sort: Object,
		noPagination: Boolean,
		bindTotal: Number,
		bindLoading: Boolean,
		bindData: [Array, Object],
		dense: Boolean,
		updateSort: {
			type: Function,
			default: () => {},
		},
		updatePagination: {
			type: Function,
			default: () => {},
		},
		updateDense: {
			type: Function,
			default: () => {},
		},
	},
	data() {
		return {
			manualKey: 0,
			wrapperPagination: this.pagination || {
				size: this.noPagination ? 100000 : 20,
				from: 0,
			},
			wrapperSort: this.sort || {
				key: undefined,
				desc: undefined,
			},
		}
	},
	methods: {
		update(state) {
			this.$emit('update:bindTotal', state.total)
			this.$emit('update:bindLoading', state.loading)
			this.$emit('update:bindData', state.data)
		},
		// revert to page 1 if the params change
		paramsUpdate() {
			if (this.$refs.pagination) {
				this.$refs.pagination.pageChange(1)
			}
		},
	},
	watch: {
		wrapperSort: {
			handler(sort) {
				this.$emit('update:sort', sort)
				this.updateSort(sort)
			},
			deep: true,
		},
		wrapperPagination: {
			handler(pagination) {
				this.$emit('update:pagination', pagination)
				this.updatePagination(pagination)
				this.manualKey++
			},
			deep: true,
		},
		dense(dense) {
			this.updateDense(dense)
		},
	},
}
</script>

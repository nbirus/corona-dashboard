<template>
	<data-wrapper :resource="$attrs.resource" v-slot="{ _state: _asyncState }">
		<data-wrapper
			:updateKey="_asyncState.loading"
			:debounce="200"
			:disabled="_asyncState.loading"
			no-call-on-mount
			:params="$attrs.params"
			:data="$h.get(_asyncState, 'data', [])"
			v-slot="{ _state: _localState }"
			:pagination="wrapperPagination"
			:sort="wrapperSort"
			@params="paramsUpdate"
		>
			<state-handler
				v-bind="_localState"
				ignore-loading
				@change="update(_localState, _asyncState)"
				:error="_asyncState.error"
			>
				<slot name="error" slot="error" :_error="_asyncState.error"></slot>
				<div>
					<data-table
						v-bind="$attrs"
						:key="updateKey"
						:data="_localState.data"
						:loading="_localState.loading"
						:server-items-length="_localState.total"
						disable-pagination
						disable-sort
						:sort="wrapperSort"
						:dense="dense"
						@update:sort-by="wrapperSort.key = $event[0]"
						@update:sort-desc="wrapperSort.desc = $event[0]"
					/>
					<data-table-pagination
						v-if="!noPagination"
						ref="pagination"
						:disabled="_localState.loading"
						:total="_localState.total"
						:from.sync="wrapperPagination.from"
						:size.sync="wrapperPagination.size"
					/>
				</div>
			</state-handler>
		</data-wrapper>
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
		defaultSort: {
			type: Object,
			default: () => ({
				key: undefined,
				order: 'desc',
			}),
		},
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
		update(state, asyncState) {
			this.$emit('update:bindTotal', state.total)
			this.$emit('update:bindLoading', state.loading || asyncState.loading)
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
			},
			deep: true,
		},
		dense(dense) {
			this.updateDense(dense)
		},
	},
}
</script>

<style></style>

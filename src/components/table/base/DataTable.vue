<template>
	<div class="date-table-wrapper" :class="{ dense, loading, noMinHeight }">
		<!-- data table -->
		<v-data-table
			ref="table"
			v-bind="$attrs"
			v-on="$listeners"
			:items="data"
			:headers="columnsData"
			:loading="loading"
			:dense="dense"
			:loading-text="loadingText || ''"
			:no-data-text="noDataText"
			hide-default-footer
			:page="page"
			:disable-sort="false"
			:items-per-page="itemsPerPage"
			:sort-by="sortBy"
			:sort-desc="sortDesc"
			@update:sort-by="$emit('sort-by', $event)"
			@update:sort-desc="$emit('sort-desc', $event)"
		>
			<!-- cell render -->
			<template
				v-for="(column, i) in columnsData"
				v-slot:[`item.${column.value}`]="{ item, value }"
			>
				<data-table-cell
					v-bind="{ column, item, value }"
					:columns="columnsData"
					:key="`${column.value}-${i}`"
					:actions="columnActions"
					@context="$refs.context.open($event)"
				/>
			</template>

			<slot v-if="$slots.loading" slot="loading" name="loading"></slot>
		</v-data-table>

		<!-- loading overlay -->
		<v-overlay color="white" light absolute :value="loading && !$slots.loading">
			<v-progress-circular
				v-if="!$h.exists(data)"
				color="light-blue"
				indeterminate
				:size="42"
				:width="2"
			/>
		</v-overlay>

		<!-- context menu -->
		<data-table-menu ref="context" />
	</div>
</template>

<script>
import DataTableCell from './DataTableCell'
import DataTableMenu from './DataTableMenu'

export default {
	name: 'data-table',
	inheritAttrs: false,
	components: { DataTableCell, DataTableMenu },
	props: {
		data: {
			type: Array,
			default: () => [],
		},
		columns: {
			type: Array,
			default: () => [],
		},
		visibleColumns: {
			type: Array,
			default: () => [],
		},
		sort: {
			type: Object,
			default: () => ({
				key: undefined,
				desc: undefined,
			}),
		},
		loading: Boolean,
		dense: Boolean,
		noMinHeight: Boolean,
		minHeight: String,
		loadingText: String,
		noDataText: String,
		noPagination: Boolean,
		page: Number,
		itemsPerPage: Number,
		columnActions: Object,
		params: Object,
	},
	computed: {
		columnsData() {
			let columns = this.$h.cloneDeep(this.columns)
			return columns.filter(c => {
				let visible = this.visibleColumns.length === 0 || this.visibleColumns.includes(c.value)
				return visible && c.hide !== true
			})
		},
		sortBy() {
			return [this.sort.key]
		},
		sortDesc() {
			return [this.sort.desc]
		},
	},
}
</script>

<style lang="scss">
.date-table-wrapper {
	position: relative;

	&:not(.noMinHeight) {
		min-height: 500px;
	}
	&.dense:not(.noMinHeight) {
		min-height: 320px;
	}

	// set loading min heights
	&.loading:not(.noMinHeight) {
		min-height: 500px;
	}
	&.loading.dense:not(.noMinHeight) {
		min-height: 320px;
	}

	// hide footer if loading
	&.loading .v-data-footer {
		visibility: hidden;
	}

	// disable selection checkboxes if loading
	&.loading .v-simple-checkbox {
		opacity: 0.25;
		pointer-events: none;
	}

	// adjust overlay size if based on "dense"
	&:not(.dense) > .v-overlay {
		margin-top: 50px;
	}
	&.dense > .v-overlay {
		margin-top: 30px;
	}
}
</style>

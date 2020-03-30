<template>
	<div class="row">
		<!-- use custom component -->
		<component
			v-if="column.hasOwnProperty('component')"
			:is="column.component"
			:value="cellValue"
			:key="value"
			:actions="actions"
			:row="item"
			v-bind="[column.componentProps]"
		/>

		<!-- default render -->
		<span class="cell-highlight-value" v-else v-html="cellValue" />
	</div>
</template>

<script>
export default {
	name: 'data-table-row',
	props: ['column', 'item', 'value', 'columns', 'actions'],
	mounted() {
		/* istanbul ignore next */
		if (this.$el.parentElement) {
			this.$el.parentElement.addEventListener('contextmenu', this.onContext, false)
		}
	},
	computed: {
		// use cell value's `filter` function if available
		cellValue() {
			let filter = this.$h.get(this.column, 'filter', v => v)
			return filter(this.value)
		},
	},
	methods: {
		onContext(event) {
			// prevent default context menu
			event.preventDefault()

			// emit row data to the context-menu
			// this.$emit('context', {
			// 	event,
			// 	column: this.column,
			// 	columns: this.columns,
			// 	row: this.item,
			// 	value: this.cellValue,
			// 	element: this.$el.parentElement,
			// })
		},
	},
	beforeDestroy() {
		if (this.$el.parentElement) {
			this.$el.parentElement.removeEventListener('contextmenu', this.onContext, false)
		}
	},
}
</script>

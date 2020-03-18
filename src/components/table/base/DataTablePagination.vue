<template>
	<div class="data-table-pagination-bar px-5">
		<!-- info -->
		<div class="pagination-info mr-5">
			Showing
			<b>{{ start | localeString }}-{{ end | localeString }}</b> of
			<b>{{ total | localeString }}</b>
		</div>

		<!-- pagination -->
		<v-pagination
			class="pagination-page-number"
			v-if="total !== 0"
			:disabled="disabled"
			:value="page"
			:length="pageCount"
			:total-visible="7"
			@input="pageChange"
			circle
		/>

		<div class="flex grow"></div>

		<!-- page size -->
		<v-select
			class="pagination-page-size"
			:disabled="disabled || total === 0"
			:value="size"
			:items="pageCountOptions"
			@input="sizeChange"
		/>
	</div>
</template>

<script>
export default {
	name: 'data-table-pagination',
	props: {
		total: {
			type: Number,
			default: 0,
		},
		from: {
			type: Number,
			default: 0,
		},
		size: {
			type: Number,
			default: 20,
		},
		disabled: Boolean,
	},
	data() {
		return {
			page: Math.ceil(this.from / this.size) + 1,
			itemsPerPage: this.size,
			pageCountOptions: [
				{ text: '5 /page', value: 5 },
				{ text: '10 /page', value: 10 },
				{ text: '20 /page', value: 20 },
				{ text: '50 /page', value: 50 },
			],
		}
	},
	methods: {
		pageChange(page) {
			this.$emit('update:from', (page - 1) * this.size)
			this.page = page
		},
		sizeChange(size) {
			this.$emit('update:size', size)
			this.pageChange(1)
		},
	},
	computed: {
		start() {
			return (this.page - 1) * this.size + 1
		},
		end() {
			let end = (this.page - 1) * this.size + this.size
			return end > this.total ? this.total : end
		},
		pageCount() {
			let pages = Math.ceil(this.total / this.size)
			return pages === 0 ? 1 : pages
		},
	},
}
</script>

<style lang="scss">
.data-table-pagination-bar {
	display: flex;
	align-items: center;
	position: relative;

	.pagination-info {
		flex: 0 0 auto;
	}
	.pagination-page-size {
		flex: 0 0 auto;
		width: 110px;
	}
	.pagination-page-number {
		position: absolute;
	}
	.v-pagination__item,
	.v-pagination__navigation {
		box-shadow: none;
	}

	.v-pagination__item:not(.v-pagination__item--active),
	.v-pagination__navigation {
		background-color: transparent !important;
	}
}
</style>

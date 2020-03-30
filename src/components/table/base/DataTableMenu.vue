<template>
	<v-menu
		v-model="show"
		class="menu"
		content-class="menu-content"
		fixed
		close-on-content-click
		:position-x="left"
		:position-y="top"
		transition="scale-transition"
		:close-delay="1000"
	>
		<v-list>
			<v-list-item-group :key="show">
				<!-- copy -->
				<v-list-item dense @click="copy">
					<v-list-item-icon>
						<v-icon size="20">mdi-content-copy</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>Copy</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

				<!-- copy row -->
				<!-- <v-list-item dense @click="copyRow">
					<v-list-item-icon>
						<v-icon size="20">fa-clipboard</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>Copy Row</v-list-item-title>
					</v-list-item-content>
				</v-list-item>-->

				<!-- go to -->
				<v-list-item v-if="linkTo" dense @click="goTo">
					<v-list-item-icon>
						<v-icon size="20">fa-link</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>Open</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

				<!-- go to new tab -->
				<v-list-item v-if="linkTo" dense @click="goToTab">
					<v-list-item-icon>
						<v-icon size="20">fa-external-link-alt</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>Open in new tab</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list-item-group>
		</v-list>
	</v-menu>
</template>

<script>
import CopyUtil from '@/utils/CopyUtil'

export default {
	name: 'data-table-menu',
	data() {
		return {
			show: false,
			left: 100,
			top: 100,
			column: {},
			columns: [],
			row: {},
			value: undefined,
			element: undefined,
		}
	},
	computed: {
		linkColumn() {
			return this.columns.find(column => this.$h.exists(this.$h.get(column, 'componentProps.to')))
		},
		linkTo() {
			return this.$h.get(this.linkColumn, 'componentProps.to')
		},
	},
	methods: {
		open({ event, column, columns, row, value, element }) {
			// set context values
			this.column = column
			this.columns = columns
			this.row = row
			this.value = value
			this.element = element

			if (this.show) {
				this.show = false
			} else {
				this.show = true
				this.top = this.$h.get(event, 'pageY', 0) - window.scrollY
				this.left = this.$h.get(event, 'pageX', 0)
			}
		},

		//actions
		copy() {
			CopyUtil(this.value)
		},
		copyRow() {
			CopyUtil(JSON.stringify(this.row), 'Row was copied to your clipboard')
		},
		goTo() {
			const value = this.row[this.linkColumn.value]
			this.$router.push(this.linkTo.replace(':id', value))
		},
		goToTab() {
			const value = this.row[this.linkColumn.value]
			const route = this.$router.resolve(this.linkTo.replace(':id', value))
			window.open(route.href, '_blank')
		},
	},
	watch: {
		show(show) {
			if (show) {
				this.element.parentElement.classList.add('row--hover')
				this.element.parentElement.classList.add('row--context')
				this.element.classList.add('context-open')
			} else {
				this.element.parentElement.classList.remove('row--hover')
				this.element.parentElement.classList.remove('row--context')
				this.element.classList.remove('context-open')
			}
		},
		element(newEl, oldEl) {
			if (this.$h.exists(oldEl)) {
				oldEl.classList.remove('context-open')
			}
		},
	},
}
</script>

<style lang="scss">
.menu-content {
	border-radius: 4px;
	width: 215px;
}
.context-open {
	position: relative;
}
.context-open:after {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	border: solid thin color(primary-base);
	background-color: color(primary-base);
	opacity: 0.15;
}
.context-open .cell-highlight-value {
	// background-color: color(primary-lighten2) !important;
	// color: white !important;
}
</style>

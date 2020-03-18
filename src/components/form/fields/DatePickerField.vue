<template>
	<v-menu
		ref="menu"
		v-model="menu"
		:close-on-content-click="closeOnClick"
		transition="scale-transition"
		:content-class="dialogClass"
		offset-y
		max-width="290px"
		min-width="290px"
	>
		<template v-slot:activator="{ on }">
			<v-text-field v-bind="$attrs" :value="formatedValue" readonly v-on="on"></v-text-field>
		</template>
		<v-date-picker v-model="$value" :color="$attrs.color" no-title scrollable />
	</v-menu>
</template>

<script>
import FieldMixin from '@/mixins/FieldMixin'
import { date } from '@/services/FilterService'

export default {
	name: 'date-picker',
	mixins: [FieldMixin],
	props: {
		closeOnClick: {
			type: Boolean,
		},
		closeOnValueChange: {
			type: Boolean,
		},
		dialogClass: {
			type: String,
		},
	},
	data() {
		return {
			menu: false,
			formatedValue: undefined,
		}
	},
	watch: {
		$value: {
			handler(value) {
				if (this.closeOnValueChange) {
					this.menu = false
					this.formatedValue = date(value, 'MMMM DD, YYYY')
				}
			},
			deep: true,
			immediate: true,
		},
	},
}
</script>

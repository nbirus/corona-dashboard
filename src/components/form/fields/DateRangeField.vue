<template>
	<v-layout class="date-range-field pa-2" align-center>
		<v-flex shrink class="mr-2">
			<v-menu
				:close-on-content-click="false"
				transition="scale-transition"
				offset-y
				max-width="290px"
				min-width="290px"
			>
				<template v-slot:activator="{ on }">
					<v-text-field
						class="date-range-field__from"
						placeholder="From"
						v-bind="$attrs"
						v-model="from"
						outlined
						clearable
						hide-details
						readonly
						v-on="on"
					></v-text-field>
				</template>
				<v-date-picker v-model="$value[0]" color="primary" scrollable no-title />
			</v-menu>
		</v-flex>

		<v-icon class="mr-2" size="20">fa-arrow-right</v-icon>

		<v-flex shrink>
			<v-menu
				:close-on-content-click="false"
				transition="scale-transition"
				offset-y
				max-width="290px"
				min-width="290px"
			>
				<template v-slot:activator="{ on }">
					<v-text-field
						class="date-range-field__to"
						v-bind="$attrs"
						v-model="to"
						placeholder="To"
						hide-details
						clearable
						outlined
						readonly
						v-on="on"
					></v-text-field>
				</template>
				<v-date-picker v-model="$value[1]" color="primary" scrollable no-title />
			</v-menu>
		</v-flex>
	</v-layout>
</template>

<script>
import FieldMixin from '@/mixins/FieldMixin'
import { date } from '@/services/FilterService'

export default {
	name: 'date-range-field',
	mixins: [FieldMixin],
	computed: {
		from: {
			get() {
				return date(this.$value[0], 'MMM D, YYYY')
			},
			set(value) {
				this.$set(this.$value, 0, value)
			},
		},
		to: {
			get() {
				return date(this.$value[1], 'MMM D, YYYY')
			},
			set(value) {
				this.$set(this.$value, 1, value)
			},
		},
	},
}
</script>

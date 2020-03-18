<template>
	<div class="input">
		<div class="flex mb-3">
			<v-text-field
				class="flex1 mr-2"
				hide-details
				:dark="dark"
				:label="label"
				v-model="$value.title"
			/>
			<v-text-field
				class="flex2"
				type="number"
				hide-details
				:dark="dark"
				max-width="20"
				v-model="$value.titleSize"
			/>
		</div>
		<div class="flex">
			<v-btn small class="toggle-btn mr-2" height="35" outlined @click="toggleWeight">
				<v-icon size="14">fa-bold</v-icon>
			</v-btn>
			<v-btn small class="toggle-btn" height="35" outlined @click="toggleStyle">
				<v-icon size="14">fa-italic</v-icon>
			</v-btn>
		</div>
	</div>
</template>

<script>
import FieldMixin from '@/mixins/FieldMixin'

export default {
	name: 'text-style-field',
	mixins: [FieldMixin],
	props: {
		dark: Boolean,
		label: String,
	},
	methods: {
		toggleStyle() {
			this.$value.fontStyle = this.$value.fontStyle === 'normal' ? 'italic' : 'normal'
		},
		toggleWeight() {
			this.$value.fontWeight = this.$value.fontWeight === 'normal' ? 'bold' : 'normal'
		},
	},
}
</script>

<style lang="scss" scoped>
.input {
	margin-bottom: 1rem;
}
.flex {
	display: flex;
	align-items: center;
}
.flex1 {
	flex: 0 0 85% !important;
}
.flex2 {
	flex: 0 0 15% !important;
}
</style>

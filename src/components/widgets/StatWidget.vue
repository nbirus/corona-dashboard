<template>
	<v-card class="stat-widget" elevation="2">
		<state-handler v-bind="{ loading, error }">
			<div class="label" v-text="label"></div>
			<div class="value">{{ value | localeString }}</div>
		</state-handler>
	</v-card>
</template>

<script>
export default {
	name: 'count-widget',
	inheritAttrs: false,
	props: {
		label: String,
		value: Number,
		loading: Boolean,
		color: String,
		error: [String, Error],
	},
	computed: {
		count() {
			return this.$h.get(this.data, `totals.${this.id}`, 0)
		},
	},
}
</script>

<style lang="scss" scoped>
.stat-widget {
	width: 100%;
	padding: 1rem;
}
</style>

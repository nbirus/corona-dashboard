<template>
	<v-card class="stat-widget">
		<div class="label body-1" v-text="label"></div>
		<h3 class="value">{{ value | localeString }}</h3>
	</v-card>
</template>

<script>
export default {
	name: 'count-widget',
	inheritAttrs: false,
	props: {
		label: String,
		value: [Number, String],
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

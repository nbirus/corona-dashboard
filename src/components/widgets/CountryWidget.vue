<template>
	<v-card class="country-widget">
		<div v-text="label"></div>
		<h3>
			{{value.country }}
			<span>({{value.deathsPerCases }}%)</span>
		</h3>
	</v-card>
</template>

<script>
export default {
	name: 'country-widget',
	inheritAttrs: false,
	props: {
		label: String,
		value: Object,
		loading: Boolean,
		color: String,
		error: [String, Error],
	},
}
</script>

<style lang="scss" scoped>
.country-widget {
	width: 100%;
	padding: 1rem;
}
</style>

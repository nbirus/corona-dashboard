<template>
	<li class="country-list-item">
		<div class="mb-1">
			<h2 v-text="country"></h2>
		</div>

		<!-- cases -->
		<v-layout class="body-1" wrap>
			<div class="key-value mr-10">
				<span class="key">Cases</span>
				<span class="value" v-text="cases"></span>
				<span class="secondary-value" v-text="`(+${todayCases})`"></span>
			</div>
			<div class="key-value mr-10">
				<span class="key">Deaths</span>
				<span class="value" v-text="deaths"></span>
				<span class="secondary-value" v-text="`(+${todayDeaths})`"></span>
			</div>
			<div class="key-value mr-10">
				<span class="key">Critical</span>
				<span class="value" v-text="critical"></span>
			</div>
			<div class="key-value mr-10">
				<span class="key">Recovered</span>
				<span class="value" v-text="recovered"></span>
			</div>
			<div class="key-value mr-10">
				<span class="key">Active</span>
				<span class="value" v-text="active"></span>
			</div>
			<div class="key-value">
				<span class="key">Per Million</span>
				<span class="value" v-text="casesPerOneMillion"></span>
			</div>
		</v-layout>

		<!-- deaths -->
		<v-layout></v-layout>
	</li>
</template>

<script>
export default {
	name: 'country-list-item',
	props: [
		'country',
		'cases',
		'todayCases',
		'deaths',
		'todayDeaths',
		'recovered',
		'active',
		'critical',
		'casesPerOneMillion',
	],
}
</script>

<style lang="scss" scoped>
.country-list-item {
	display: block;
	padding: 1.25rem 1.5rem;
	border-bottom: solid thin $border-color-light;
}
</style>

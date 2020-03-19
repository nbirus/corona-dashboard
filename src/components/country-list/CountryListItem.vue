<template>
	<li class="country-list-item">
		<div class="mb-1">
			<h2 v-text="country"></h2>
		</div>

		<!-- cases -->
		<v-layout class="body-2" wrap>
			<div class="key-value mr-5">
				<span class="key">Cases</span>
				<span class="value">{{ cases | localeString }}</span>
				<span class="secondary-value">(+{{ todayCases | localeString }})</span>
			</div>
			<div class="key-value mr-5">
				<span class="key">Deaths</span>
				<span class="value">{{ deaths | localeString }}</span>
				<span class="secondary-value">(+{{ todayDeaths | localeString }})</span>
			</div>
			<div class="key-value mr-5">
				<span class="key">Critical</span>
				<span class="value">{{ critical | localeString }}</span>
			</div>
			<div class="key-value mr-5">
				<span class="key">Recovered</span>
				<span class="value">{{ recovered | localeString }}</span>
			</div>
			<div class="key-value mr-5">
				<span class="key">Active</span>
				<span class="value">{{ active | localeString }}</span>
			</div>
			<div class="key-value">
				<span class="key">Per Million</span>
				<span class="value">{{ casesPerOneMillion | localeString }}</span>
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
	padding: 1.5rem 2rem;
	border-bottom: solid thin $border-color-light;
}
</style>

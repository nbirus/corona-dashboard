<template>
	<v-expansion-panel class="country-list-item">
		<v-expansion-panel-header>
			<v-layout>
				<h3 v-text="name"></h3>
				<v-flex></v-flex>
				<div v-if="$h.exists(counts)">
					<div class="key-value mr-5">
						<span class="value mr-1">{{ counts.cases | localeString }}</span>
						<span class="key">total cases</span>
					</div>
				</div>
			</v-layout>
		</v-expansion-panel-header>

		<v-expansion-panel-content>
			<chart-wrapper
				class="page-dashboard__timeline-chart mt-7"
				id="country-timeline-chart"
				type="line"
				formatter="country"
				:data="history"
			/>
		</v-expansion-panel-content>

		<!-- cases -->
		<!-- <v-layout class="body-2" wrap>
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
		</v-layout> -->

		<!-- deaths -->
		<v-layout></v-layout>
	</v-expansion-panel>
</template>

<script>
import ChartWrapper from '@/components/charts/ChartWrapper'

export default {
	name: 'country-list-item',
	components: { ChartWrapper },
	props: {
		name: String,
		counts: {
			type: Object,
			default: () => ({}),
		},
		history: Array,
	},
}
</script>

<style lang="scss" scoped>
.country-list-item {
	display: block;
	padding: 1rem 0.5rem;
}
</style>

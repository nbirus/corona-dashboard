<template>
	<v-expansion-panel class="country-list-item" @change="key++">
		<v-expansion-panel-header>
			<v-layout column>
				<h3 v-text="data.country"></h3>
			</v-layout>
			<v-flex shrink class="key-value mr-5 body-1">
				<span class="value mr-1">{{ activeKey.value | localeString }}</span>
				<span class="key">{{ activeKey.label }}</span>
			</v-flex>
		</v-expansion-panel-header>

		<v-expansion-panel-content class="content">
			<!-- <v-layout class="mb-5" wrap>
				<v-flex shrink class="key-value mr-5 body-2">
					<span class="value mr-1">{{ data.cases | localeString }}</span>
					<span class="key">cases</span>
				</v-flex>
				<v-flex shrink class="key-value mr-5 body-2">
					<span class="value mr-1">{{ data.deaths | localeString }}</span>
					<span class="key">deaths</span>
				</v-flex>
				<v-flex shrink class="key-value mr-5 body-2">
					<span class="value mr-1">{{ data.recovered | localeString }}</span>
					<span class="key">recovered</span>
				</v-flex>
				<v-flex shrink class="key-value mr-5 body-2">
					<span class="value mr-1">{{ data.todayCases | localeString }}</span>
					<span class="key">todayCases</span>
				</v-flex>
				<v-flex shrink class="key-value mr-5 body-2">
					<span class="value mr-1">{{ data.todayDeaths | localeString }}</span>
					<span class="key">todayDeaths</span>
				</v-flex>
				<v-flex shrink class="key-value mr-5 body-2">
					<span class="value mr-1">{{ data.critical | localeString }}</span>
					<span class="key">critical</span>
				</v-flex>
				<v-flex shrink class="key-value mr-5 body-2">
					<span class="value mr-1">{{ data.active | localeString }}</span>
					<span class="key">active</span>
				</v-flex>
				<v-flex shrink class="key-value mr-5 body-2">
					<span class="value mr-1">{{ data.casesPerOneMillion | localeString }}</span>
					<span class="key">casesPerOneMillion</span>
				</v-flex>
				<v-flex shrink class="key-value mr-5 body-2">
					<span class="value mr-1">{{ data.deathsPerOneMillion | localeString }}</span>
					<span class="key">deathsPerOneMillion</span>
				</v-flex>
				<v-flex shrink class="key-value mr-5 body-2">
					<span class="value mr-1">{{ data.deathsPerCases | localeString }}</span>
					<span class="key">deathsPerCases</span>
				</v-flex>
			</v-layout>-->
			<chart-wrapper
				class="timeline-chart"
				id="country-timeline-chart"
				type="line"
				formatter="country"
				:key="key"
				:data="{
					dates,
					data: data.timeline,
				}"
			/>
		</v-expansion-panel-content>

		<!-- deaths -->
		<v-layout></v-layout>
	</v-expansion-panel>
</template>

<script>
import ChartWrapper from '@/components/charts/ChartWrapper'

export default {
	name: 'country-list-item',
	components: { ChartWrapper },
	props: ['data', 'sortKey'],
	data() {
		return {
			key: 0,
		}
	},
	computed: {
		dates() {
			return this.$h.get(this.$store.getters['data/get'], 'timeline.dates', [])
		},
		totals() {
			return [
				{
					key: 'cases',
					label: 'Cases',
					value: this.data.cases,
				},
				{
					key: 'deaths',
					label: 'deaths',
					value: this.data.deaths,
				},
				{
					key: 'recovered',
					label: 'recovered',
					value: this.data.recovered,
				},
				{
					key: 'todayCases',
					label: 'todayCases',
					value: this.data.todayCases,
				},
				{
					key: 'todayDeaths',
					label: 'todayDeaths',
					value: this.data.todayDeaths,
				},
				{
					key: 'critical',
					label: 'critical',
					value: this.data.critical,
				},
				{
					key: 'active',
					label: 'active',
					value: this.data.active,
				},
				{
					key: 'casesPerOneMillion',
					label: 'casesPerOneMillion',
					value: this.data.casesPerOneMillion,
				},
				{
					key: 'deathsPerOneMillion',
					label: 'deathsPerOneMillion',
					value: this.data.deathsPerOneMillion,
				},
				{
					key: 'deathsPerCases',
					label: 'deathsPerCases',
					value: this.data.deathsPerCases,
				},
			]
		},
		activeKey() {
			return this.totals.find(t => t.key === this.sortKey)
		},
	},
}
</script>

<style lang="scss">
.country-list-item {
	display: block;
	padding: 1rem 0.5rem;
	border-top: solid thin $border-color-light;

	.v-expansion-panel-content__wrap {
		min-height: 400px;
	}
}
</style>

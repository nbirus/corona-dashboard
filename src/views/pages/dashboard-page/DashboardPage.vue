<template>
	<div class="page page-dashboard limit-width">
		<!-- total counts -->
		<data-wrapper resourceAccessor="mainResource" v-slot="{ _state }">
			<v-layout class="page-dashboard__counts" justify-space-between>
				<count-widget color="blue" label="cases" id="confirmed" v-bind="_state"></count-widget>
				<count-widget color="red" label="deaths" id="deaths" v-bind="_state"></count-widget>
				<count-widget color="green" label="recovered" id="recovered" v-bind="_state"></count-widget>
				<!-- <span v-if="!_state.loading" class="body-2 last-updated text-secondary"
					>Last updated {{ $h.get(_state, 'data.updated') | timeAgo }}</span
				> -->
			</v-layout>
		</data-wrapper>

		<!-- cases over time -->
		<div class="page-dashboard__timeline">
			<h2 class="mb-1">Timeline</h2>
			<span class="body-1">Confirmed cases, deaths, and recoveries over time</span>
			<chart-wrapper
				class="page-dashboard__timeline-chart mt-7"
				id="timeline-chart"
				type="line"
				resourceAccessor="timelineResource"
			/>
		</div>

		<!-- country-list -->
		<div class="page-dashboard__country-list">
			<h2 class="mb-1">Countries</h2>
			<span class="body-1">Statistics by country, click on a country to see more information</span>
			<!-- <v-layout class="mb-4 mt-7">
				<data-wrapper resourceAccessor="countriesResource" v-slot="{ _state }">
					<country-select-field
						class="mr-5"
						style="max-width: 300px"
						placeholder="Search"
						solo
						hide-details
						clearable
						v-model="country"
						:items="_state.data"
					/>
				</data-wrapper>

				<v-select
					style="max-width: 260px"
					placeholder="Sory by"
					solo
					hide-details
					clearable
					:items="sortItems"
					v-model="sort"
				></v-select>
			</v-layout> -->
			<data-wrapper resourceAccessor="timelineResource" v-slot="{ _state }">
				<country-list class="mt-7" :items="_state.data" :loading="_state.loading" />
			</data-wrapper>
		</div>
	</div>
</template>

<script>
import CountWidget from '@/components/widgets/CountWidget'
import CountryList from '@/components/country-list/CountryList'
import ChartWrapper from '@/components/charts/ChartWrapper'

export default {
	name: 'dashboard-page',
	components: { CountWidget, CountryList, ChartWrapper },
	data() {
		return {
			country: '',
			sort: {},
			sortItems: [
				{
					text: 'Total Cases',
					value: {
						key: 'active',
						desc: false,
					},
				},
				{
					text: 'Most Active Countries',
					value: {
						key: 'todayCases',
						desc: false,
					},
				},
				{
					text: 'Deaths',
					value: {
						key: 'active',
						desc: false,
					},
				},
				{
					text: 'Highest Death Rate',
					value: {
						key: 'todayDeaths',
						desc: false,
					},
				},
				{
					text: 'Most Recoveries',
					value: {
						key: 'recovered',
						desc: false,
					},
				},
				{
					text: 'Active Cases',
					value: {
						key: 'active',
						desc: false,
					},
				},
				{
					text: 'Critical Cases',
					value: {
						key: 'active',
						desc: false,
					},
				},
				{
					text: 'Highest Rate Per Million',
					value: {
						key: 'casesPerOneMillion',
						desc: false,
					},
				},
			],
		}
	},
	computed: {
		params() {
			return {
				country: this.country,
			}
		},
	},
}
</script>

<style lang="scss">
.page-dashboard {
	padding-top: 6rem;

	&__counts {
		margin-bottom: 8rem;
		position: relative;

		.count-widget {
			width: 100%;
			max-width: 235px;
		}
		.last-updated {
			position: absolute;
			bottom: -2rem;
			right: 0.25rem;
			opacity: 0.75;
			font-style: italic;
		}
	}
	&__timeline {
		margin-bottom: 6rem;
		position: relative;
	}
	&__timeline-chart {
		position: relative;
		min-height: 400px;
	}
}
</style>

<template>
	<div class="page page-dashboard limit-width">
		<div class="page-dashboard__counts-container">
			<!-- <h2 class="mb-1 text-center">Totals</h2>
			<p class="body-1 text-center">total cases, deaths, and recoveries over time</p>-->

			<!-- total counts -->
			<data-wrapper resourceAccessor="mainResource" v-slot="{ _state }">
				<v-layout class="page-dashboard__counts mt-10" justify-space-between>
					<count-widget color="blue" label="cases" id="confirmed" v-bind="_state"></count-widget>
					<count-widget color="red" label="deaths" id="deaths" v-bind="_state"></count-widget>
					<count-widget color="green" label="recovered" id="recovered" v-bind="_state"></count-widget>
				</v-layout>
			</data-wrapper>
		</div>

		<!-- cases over time -->
		<div class="page-dashboard__timeline">
			<!-- <h2 class="mb-1 text-center">Timeline</h2>
			<p class="body-1 text-center">Confirmed cases, deaths, and recoveries over time</p>-->
			<v-card class="pb-3 pt-1 px-4">
				<chart-wrapper
					class="page-dashboard__timeline-chart mt-10"
					id="timeline-chart"
					type="line"
					resourceAccessor="timelineResource"
				/>
			</v-card>
			<!-- <span v-if="!_state.loading" class="body-2 last-updated text-secondary"
					>Last updated {{ $h.get(_state, 'data.updated') | timeAgo }}</span
			>-->
		</div>

		<data-wrapper resourceAccessor="mainResource" v-slot="{ _state }">
			<div class="page-dashboard__stats">
				<stat-widget class="state" label="Critical" :value="$h.get(_state, 'data.totals.critical')"></stat-widget>
				<stat-widget class="state" label="Active" :value="$h.get(_state, 'data.totals.active')"></stat-widget>
				<stat-widget
					class="state"
					label="Per Million"
					:value="$h.get(_state, 'data.totals.casesPerOneMillion')"
				></stat-widget>
			</div>
		</data-wrapper>

		<!-- country-list -->
		<div class="page-dashboard__country-list" v-if="false">
			<h2 class="mb-1 text-center">Countries</h2>
			<p class="body-1 text-center">Select a country to see more information</p>
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
			</v-layout>-->
			<data-wrapper resourceAccessor="timelineResource" v-slot="{ _state }">
				<country-list class="mt-10" :items="_state.data" :loading="_state.loading" />
			</data-wrapper>
		</div>
	</div>
</template>

<script>
import CountWidget from '@/components/widgets/CountWidget'
import StatWidget from '@/components/widgets/StatWidget'
import CountryList from '@/components/country-list/CountryList'
import ChartWrapper from '@/components/charts/ChartWrapper'

export default {
	name: 'dashboard-page',
	components: { CountWidget, StatWidget, CountryList, ChartWrapper },
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
	padding-top: 0;

	&__counts {
		margin-bottom: 1.5rem;
		position: relative;

		.count-widget {
			width: 100%;
			max-width: 250px;
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
		margin-bottom: 2rem;
		position: relative;
	}
	&__timeline-chart {
		position: relative;
		min-height: 400px;
	}
	&__stats {
		display: grid;
		grid-gap: 1rem;
		grid-template-columns: 1fr 1fr 1fr;

		.stat {
			&:not(:last-child) {
				margin-right: 0.5rem;
			}
		}
	}
}
</style>

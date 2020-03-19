<template>
	<div class="page page-dashboard">
		<!-- total counts -->
		<data-wrapper resource="counts" persist-data v-slot="{ _state }">
			<v-layout class="page-dashboard__counts" justify-space-between>
				<count-widget
					label="cases"
					v-bind="_state"
					:count="$h.get(_state, 'data.cases')"
				></count-widget>
				<count-widget
					label="deaths"
					v-bind="_state"
					:count="$h.get(_state, 'data.deaths')"
				></count-widget>
				<count-widget
					label="recovered"
					v-bind="_state"
					:count="$h.get(_state, 'data.recovered')"
				></count-widget>
			</v-layout>
		</data-wrapper>

		<!-- country-list -->
		<v-layout class="mb-4">
			<v-text-field
				class="mr-5"
				style="max-width: 280px"
				solo
				hide-details
				v-model="keyword"
				placeholder="Search"
			/>
			<v-select
				style="max-width: 260px"
				placeholder="Sory by"
				solo
				hide-details
				:items="sortItems"
				v-model="sort"
			></v-select>
		</v-layout>
		<data-accessor resource="countriesResource" v-slot="{ _state }">
			<data-wrapper
				v-slot="{ _state: _filteredState }"
				:data="$h.get(_state, 'data.data', [])"
				:params="params"
				:sort="sort"
			>
				<country-list :items="_filteredState.data" :loading="_state.loading" />
			</data-wrapper>
		</data-accessor>
	</div>
</template>

<script>
import CountWidget from '@/components/widgets/CountWidget'
import CountryList from '@/components/country-list/CountryList'

export default {
	name: 'dashboard-page',
	components: { CountWidget, CountryList },
	data() {
		return {
			keyword: '',
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
				_keyword: this.keyword,
			}
		},
	},
}
</script>

<style lang="scss">
.page-dashboard {
	&__counts {
		margin-bottom: 5rem;

		.count-widget {
			width: 100%;

			&:not(:last-child) {
				margin-right: 2rem;
			}
		}
	}
}
</style>

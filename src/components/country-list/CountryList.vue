<template>
	<div class="country-list">
		<!-- <v-layout class="country-list__header">
			<v-text-field
				style="max-width: 350px"
				placeholder="Search for a country"
				prepend-inner-icon="mdi-magnify"
				hide-details
				clearable
				outlined
				large
				v-model="keyword"
			/>
		</v-layout>-->
		<data-table-wrapper
			class="row-pad"
			:data="countryData"
			:loading="loading"
			:columns="CountryHeaders"
		/>

		<!-- :pagination="pagination"
			:params="{ country: keyword }"
		:sort="sort"-->
		<!-- <v-expansion-panels flat class="country-list__list" :class="{ loading: _state.loading }">
				<country-list-item
					v-for="(item, i) in _state.data"
					:key="i"
					:data="item"
					:sortKey="sortKey"
				/>
				<li
					v-if="pagination.size < countries.length"
					v-ripple
					class="see-more"
					@click="pagination.size += 15"
				>
					See more
					<v-icon>mdi-chevron-down</v-icon>
				</li>
		</v-expansion-panels>-->
		<!-- </data-wrapper> -->
	</div>
</template>

<script>
// import CountryListItem from '@/components/country-list/CountryListItem'
import DataTableWrapper from '@/components/table/wrappers/DataTableWrapper'
import CountryHeaders from '@/data/columns/CountryHeaders.js'

export default {
	name: 'country-list',
	components: { DataTableWrapper },
	props: ['data', 'loading'],
	data() {
		return {
			CountryHeaders,
			keyword: '',
			sortKey: 'active',
			selectItems: [
				{ text: 'Most Active Cases', value: 'active' },
				{ text: 'Most Total Cases', value: 'cases' },
				{ text: 'Most Deaths', value: 'deaths' },
				{ text: 'Highest Deaths/Cases', value: 'deathsPerCases' },
				{ text: 'Most Recovered', value: 'recovered' },
				{ text: 'Most Critical Conditions', value: 'critical' },
				{ text: 'Highest Cases Per Million', value: 'casesPerOneMillion' },
				{ text: 'Highest Deaths Per Million', value: 'deathsPerOneMillion' },
			],
		}
	},
	computed: {
		sort() {
			return {
				key: this.sortKey,
				desc: false,
			}
		},
		countryData() {
			if (this.data.map) {
				return Object.values(this.data.map)
			} else {
				return []
			}
		},
	},
	methods: {
		getCounts(name) {
			let countries = this.$h.get(this.countryData, `data.countries`, [])
			let match = countries.find(c => c.country === name)
			if (match) {
				return match
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.country-list {
	min-height: 300px;

	&__header {
		padding: 1rem;
		display: flex;
		justify-content: flex-end;
	}
	&__list {
		margin: 0 !important;
		padding: 0 !important;
		height: 100%;

		&.loading {
			pointer-events: none;
			opacity: 0.25;
		}
	}
	&__card {
		min-height: 300px;
		position: relative;
	}
}
.see-more {
	padding: 1rem 1rem;
	text-align: center;
	display: block;
	cursor: pointer;
	width: 100%;
	text-transform: uppercase;
	color: var(--v-secondary-base);
	display: flex;
	align-items: center;
	justify-content: center;

	i {
		font-size: 2rem;
	}
}
</style>

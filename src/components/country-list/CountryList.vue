<template>
	<div class="country-list">
		<v-layout class="country-list__header">
			<v-text-field
				class="mr-5"
				style="max-width: 350px"
				placeholder="Search for a country"
				prepend-inner-icon="mdi-magnify"
				hide-details
				clearable
				outlined
				large
				v-model="keyword"
			/>
			<v-select
				outlined
				style="max-width: 225px"
				placeholder="Sort countries"
				hide-details
				clearable
				:items="selectItems"
				v-model="sortKey"
			/>
		</v-layout>
		<data-wrapper
			:data="countryData"
			:pagination="pagination"
			:params="{ country: keyword }"
			:sort="sort"
			v-slot="{ _state }"
		>
			<v-expansion-panels flat class="country-list__list" :class="{ loading: _state.loading }">
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
			</v-expansion-panels>
		</data-wrapper>
	</div>
</template>

<script>
import CountryListItem from '@/components/country-list/CountryListItem'

export default {
	name: 'country-list',
	components: { CountryListItem },
	props: ['data', 'loading'],
	data() {
		return {
			keyword: '',
			pagination: {
				from: 0,
				size: 5,
			},
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
			return Object.values(this.data)
		},
		countries() {
			if (!this.$h.exists(this.items)) {
				return []
			}
			return Object.keys(this.items).map(name => ({
				history: this.items[name],
				counts: this.getCounts(name),
				name,
			}))
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
		margin-bottom: 1.5rem;
		padding-left: 2rem;
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

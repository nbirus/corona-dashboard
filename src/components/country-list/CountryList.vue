<template>
	<div class="country-list">
		<!-- <v-layout class="country-list__header" v-if="!loading">
			<v-text-field
				class="mr-10"
				style="max-width: 250px"
				placeholder="Find a country"
				prepend-inner-icon="mdi-magnify"
				hide-details
				clearable
				solo
				v-model="keyword"
			/>
			<v-text-field solo style="max-width: 200px" placeholder="Sort countries" hide-details clearable />
		</v-layout>-->

		<div class="country-list__card">
			<state-handler v-bind="{ loading }">
				<data-wrapper
					:data="countries"
					:pagination="pagination"
					:params="{ name: keyword }"
					:sort="sort"
					v-slot="{ _state }"
				>
					<v-expansion-panels class="country-list__list">
						<country-list-item v-for="(item, i) in _state.data" :key="i" v-bind="item" />
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
			</state-handler>
		</div>
	</div>
</template>

<script>
import CountryListItem from '@/components/country-list/CountryListItem'

export default {
	name: 'country-list',
	components: { CountryListItem },
	props: ['items', 'loading'],
	data() {
		return {
			keyword: '',
			pagination: {
				from: 0,
				size: 10,
			},
			sort: {
				key: 'counts.cases',
				desc: false,
			},
		}
	},
	computed: {
		countryData() {
			return this.$store.getters['mainResource/state']
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
	&__header {
		margin-bottom: 1.5rem;
	}
	&__list {
		margin: 0 !important;
		padding: 0 !important;
		height: 100%;
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

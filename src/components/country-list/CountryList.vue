<template>
	<div class="country-list">
		<div class="country-list__header">
			<v-text-field
				v-if="!loading"
				style="max-width: 300px"
				placeholder="Find a country"
				prepend-icon="mdi-magnify"
				hide-details
				clearable
				v-model="keyword"
			/>
		</div>

		<div class="country-list__card">
			<state-handler v-bind="{ loading }">
				<data-wrapper
					:data="countries"
					:pagination="pagination"
					:params="{ name: keyword }"
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
		margin-bottom: 1.25rem;
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
	padding: 0.75rem 1rem;
	text-align: center;
	display: block;
	cursor: pointer;
	width: 100%;
	background-color: fade-out(black, 0.975);
	text-transform: uppercase;
	font-size: 0.9rem;
}
</style>

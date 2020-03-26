<template>
	<div class="home-page page limit-width">
		<div class="home-page__totals">
			<v-card class="home-page__totals-cases"></v-card>
			<v-card class="home-page__totals-deaths"></v-card>
			<v-card class="home-page__totals-recoveries"></v-card>
		</div>

		<v-card class="home-page__timeline"></v-card>

		<!-- totals -->
		<div class="home-page__totals" v-if="false">
			<count-widget
				id="cases"
				color="blue"
				label="cases"
				:value="$h.get(data, 'totals.cases')"
				:value-today="$h.get(data, 'today.cases')"
				:chart-data="$h.get(data, 'timeline.cases')"
				:dates="$h.get(data, 'timeline.dates')"
			/>
			<count-widget
				id="deaths"
				color="red"
				label="deaths"
				:value="$h.get(data, 'totals.deaths')"
				:value-today="$h.get(data, 'today.deaths')"
				:chart-data="$h.get(data, 'timeline.deaths')"
				:dates="$h.get(data, 'timeline.dates')"
			/>
			<count-widget
				id="recovered"
				color="green"
				label="recovered"
				:value="$h.get(data, 'totals.recovered')"
				:value-today="$h.get(data, 'today.recovered')"
				:chart-data="$h.get(data, 'timeline.recovered')"
				:dates="$h.get(data, 'timeline.dates')"
			/>
		</div>

		<!-- timeline -->
		<v-card class="home-page__timeline" v-if="false">
			<h2 class="text-center">Timeline</h2>
			<chart-wrapper type="line" id="timeline" :data="$h.get(data, 'timeline')" />
		</v-card>

		<!-- extra stats -->
		<div class="home-page__stats" v-if="false">
			<stat-widget :value="$h.get(data, 'totals.active')" id="active" label="Active Cases" />
			<stat-widget :value="$h.get(data, 'totals.critical')" id="critical" label="Critical Condition" />
			<stat-widget
				:value="`${$h.get(data, 'totals.deathsPerCases')}%`"
				id="deathsPerCases"
				label="Average Deaths Per Cases"
			/>
			<stat-widget
				:value="$h.get(data, 'totals.casesPerOneMillion')"
				id="casesPerOneMillion"
				label="Cases Per Million"
			/>
			<country-widget label="Highest Death Rate" :value="$h.get(data, 'highestDeathsPerCases')" />
			<country-widget label="Lowest Death Rate" :value="$h.get(data, 'lowestDeathsPerCases')" />
		</div>

		<!-- map -->
		<v-card class="home-page__geolocation" v-if="false">
			<map-container />
		</v-card>

		<!-- timeline -->
		<v-card class="home-page__per-million" v-if="false">
			<h2 class="text-center">Per Million</h2>
			<chart-wrapper type="bar" id="million" :data="$h.get(data, 'countries')" />
		</v-card>

		<!-- map -->
		<v-card class="home-page__news" v-if="false">
			<h2 class="text-center mb-2">Top Stories</h2>
			<news-feed />
		</v-card>

		<!-- map -->
		<v-card class="home-page__countries" v-if="false">
			<country-list :data="$h.get(data, 'countries')" />
		</v-card>
	</div>
</template>

<script>
import CountWidget from '@/components/widgets/CountWidget'
import StatWidget from '@/components/widgets/StatWidget'
import CountryWidget from '@/components/widgets/CountryWidget'
import ChartWrapper from '@/components/charts/ChartWrapper'
import MapContainer from '@/components/map/MapContainer'
import NewsFeed from '@/components/news/NewsFeed'
import CountryList from '@/components/country-list/CountryList'

export default {
	name: 'home-page',
	components: {
		StatWidget,
		CountWidget,
		CountryWidget,
		ChartWrapper,
		MapContainer,
		NewsFeed,
		CountryList,
	},
	computed: {
		data() {
			return this.$store.getters['data/get']
		},
	},
}
</script>

<style lang="scss" scoped>
.home-page {
	display: grid;
	grid-gap: 1.5rem;
	grid-template-rows: min-content;

	&__totals {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 175px;
		grid-gap: 1.5rem;
	}
	&__timeline {
		min-height: 432px;
	}
}

@media screen and (max-width: 480px) {
	.home-page {
		&__totals {
			grid-template-columns: 1fr;
			grid-template-rows: 175px 175px 175px;
			grid-gap: 1rem;
		}
		&__timeline {
			min-height: 300px;
		}
	}
}

.home-page2 {
	&__totals {
		margin-bottom: 2.5rem;
		position: relative;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 2rem;

		.count-widget {
			width: 100%;
		}
	}
	&__timeline {
		min-height: 432px;
		padding: 2rem 1.25rem 1.5rem 1rem;
		margin-bottom: 2.5rem;

		h2 {
			line-height: 0.5;
		}
	}
	&__per-million {
		min-height: 432px;
		padding: 2rem 1.25rem 1.5rem 1rem;
		margin-bottom: 2.5rem;

		h2 {
			line-height: 0.5;
		}
	}
	&__stats {
		margin-bottom: 2.5rem;
		position: relative;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 1rem;
	}
	&__geolocation {
		height: auto;
		margin-bottom: 2.5rem;
	}
	&__news {
		padding: 2rem 1.5rem;
		margin-bottom: 2.5rem;
	}
	&__countries {
		padding: 2rem 0 0;
	}
}
</style>

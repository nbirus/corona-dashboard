<template>
	<div class="home-page page" :key="key">
		<div class="home-page__totals">
			<count-widget
				class="home-page__totals-cases"
				id="cases"
				color="blue"
				label="total cases"
				:value="$h.get(data, 'totals.cases')"
				:value-today="$h.get(data, 'totals.todayCases')"
				:chart-data="$h.get(data, 'timeline.cases')"
				:dates="$h.get(data, 'timeline.dates')"
			/>
			<count-widget
				class="home-page__totals-deaths"
				id="deaths"
				color="red"
				label="deaths"
				:value="$h.get(data, 'totals.deaths')"
				:value-today="$h.get(data, 'totals.todayDeaths')"
				:chart-data="$h.get(data, 'timeline.deaths')"
				:dates="$h.get(data, 'timeline.dates')"
			/>
			<v-card class="home-page__recovered">
				<h1 class="mr-2">{{$h.get(data, 'totals.recovered') | localeString}}</h1>
				<span>recovered</span>
			</v-card>
		</div>

		<v-card class="home-page__timeline">
			<chart-wrapper
				v-if="$h.exists(data.timeline)"
				type="line"
				id="timeline"
				:data="$h.get(data, 'timeline')"
			/>
		</v-card>

		<!-- extra stats -->
		<div class="home-page__stats" v-if="false">
			<stat-widget :value="$h.get(data, 'totals.active')" id="active" label="Active Cases" />
			<stat-widget :value="$h.get(data, 'totals.critical')" id="critical" label="Critical Condition" />
			<!-- <stat-widget
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
			<country-widget label="Lowest Death Rate" :value="$h.get(data, 'lowestDeathsPerCases')" />-->
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
import ChartWrapper from '@/components/charts/ChartWrapper'
import MapContainer from '@/components/map/MapContainer'
import NewsFeed from '@/components/news/NewsFeed'
import CountryList from '@/components/country-list/CountryList'

export default {
	name: 'home-page',
	components: {
		StatWidget,
		CountWidget,
		ChartWrapper,
		MapContainer,
		NewsFeed,
		CountryList,
	},
	computed: {
		data() {
			return this.$store.getters['data/get']
		},
		key() {
			return this.$store.getters['data/key']
		},
	},
}
</script>

<style lang="scss" scoped>
.home-page {
	display: grid;
	grid-gap: 1.5rem;
	grid-template-rows: min-content;
	grid-template-columns: 1fr 3.5fr;

	&__totals {
		display: grid;
		grid-template-rows: 2fr 2fr 1.25fr;
		grid-gap: 1.5rem;
	}
	&__recovered {
		display: flex;
		align-items: center;
		justify-content: center;

		span {
			font-size: 1.2rem;
		}
	}
	&__timeline {
		padding: 0.5rem 1rem 1.5rem;
		min-height: 517px;

		#timeline {
			min-height: 485px;
		}
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
</style>

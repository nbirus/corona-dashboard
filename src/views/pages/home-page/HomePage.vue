<template>
	<div class="home-page page limit-width">
		<!-- totals -->
		<div class="home-page__totals">
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
		<v-card class="home-page__timeline">
			<h2 class="text-center">Timeline</h2>
			<chart-wrapper type="line" id="timeline" :data="$h.get(data, 'timeline')" />
		</v-card>

		<!-- extra stats -->
		<div class="home-page__stats">
			<stat-widget :value="$h.get(data, 'totals.active')" id="active" label="Active Cases" />
			<stat-widget :value="$h.get(data, 'totals.critical')" id="critical" label="Critical Condition" />
			<stat-widget
				:value="$h.get(data, 'totals.casesPerOneMillion')"
				id="casesPerOneMillion"
				label="Cases Per Million"
			/>
		</div>
		<!-- map -->
		<v-card class="home-page__geolocation">
			<map-container />
		</v-card>

		<!-- map -->
		<v-card class="home-page__news">
			<h2 class="text-center mb-2">Top Stories</h2>
			<news-feed />
		</v-card>
	</div>
</template>

<script>
import CountWidget from '@/components/widgets/CountWidget'
import StatWidget from '@/components/widgets/StatWidget'
import ChartWrapper from '@/components/charts/ChartWrapper'
import MapContainer from '@/components/map/MapContainer'
import NewsFeed from '@/components/news/NewsFeed'

export default {
	name: 'home-page',
	components: { StatWidget, CountWidget, ChartWrapper, MapContainer, NewsFeed },
	computed: {
		data() {
			return this.$store.getters['data/get']
		},
	},
}
</script>

<style lang="scss" scoped>
.home-page {
	&__totals {
		margin-bottom: 1.5rem;
		position: relative;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 2rem;

		.count-widget {
			width: 100%;
		}
	}
	&__stats {
		margin-bottom: 2.5rem;
		position: relative;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 1rem;
	}
	&__timeline {
		min-height: 432px;
		padding: 2rem 1.25rem 2rem 1rem;
		margin-bottom: 2.5rem;

		h2 {
			line-height: 0.5;
		}
	}
	&__geolocation {
		height: auto;
		margin-bottom: 2.5rem;
	}
	&__news {
		padding: 2rem 1.5rem;
	}
}
</style>

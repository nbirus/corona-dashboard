<template>
	<div class="home-page page limit-width">
		<div class="home-page__totals">
			<count-widget
				id="confirmed"
				color="blue"
				label="confirmed"
				:value="$h.get(data, 'totals.confirmed')"
				:value-today="$h.get(data, 'today.confirmed')"
				:chart-data="$h.get(data, 'timeline.confirmed')"
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

		<v-card class="home-page__timeline">
			<h2 class="text-center">Timeline</h2>
			<chart-wrapper type="line" id="timeline" :data="$h.get(data, 'timeline')" />
		</v-card>

		<!-- <v-card class="home-page__geolocation">
			<world-map :value="$h.get(data, 'countries')" />
		</v-card>-->
	</div>
</template>

<script>
import CountWidget from '@/components/widgets/CountWidget'
import ChartWrapper from '@/components/charts/ChartWrapper'
import WorldMap from '@/components/map/WorldMap'

export default {
	name: 'home-page',
	components: { CountWidget, ChartWrapper, WorldMap },
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
		margin-bottom: 2rem;
		position: relative;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 2rem;

		.count-widget {
			width: 100%;
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
		min-height: 432px;
		padding: 2rem 1.5rem;
		margin-bottom: 2rem;

		h2 {
			line-height: 0.8;
		}
	}
	&__geolocation {
		height: auto;
	}
}
</style>
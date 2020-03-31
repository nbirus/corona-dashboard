<template>
	<div class="home-page page limit-width" :key="key" :class="{ loading }">
		<div class="home-page__total-cases">
			<v-card class="max">
				<count-widget
					class="home-page__totals-cases"
					id="cases"
					color="blue"
					label="total cases"
					:loading="loading"
					:value="$h.get(data, 'totals.cases')"
					:value-today="$h.get(data, 'totals.todayCases')"
					:chart-data="$h.get(data, 'timeline.cases')"
					:dates="$h.get(data, 'timeline.dates')"
				/>
			</v-card>
		</div>
		<div class="home-page__total-deaths">
			<v-card class="max">
				<count-widget
					class="home-page__totals-deaths"
					id="deaths"
					color="red"
					label="deaths"
					:loading="loading"
					:value="$h.get(data, 'totals.deaths')"
					:value-today="$h.get(data, 'totals.todayDeaths')"
					:chart-data="$h.get(data, 'timeline.deaths')"
					:dates="$h.get(data, 'timeline.dates')"
				/>
			</v-card>
		</div>
		<div class="home-page__total-info">
			<v-card class="max">
				<spinner v-if="loading" />
				<div v-else>
					<div class="key-value">
						<v-avatar color="grey lighten-4" class="icon">
							<v-icon>mdi-account-group</v-icon>
						</v-avatar>
						<div class="value">{{ data.totals.casesPerOneMillion | localeString }}</div>
						<div class="key">Cases Per Million</div>
					</div>
					<div class="key-value">
						<v-avatar color="grey lighten-4" class="icon">
							<v-icon>mdi-account-group</v-icon>
						</v-avatar>
						<div class="value">{{ data.totals.deathsPerOneMillion | localeString }}</div>
						<div class="key">Deaths Per Million</div>
					</div>
					<div class="key-value">
						<v-avatar color="grey lighten-4" class="icon">
							<v-icon>mdi-account-multiple-remove-outline</v-icon>
						</v-avatar>
						<div class="value">{{ data.totals.deathRate | localeString }}%</div>
						<div class="key">Death Rate</div>
					</div>
				</div>
			</v-card>
		</div>
		<div class="home-page__timeline chart">
			<v-card class="max">
				<div class="header">
					<h2 class="text-center">Timeline</h2>
				</div>
				<div class="body">
					<chart-wrapper
						type="line"
						id="timeline"
						:loading="loading"
						:data="$h.get(data, 'timeline', [])"
					/>
				</div>
			</v-card>
		</div>
		<div class="home-page__bar">
			<v-card class="max">
				<spinner :size="90" v-if="loading" />
				<stat-widget v-else :totals="data.totals" />
			</v-card>
		</div>
		<div class="home-page__map" v-if="key === 'world'">
			<v-card class="max">
				<map-container :loading="loading" />
			</v-card>
		</div>
		<div class="home-page__world" v-if="key === 'world'">
			<div class="home-page__per-million chart">
				<v-card class="max">
					<div class="header">
						<h2 class="text-center">Per million</h2>
					</div>
					<div class="body">
						<chart-wrapper :loading="!loading" type="bar" id="million" :data="data" />
					</div>
				</v-card>
			</div>
			<div class="home-page__news">
				<v-card class="max">
					<div class="header">
						<h2>Top Stories</h2>
					</div>
					<news-feed />
				</v-card>
			</div>
		</div>
		<v-card class="home-page__countries" v-if="key === 'world'">
			<country-list :loading="loading" :data="data" />
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
		loading() {
			return this.$store.getters['data/loading']
		},
	},
}
</script>

<style lang="scss" scoped>
.home-page {
	display: grid;
	grid-gap: 2rem;
	grid-template-columns: 1fr 3.75fr;
	grid-template-rows: 175px 175px 125px 90px 725px 600px auto;

	&__total-cases {
		grid-row: 1;
		grid-column: 1;
	}
	&__total-deaths {
		grid-row: 2;
		grid-column: 1;
	}
	&__total-info {
		grid-row: 3 / 5;
		grid-column: 1;

		.max {
			padding: 1.5rem;
		}
		.key-value {
			margin-bottom: 1rem;
			display: grid;
			grid-template-columns: 0px auto;
			grid-template-rows: 2.5rem 1rem;

			.icon {
				grid-row: 1 / 2;
				grid-column: 1;
				display: none;
			}
			.value {
				grid-row: 1;
				grid-column: 2;
				font-size: 1.75rem;
			}
			.key {
				grid-row: 2;
				grid-column: 2;
				transform: translateY(-0.25rem);
			}
		}
	}
	&__timeline {
		grid-row: 1 / 4;
		grid-column: 2;
	}
	&__bar {
		grid-row: 4;
		grid-column: 2;
	}
	&__map {
		grid-row: 5;
		grid-column: span 2;

		.max {
			display: block !important;
		}
	}
	&__world {
		grid-row: 6;
		grid-column: span 2;
		display: grid;
		grid-template-columns: 1fr 2.5fr;
		grid-gap: 2rem;
	}
	&__per-million {
		order: 2;
	}
	&__news {
		order: 1;
		.max {
			max-height: 600px;
			overflow-y: auto;
			display: block !important;
		}
		.header {
			padding: 1.5rem 1.5rem 0.5rem;
			text-align: center;
		}
	}
	&__countries {
		grid-row: 7;
		grid-column: span 2;
	}

	.chart {
		.max {
			display: block !important;
			padding: 0 1rem 1rem;
		}
		.header {
			padding-top: 1.25rem;
		}
		.body {
			transform: translateY(-1rem);
			height: 100%;
		}

		#timeline {
			min-height: calc(514px - 4rem);
		}
		#million {
			min-height: calc(600px - 4.3rem);
		}
	}
}
.max {
	height: 100%;
	width: 100%;
}
.loading .max {
	display: flex;
	align-items: center;
	justify-content: center;
}

// @media screen and (max-width: 480px) {
// 	.home-page {
// 		&__totals {
// 			grid-template-columns: 1fr;
// 			grid-template-rows: 175px 175px 175px;
// 			grid-gap: 1rem;
// 		}
// 		&__timeline {
// 			min-height: 300px;
// 		}
// 	}
// }
</style>

<template>
	<div class="home-page page limit-width" :key="key" :class="{ loading, country: key !== 'world' }">
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
			<v-card class="max death-rate">
				<spinner v-if="loading" />
				<v-layout align-center space-between v-else>
					<div class="key-value">
						<div class="value">{{ data.totals.deathRate | localeString }}%</div>
						<div class="key">death rate</div>
					</div>
					<v-flex></v-flex>
					<v-tooltip top>
						<template v-slot:activator="{ on }">
							<v-avatar color="grey lighten-4" v-on="on">
								<v-icon>
									mdi-arrow-{{
									data.totals.deathRateYesterday > data.totals.deathRate ? 'down' : 'up'
									}}
								</v-icon>
							</v-avatar>
						</template>
						<span>The death rate was {{ data.totals.deathRateYesterday }}% yesterday</span>
					</v-tooltip>
				</v-layout>
			</v-card>
			<v-card class="max per-million">
				<spinner v-if="loading" />
				<div v-else>
					<div class="header">Per Million People</div>
					<div class="body">
						<div class="key-value-per">
							<div class="value">{{ data.totals.casesPerOneMillion | localeString }}</div>
							<div class="key">cases</div>
						</div>
						<div class="key-value-per">
							<div class="value">{{ data.totals.deathsPerOneMillion | localeString }}</div>
							<div class="key">deaths</div>
						</div>
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
				<map-container :key="key" :loading="loading" />
			</v-card>
		</div>
		<div class="home-page__map" v-else>
			<v-card class="max">
				<map-country-container :loading="loading" />
			</v-card>
		</div>
		<div class="home-page__world" v-if="key === 'world'" v-intersect="onIntersectSecond">
			<div class="home-page__per-million chart" v-if="showNewsMillion">
				<v-card class="max">
					<div class="header">
						<h2 class="text-center">Per million</h2>
					</div>
					<div class="body">
						<chart-wrapper
							:loading="!loading"
							type="bar"
							id="million"
							:data="$h.exists(data) ? data : []"
						/>
					</div>
				</v-card>
			</div>
			<v-card class="max" v-else></v-card>
			<div class="home-page__news">
				<v-card class="max" v-if="showNewsMillion">
					<div class="header">
						<h2>Top Stories</h2>
					</div>
					<news-feed />
				</v-card>
				<v-card class="max" v-else></v-card>
			</div>
		</div>

		<v-card class="home-page__countries" v-if="key === 'world'" v-intersect="onIntersect">
			<country-list v-if="showList" :loading="loading" :data="data" />
			<div v-else style="height: 400px"></div>
		</v-card>
		<v-card class="home-page__countries" v-else>
			<state-list :loading="loading" :data="data" />
		</v-card>
	</div>
</template>

<script>
import CountWidget from '@/components/widgets/CountWidget'
import StatWidget from '@/components/widgets/StatWidget'
import ChartWrapper from '@/components/charts/ChartWrapper'
import MapContainer from '@/components/map/MapContainer'
import MapCountryContainer from '@/components/map/MapCountryContainer'
import NewsFeed from '@/components/news/NewsFeed'
import CountryList from '@/components/country-list/CountryList'
import StateList from '@/components/country-list/StateList'

export default {
	name: 'home-page',
	components: {
		StatWidget,
		CountWidget,
		ChartWrapper,
		MapContainer,
		MapCountryContainer,
		NewsFeed,
		CountryList,
		StateList,
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
		countryData() {
			if (this.$h.exists(this.data.map)) {
				return Object.values(this.data.map)
			} else {
				return []
			}
		},
	},
	data() {
		return {
			showList: false,
			showNewsMillion: false,
		}
	},
	methods: {
		onIntersect(e) {
			if (!this.showList) {
				this.showList = this.$h.get(e, '0.isIntersecting', false)
			}
		},
		onIntersectSecond(e) {
			if (!this.showNewsMillion) {
				this.showNewsMillion = this.$h.get(e, '0.isIntersecting', false)
			}
		},
	},
}
</script>

<style lang="scss">
.home-page {
	display: grid;
	grid-gap: 2rem;
	grid-template-columns: 1fr 3.75fr;
	grid-template-rows: 175px 175px 145px 80px 725px 600px auto;
	overflow: hidden;
	max-width: 100vw;

	&.country {
		grid-template-rows: 175px 175px 145px 80px auto;
	}

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

		display: flex;
		flex-direction: column;

		.death-rate {
			flex: 0 0 100px;
			margin-bottom: 2rem;
		}
		.per-million {
			.header {
				margin-top: 0.15rem;
				margin-bottom: 0.75rem;
			}
			.body {
				display: flex;
				align-items: center;

				.value {
					font-size: 2rem;
					font-weight: $bold;
					line-height: 0.9;
				}
			}
			.key-value-per:first-child {
				margin-right: 4rem;
			}
		}
		.max {
			padding: 1rem 2rem;
		}
		.key-value {
			display: grid;
			grid-template-columns: 0px auto;
			grid-template-rows: 3rem 1rem;
			z-index: 3;

			.icon {
				grid-row: 1 / 2;
				grid-column: 1;
				display: none;
				text-align: center;
			}
			.value {
				grid-row: 1;
				grid-column: 2;
				font-size: 2.2rem;
				color: black;
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
			padding: 1.5rem 1.5rem 0;
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
			min-height: calc(514px - 1.5rem);
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

@media screen and (max-width: 480px) {
	.home-page {
		grid-template-columns: 1fr;
		grid-template-rows: auto auto 370px auto auto auto;
		padding: 2rem 1rem !important;
		grid-gap: 1.5rem;

		&__total-cases {
			grid-row: 1;
			grid-column: 1;
		}
		&__total-deaths {
			grid-row: 2;
			grid-column: 1;
		}
		&__timeline {
			grid-row: 3;
			grid-column: 1;
		}
		&__total-info {
			grid-row: 4;
			grid-column: 1;

			.death-rate {
				margin-bottom: 1.5rem;
				padding: 1rem 1.5rem;
			}
			.per-million {
				padding: 1rem 1.5rem;
			}
		}
		&__bar {
			grid-row: 5;
			grid-column: 1;
		}
		&__map {
			grid-row: 6;
			grid-column: 1;
			display: none;
		}
		&__world {
			grid-row: 6;
			grid-column: 1;
			display: flex;
		}
		&__per-million {
			flex: 0 1 100%;
			order: unset;
			display: none !important;
		}
		&__news {
			order: 1;
			display: none;
		}
		&__countries {
			grid-row: 7;
			grid-column: 1;
			display: none;
		}

		.chart {
			.max {
				display: block !important;
				padding: 0 1rem 1rem;
			}
			.header {
				padding-top: 1rem;
			}
			.body {
				transform: translateY(-1.5rem);
				height: 100%;
			}

			#timeline {
				min-height: calc(200px - 5rem) !important;

				.chartjs-render-monitor {
					width: 100% !important;
					height: 100% !important;
				}
			}
			#million {
				min-height: calc(600px - 4.3rem);
			}
		}
	}
}
</style>

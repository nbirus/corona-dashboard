<template>
	<div class="home-page page limit-width" :key="key" :class="{ loading, country: key !== 'world' }">
		<div class="home-page__total-container">
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
						label="total deaths"
						:loading="loading"
						:value="$h.get(data, 'totals.deaths')"
						:value-today="$h.get(data, 'totals.todayDeaths')"
						:chart-data="$h.get(data, 'timeline.deaths')"
						:dates="$h.get(data, 'timeline.dates')"
					/>
				</v-card>
			</div>
		</div>
		<div class="home-page__timeline">
			<v-card class="max">
				<div class="header">
					<h2 class="text-center">Timeline</h2>
					<div class="actions">
						<v-switch class="mb-0 mr-1" small v-model="logarithmic" />
						<!-- <span class="mb-2 body-1">Logarithmic</span> -->
					</div>
				</div>
				<div class="body">
					<chart-wrapper
						type="line"
						id="timeline"
						:loading="loading"
						:key="logarithmic"
						:logarithmic="logarithmic"
						:data="formatTimeline($h.get(data, 'timeline', []))"
					/>
				</div>
			</v-card>
		</div>
		<div class="home-page__total-info">
			<div class="bg"></div>
			<div class="key-value">
				<div class="icon">
					<v-icon size="60" v-if="data.totals">
						mdi-arrow-{{
						data.totals.deathRateYesterday > data.totals.deathRate ? 'down' : 'up'
						}}
					</v-icon>
				</div>
				<div class="value" v-if="data.totals">{{ data.totals.deathRate | localeString }}%</div>
				<div class="key">death rate</div>
			</div>
			<div class="key-value">
				<div class="icon"></div>
				<div class="value" v-if="data.totals">{{ data.totals.casesPerOneMillion | localeString }}</div>
				<div class="key">cases / million</div>
			</div>
			<div class="key-value">
				<div class="icon"></div>
				<div class="value" v-if="data.totals">{{ data.totals.deathsPerOneMillion | localeString }}</div>
				<div class="key">deaths / million</div>
			</div>
			<!-- <v-card class="max per-million">
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
			</v-card>-->
		</div>
		<div class="home-page__bar">
			<div class="max">
				<spinner :size="90" v-if="loading" />
				<stat-widget v-else :totals="data.totals" />
			</div>
		</div>
		<div class="home-page__map" v-if="key === 'world'">
			<div class="max">
				<map-container :key="key" :loading="loading" />
			</div>
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
			logarithmic: false,
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
		formatTimeline(data) {
			if (!this.$h.exists(data)) {
				return data
			}
			return {
				cases: data.cases.filter((v, i) => i % 3 === 0),
				deaths: data.deaths.filter((v, i) => i % 3 === 0),
				dates: data.dates.filter((v, i) => i % 3 === 0),
			}
		},
	},
}
</script>

<style lang="scss">
.home-page {
	display: grid;
	grid-gap: 3rem;
	// grid-template-columns: 1fr 3.75fr;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: auto 600px auto auto auto auto auto;
	max-width: 100vw;
	padding-top: 3rem;

	&__total-cases {
		flex: 1;
		margin-right: 1rem;
		overflow: visible;
	}
	&__total-deaths {
		flex: 1;
		margin-left: 1rem;
	}
	&__total-container {
		grid-row: 1;
		grid-column: span 2;
		display: flex;
		justify-content: center;
		margin: 0 auto;
		width: 100%;
		max-width: 700px;
	}
	&__timeline {
		grid-row: 2;
		grid-column: span 2;
		max-width: 1100px;
		margin: 0 auto;
		width: 100%;

		.max {
			display: flex;
			flex-direction: column;

			.header {
				flex: 0 0 auto;
				padding: 1rem 0 0;
				width: 100%;
			}
			.actions {
				position: absolute;
				right: 2rem;
				top: 1rem;
				display: flex;
				align-items: center;
			}
			.body {
				width: 100%;
				flex: 0 1 100%;
				padding: 0rem 1rem 0;
			}

			h2 {
				font-size: 1.8rem;
			}
		}
		#timeline {
			min-height: calc(100% - 1rem);
		}
	}
	&__total-info {
		grid-row: 3;
		grid-column: span 2;
		margin: 3rem auto 2rem;
		padding-top: 2.75rem;
		width: 100%;

		max-width: 900px;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		position: relative;

		.bg {
			background-color: #daebf9;
			width: 100vw;
			position: absolute;
			height: 350px;
			top: 0;
			// clip-path: polygon(0 12%, 100% 0, 100% 87%, 0 100%);
		}

		.key-value {
			display: flex;
			flex-direction: column;
			align-items: center;
			z-index: 3;
			flex: 0 1 auto;
			padding: 2rem 1.5rem;
			min-width: 240px;

			.icon {
				width: 100px;
				height: 100px;
				border-radius: 50% !important;
				background-color: var(--v-primary-base);
				margin-bottom: 0.5rem;
				color: white;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.value {
				grid-row: 1;
				grid-column: 2;
				font-size: 2.2rem;
				color: black;
				font-size: 3rem;
			}
			.key {
				// color: black;
				grid-row: 2;
				grid-column: 2;
				font-size: 1.2rem;
				transform: translateY(-0.5rem);
			}
		}
	}
	&__bar {
		grid-row: 4;
		grid-column: span 2;
		margin: 0 auto 1rem;
		width: 100%;
		max-width: 1100px;
		display: none;
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

		.max {
			display: flex;
			flex-direction: column;
		}
		.header {
			flex: 0 0 auto;
			padding: 1.5rem 0 0;
			text-align: center;
		}
		.body {
			width: 100%;
			flex: 0 1 100%;
			padding: 0 1rem 0 0;
		}
		#million {
			min-height: calc(100% - 1rem);
		}
	}
	&__news {
		// display: none;
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
</style>

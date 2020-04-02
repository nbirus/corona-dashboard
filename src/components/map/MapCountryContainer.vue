<template>
	<div class="map-country-container">
		<!-- map -->
		<div class="map-country-container__map">
			<spread-country-map
				class="map"
				:loading="loading"
				:type="type"
				:value="$h.get(data, 'map')"
			/>
		</div>

		<!-- table -->
		<div class="map-country-container__table">
			<map-country-table v-if="!loading" class="table" :value="$h.get(data, 'map')" :type="type" />
			<div class="center" v-else>
				<spinner :size="90" />
			</div>
		</div>

		<!-- info -->
		<div class="map-country-container__info" :class="`active-${type}`">
			<div class="map-country-container__info-item cases" @click="type = 'cases'">
				<span class="bullet"></span>
				<span class="label">Cases</span>
				<strong class="value">{{ countryTotals.cases | localeString }}</strong>
			</div>
			<div class="map-country-container__info-item deaths" @click="type = 'deaths'">
				<span class="bullet"></span>
				<span class="label">Deaths</span>
				<strong class="value">{{ countryTotals.deaths | localeString }}</strong>
			</div>
			<div class="map-country-container__info-item recovered" @click="type = 'recovered'">
				<span class="bullet"></span>
				<span class="label">Recovered</span>
				<strong class="value">{{ countryTotals.recovered | localeString }}</strong>
			</div>
		</div>
	</div>
</template>

<script>
import SpreadCountryMap from '@/components/map/SpreadCountryMap'
import MapCountryTable from '@/components/map/MapCountryTable'

export default {
	name: 'map-country-container',
	components: { SpreadCountryMap, MapCountryTable },
	props: ['loading'],
	data() {
		return {
			type: 'cases',
		}
	},
	computed: {
		data() {
			return this.$store.getters['data/get']
		},
		countryData() {
			return this.$h.get(this.data, 'map', {})
		},
		countryTotals() {
			return {
				cases: this.$h.get(this.data, `totals.cases`, 0),
				deaths: this.$h.get(this.data, `totals.deaths`, 0),
				recovered: this.$h.get(this.data, `totals.recovered`, 0),
			}
		},
	},
}
</script>

<style lang="scss">
.center {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
}
.map-country-container {
	position: relative;
	display: flex;
	height: 725px;

	.default-loading {
		display: none;
	}

	&__map {
		height: 100%;
		flex: 0 1 100%;
	}
	&__table {
		flex: 0 0 300px;
	}
	&__info {
		position: absolute;
		top: 1rem;
		left: 1rem;
		z-index: 9999;
		background-color: fade-out(black, 0.2);
		color: white;
		padding: 0.5rem 0.75rem;
		border-radius: 0.75rem;
		min-width: 155px;

		&.active-cases {
			.cases .bullet {
				background-color: var(--v-primary-base);
			}
			.deaths,
			.recovered {
				opacity: 0.5;
			}
		}
		&.active-deaths {
			.deaths .bullet {
				background-color: var(--v-error-base);
			}
			.cases,
			.recovered {
				opacity: 0.5;
			}
		}
		&.active-recovered {
			.recovered .bullet {
				background-color: var(--v-success-base);
			}
			.cases,
			.deaths {
				opacity: 0.5;
			}
		}
	}
	&__date {
		position: absolute;
		top: 1rem;
		right: calc(1rem + 300px);
		z-index: 9999;
		background-color: fade-out(black, 0.2);
		color: white;
		padding: 0.4rem 0.75rem 0.2rem;
		border-radius: 0.75rem;
		min-width: 108px;
		text-align: center;
		font-size: 0.9rem;
	}
	&__info-item {
		display: flex;
		align-items: center;
		cursor: pointer;

		.label {
			margin-right: 0.25rem;
		}
		.bullet {
			border-radius: 50%;
			width: 10px;
			height: 10px;
			margin-right: 0.5rem;
			display: block;
		}
		&.cases .bullet {
			border: solid 2px var(--v-primary-base);
		}
		&.deaths .bullet {
			border: solid 2px var(--v-error-base);
		}
		&.recovered .bullet {
			border: solid 2px var(--v-success-base);
		}
	}

	&:hover {
		.map-country-container {
			&__dropdown {
				opacity: 0.8;
			}
			&__tracker {
				opacity: 1;
			}
		}
	}
}
</style>

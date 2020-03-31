<template>
	<div class="map-container">
		<!-- map -->
		<div class="map-container__map">
			<spread-map
				:loading="loading"
				class="map"
				:date-index="timelineIndex"
				:value="$h.get(data, 'map')"
				:type="type"
			/>
		</div>

		<!-- table -->
		<div class="map-container__table">
			<map-table
				v-if="!loading"
				class="table"
				:key="timelineIndex"
				:date-index="timelineIndex"
				:value="$h.get(data, 'map')"
				:type="type"
			/>
			<div class="center" v-else>
				<spinner :size="90" />
			</div>
		</div>

		<!-- timeline -->
		<div class="map-container__timeline">
			<timeline-controller :loading="loading" :type="type" />
		</div>

		<!-- info -->
		<div class="map-container__info" :class="`active-${type}`">
			<div class="map-container__info-item cases" @click="type = 'cases'">
				<span class="bullet"></span>
				<span class="label">Cases</span>
				<strong class="value">{{ activeDate.cases | localeString }}</strong>
			</div>
			<div class="map-container__info-item deaths" @click="type = 'deaths'">
				<span class="bullet"></span>
				<span class="label">Deaths</span>
				<strong class="value">{{ activeDate.deaths | localeString }}</strong>
			</div>
		</div>
		<div class="map-container__date">
			<strong>{{ activeDate.date | date('MMMM D') }}</strong>
		</div>
	</div>
</template>

<script>
import SpreadMap from '@/components/map/SpreadMap'
import MapTable from '@/components/map/MapTable'
import TimelineController from '@/components/timeline/TimelineController'

export default {
	name: 'map-container',
	components: { SpreadMap, TimelineController, MapTable },
	props: ['loading'],
	data() {
		return {
			type: 'cases',
			trackerStyle: {
				left: '16px',
			},
		}
	},
	computed: {
		data() {
			return this.$store.getters['data/get']
		},
		timelineIndex() {
			return this.$store.getters['timeline/timelineIndex']
		},
		activeDate() {
			return {
				cases: this.$h.get(this.data, `timeline.cases.${this.timelineIndex}`, 0),
				deaths: this.$h.get(this.data, `timeline.deaths.${this.timelineIndex}`, 0),
				date: this.$h.get(this.data, `timeline.dates.${this.timelineIndex}`, 'Jan 21'),
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
.map-container {
	position: relative;
	display: grid;
	grid-template-columns: auto 300px;
	height: 725px;

	.default-loading {
		display: none;
	}

	&__map {
		height: 100%;
		grid-row: 1;
		grid-column: 1;
		min-height: 650px;
		max-height: 650px;
	}
	&__timeline {
		flex: 0 0 auto;
		display: flex;
		align-items: center;
		grid-row: 2;
		grid-column: 1;
		padding: 0;
		z-index: 99999;
		overflow: visible;
		border-right: solid thin $border-color-light;
		height: 75px;
	}
	&__table {
		grid-row: span 2;
		grid-column: 2;
		max-height: 725px;
	}
	&__tracker {
		background-color: fade-out(black, 0.1);
		color: white;
		position: absolute;
		font-size: 0.9rem;
		bottom: 4.75rem;
		min-width: 60px;
		text-align: center;

		border-radius: 8px;
		padding: 0.25rem 0.5rem 0.1rem;
		z-index: 9999;
		transition: left 200ms ease, opacity 200ms ease;
	}
	&__pause {
		position: absolute;
		top: 4.35rem;
		left: 10px;
		z-index: 9999;

		.button {
			padding: 0 !important;
			min-width: 26px !important;
			max-height: 26px;

			.v-btn__content {
				width: 1px;
			}
		}
	}
	&__dropdown {
		position: absolute;
		top: 0.75rem;
		right: 1rem;
		z-index: 9999;
		opacity: 0;
		transition: opacity 0.2s ease;

		&:hover {
			opacity: 1;
		}

		.select {
			width: 150px;
		}
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
		.map-container {
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

<template>
	<div class="map-container">
		<!-- map -->
		<div class="map-container__map">
			<spread-map :date-index="timelineIndex" :value="$h.get(data, 'map')" :type="type" />
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

		<!-- timeline -->
		<div class="map-container__timeline">
			<timeline-controller />
		</div>
	</div>
</template>

<script>
import SpreadMap from '@/components/map/SpreadMap'
import TimelineController from '@/components/timeline/TimelineController'

export default {
	name: 'map-container',
	components: { SpreadMap, TimelineController },
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
				cases: this.$h.get(this.data, `timeline.cases.${this.timelineIndex}`),
				deaths: this.$h.get(this.data, `timeline.deaths.${this.timelineIndex}`),
			}
		},
	},
}
</script>

<style lang="scss">
.map-container {
	position: relative;
	display: flex;
	flex-direction: column;
	height: 90vh;

	&__map {
		height: 100%;
		flex: 0 1 100%;
	}
	&__timeline {
		flex: 0 0 auto;
		display: flex;
		align-items: center;
		padding: 0;
		z-index: 9999;
		overflow: visible;
		height: 65px;
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
		top: 0.75rem;
		right: 0.75rem;
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
	&__choice {
		position: absolute;
		top: 0.75rem;
		right: calc(1.75rem + 155px);
		z-index: 9999;
		background-color: fade-out(black, 0.2);
		color: white;
		padding: 0.25rem 0.25rem 0.25rem 0.75rem;
		border-radius: 0.75rem;

		.v-input--radio-group__input {
			flex-direction: row;
		}
		.v-input {
			height: 30px;
			margin: 0;
		}
		.v-label {
			color: white;
			font-size: 0.9rem;
		}
		.v-radio {
			margin-bottom: 0 !important;
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

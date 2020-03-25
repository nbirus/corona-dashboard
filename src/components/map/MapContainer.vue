<template>
	<div class="map-container">
		<!-- map -->
		<spread-map :date-index="dateIndex" :value="$h.get(data, 'countries')" :type="type" />

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
			<!-- <div class="map-container__info-item recovered" @click="type = 'recovered'">
				<span class="bullet"></span>
				<span class="label">Recovered</span>
				<strong class="value">{{ activeDate.recovered | localeString }}</strong>
			</div>-->
		</div>

		<!-- date tracker -->
		<div class="map-container__tracker" :style="trackerStyle">
			<span>{{ dates[dateIndex] | date('MMM D') }}</span>
		</div>

		<!-- pause button -->
		<div class="map-container__pause">
			<v-btn @click="paused = !paused" class="button leaflet-bar" small rounded color="white">
				<v-icon size="15">mdi-{{ !paused ? 'pause' : 'play' }}</v-icon>
			</v-btn>
		</div>

		<!-- timeline -->
		<div class="map-container__timeline">
			<v-slider
				ref="slider"
				v-model="dateIndex"
				@click="stop"
				:tick-labels="dates"
				:min="0"
				:max="dateLength"
			/>
		</div>
	</div>
</template>

<script>
import SpreadMap from '@/components/map/SpreadMap'

export default {
	name: 'map-container',
	components: { SpreadMap },
	data() {
		return {
			type: 'cases',
			paused: false,
			dateIndex: 0,
			intervalSpeed: 200,
			interval: null,
			hover: false,
			trackerStyle: {
				left: '16px',
			},
			activeDate: {
				cases: 0,
				deaths: 0,
				recovered: 0,
			},
			sliderEls: [],
		}
	},
	computed: {
		data() {
			return this.$store.getters['data/get']
		},
		dates() {
			return this.$h.get(this.data, 'timeline.dates', [])
		},
		dateLength() {
			return this.dates.length - 1
		},
	},
	mounted() {
		let container = this.$refs.slider.$el
		this.sliderEls = container.querySelector('.v-slider__ticks-container').children
		this.start()
	},
	methods: {
		start() {
			this.stop()
			this.interval = setInterval(() => {
				if (!this.paused) {
					if (this.dateIndex === this.dateLength) {
						this.paused = true
						setTimeout(() => {
							this.paused = false
							this.dateIndex = 0
						}, 3000)
					} else {
						this.dateIndex++
					}
				}
			}, this.intervalSpeed)
		},
		stop() {
			clearInterval(this.interval)
			this.interval = 0
		},
		setDatePos(index, ignore = false) {
			if (index % 2 === 0 || index === this.dateLength || ignore) {
				let point = this.sliderEls[index]
				let parent = point.parentElement.parentElement
				let pointBounds = point.getBoundingClientRect()
				let parentBounds = parent.getBoundingClientRect()
				this.trackerStyle.left = `${pointBounds.left - parentBounds.left}px`

				this.activeDate = {
					cases: this.$h.get(this.data, `timeline.cases.${index}`),
					deaths: this.$h.get(this.data, `timeline.deaths.${index}`),
					// recovered: this.$h.get(this.data, `timeline.recovered.${index}`),
				}
			}
		},
		setDateIndex(index) {
			this.paused = true
			this.dateIndex = index
			this.setDatePos(index, true)
		},
	},
	watch: {
		dateIndex: 'setDatePos',
	},
}
</script>

<style lang="scss">
.map-container {
	height: auto;

	.v-slider__tick-label {
		display: none;
	}
	.v-slider__tick:first-child,
	.v-slider__tick:last-child,
	.v-slider__tick:nth-child(7n) {
		.v-slider__tick-label {
			display: block;
		}
	}

	&__timeline {
		padding: 0.75rem 1.25em 0.25rem;
	}
	&__tracker {
		background-color: fade-out(black, 0.1);
		color: white;
		position: absolute;
		font-size: 0.9rem;
		bottom: 5.25rem;
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
		width: 175px;

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

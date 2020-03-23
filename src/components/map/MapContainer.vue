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
			<div class="map-container__info-item recovered" @click="type = 'recovered'">
				<span class="bullet"></span>
				<span class="label">Recovered</span>
				<strong class="value">{{ activeDate.recovered | localeString }}</strong>
			</div>
		</div>

		<!-- date tracker -->
		<div class="map-container__tracker" :style="trackerStyle">
			<span>{{ dates[activeDateIndex] | date('MMM D') }}</span>
		</div>

		<!-- pause button -->
		<div class="map-container__pause">
			<v-btn @click="paused = !paused" class="button leaflet-bar" small rounded color="white">
				<v-icon size="15">mdi-{{ !paused ? 'pause' : 'play' }}</v-icon>
			</v-btn>
		</div>

		<!-- timeline -->
		<div class="map-container__timeline" @mouseenter="enterTimeline" @mouseleave="leaveTimeline">
			<ul class="map-container__timeline-dates">
				<li
					class="map-container__timeline-date"
					v-for="(date, index) in dates"
					:id="`point-${index}`"
					:key="date"
					:class="{ active: index <= dateIndex, current: index === dateIndex }"
					tabindex="0"
					@click="setDateIndex(index)"
				>
					<span :class="type" class="point"></span>
					<span class="label">{{ date | date('MMM D') }}</span>
				</li>
			</ul>
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
			activeDateIndex: 0,
			intervalSpeed: 150,
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
				this.activeDateIndex = index
				let point = document.getElementById(`point-${index}`)
				let parent = point.parentElement.parentElement
				let pointBounds = point.getBoundingClientRect()
				let parentBounds = parent.getBoundingClientRect()
				this.trackerStyle.left = `${pointBounds.left - parentBounds.left - 22}px`
				this.activeDate = {
					cases: this.$h.get(this.data, `timeline.cases.${this.activeDateIndex}`),
					deaths: this.$h.get(this.data, `timeline.deaths.${this.activeDateIndex}`),
					recovered: this.$h.get(this.data, `timeline.recovered.${this.activeDateIndex}`),
				}
			}
		},
		setDateIndex(index) {
			this.paused = true
			this.dateIndex = index
			this.setDatePos(index, true)
		},

		enterTimeline() {
			this.hover = true
			setTimeout(() => {
				if (this.hover) {
					this.paused = true
				}
			}, 500)
		},
		leaveTimeline() {
			this.hover = false
		},
	},
	watch: {
		dateIndex: 'setDatePos',
	},
}
</script>

<style lang="scss" scoped>
.map-container {
	height: auto;

	&__timeline {
		height: auto;
	}
	&__timeline-dates {
		margin: 0;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		overflow: hidden;
		padding: 2.25rem 2rem 2rem;
		position: relative;
	}
	&__timeline-date {
		flex: 2;
		display: block;
		width: auto;

		.point {
			display: block;
			width: 3px;
			height: 3px;
			background-color: var(--v-secondary-lighten4);
			position: absolute;
			top: 1.25rem;
			z-index: 2;
			border-radius: 50%;
			cursor: pointer;
			transition: box-shadow 0.2s ease;
		}
		.label {
			display: none;
			height: auto;
			font-size: 0.9rem;
			position: absolute;
			transform: translateX(-0.75rem);
		}

		&:first-child,
		&:last-child,
		&:nth-child(7n) {
			flex: 3;
			.point {
				width: 10px;
				height: 10px;
				transform: translateY(-3px);
			}
			.label {
				display: block;
			}
		}
		&:last-child {
			.label {
				display: none;
			}
		}
		&.active .point,
		&:hover .point {
			&.cases {
				background-color: var(--v-primary-base);
			}
			&.deaths {
				background-color: var(--v-error-base);
			}
			&.recovered {
				background-color: var(--v-success-base);
			}
		}
		&:hover .point {
			&.cases {
				box-shadow: 0 0 0 3px var(--v-primary-lighten3);
			}
			&.deaths {
				box-shadow: 0 0 0 3px var(--v-error-lighten3);
			}
			&.recovered {
				box-shadow: 0 0 0 3px var(--v-success-lighten3);
			}
		}
		&.current .point {
			&.cases {
				background-color: var(--v-primary-base);
				box-shadow: 0 0 0 3px var(--v-primary-lighten3);
			}
			&.deaths {
				background-color: var(--v-error-base);
				box-shadow: 0 0 0 3px var(--v-error-lighten3);
			}
			&.recovered {
				background-color: var(--v-success-base);
				box-shadow: 0 0 0 3px var(--v-success-lighten3);
			}
		}
	}
	&__tracker {
		background-color: fade-out(black, 0.1);
		color: white;
		position: absolute;
		font-size: 0.9rem;
		bottom: 5rem;

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
			padding: 0;
			min-width: 26px;
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
			.deaths,
			.recovered {
				opacity: 0.5;
			}
		}
		&.active-deaths {
			.cases,
			.recovered {
				opacity: 0.5;
			}
		}
		&.active-recovered {
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
			background-color: var(--v-primary-base);
		}
		&.deaths .bullet {
			background-color: var(--v-error-base);
		}
		&.recovered .bullet {
			background-color: var(--v-success-base);
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

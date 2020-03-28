<template>
	<div class="controller">
		<div class="controller__timeline">
			<!-- date tracker -->
			<div class="controller__tracker" :style="trackerStyle">
				<span>{{ timelineDates[timelineIndex + 1] | date('MMM D') }}</span>
			</div>
			<chart-wrapper
				:key="timelineType"
				class="controller__chart"
				:id="`timeline-chart-${timelineType}`"
				type="line"
				ignore-loading
				:formatter="`line${timelineType}map`"
				:data="{ data: $h.get(data, `timeline.${timelineType}`), dates: $h.get(data, 'timeline.dates') }"
				:extra-options="chartOptions"
			/>
			<ul class="controller__dates">
				<li
					class="controller__date"
					v-for="(date, i) in timelineDates"
					:key="date"
					v-html="date"
					:class="i < timelineIndex || 'under'"
				></li>
			</ul>
			<input
				ref="slider"
				v-model="sliderValue"
				class="slider"
				type="range"
				min="0"
				step="1"
				:max="timelineMax"
				@click="pause"
			/>
		</div>
		<div class="controller__play-pause">
			<v-btn x-large icon @click="toggle">
				<v-icon color="black">mdi-{{ timelinePlaying ? 'pause' : 'play' }}</v-icon>
			</v-btn>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ChartWrapper from '@/components/charts/ChartWrapper'

export default {
	name: 'timeline-controller',
	components: { ChartWrapper },
	data() {
		return {
			localIndex: 0,
			trackerStyle: '',
			showDate: false,
			chartOptions: {
				scales: {
					xAxes: [
						{
							display: false,
						},
					],
					yAxes: [
						{
							display: false,
						},
					],
				},
				legend: {
					display: false,
				},
			},
		}
	},
	computed: {
		...mapGetters('timeline', [
			'timelinePlaying',
			'timelineIndex',
			'timelineSlider',
			'timelineDates',
			'timelineLength',
			'timelineMax',
			'timelineType',
		]),
		sliderValue: {
			get() {
				return this.timelineSlider
			},
			set(value) {
				this.set(Number.parseInt(value))
			},
		},
		data() {
			return this.$store.getters['data/get']
		},
	},
	methods: {
		...mapActions('timeline', ['toggle', 'set', 'pause']),
	},
	watch: {
		sliderValue(value) {
			this.trackerStyle = `left: calc(${Math.round(
				(Number.parseInt(value) / this.timelineMax) * 100
			)}% - 32px)`
		},
	},
}
</script>

<style lang="scss">
.controller {
	display: flex;
	align-items: center;
	width: 100%;
	height: 100%;

	&__timeline {
		flex: 0 1 100%;
		height: 100%;
		display: flex;
		align-items: center;
		position: relative;
		z-index: 999;
		border-right: solid thin $border-color;

		&:hover .controller__tracker {
			opacity: 1;
		}

		input[type='range'] {
			-webkit-appearance: none; /* Hides the slider so that custom slider can be made */
			width: 100%; /* Specific width is required for Firefox. */
			background: transparent; /* Otherwise white in Chrome */
			cursor: pointer;
		}
		input[type='range']::-webkit-slider-thumb {
			-webkit-appearance: none;
			border: 1px solid fade-out(black, 0.75);
			height: 75px;
			width: 1px;
			cursor: pointer;
			margin-top: 0px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
		}
		input[type='range']:focus {
			outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
		}
		input[type='range']::-webkit-slider-runnable-track {
			width: 100%;
			height: 100%;
		}
		input[type='range']:focus::-webkit-slider-thumb {
			border: 1px solid var(--v-primary-lighten2);
		}
		input[type='range']:focus::-webkit-slider-runnable-track {
			background: fade-out(black, 0.95);
		}
	}
	&__play-pause {
		flex: 0 0 auto;
		padding: 0 0.75rem;
	}
	&__tracker {
		background-color: fade-out(black, 0.1);
		color: white;
		position: absolute;
		font-size: 0.9rem;
		bottom: 5.5rem;
		min-width: 60px;
		text-align: center;
		opacity: 0;

		border-radius: 8px;
		padding: 0.25rem 0.5rem 0.1rem;
		transition: left 200ms ease, opacity 200ms;
	}
	.slider {
		z-index: 999;
	}
	&__dates {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		pointer-events: none;
		padding-right: 1rem;
	}
	&__date {
		display: none;
		flex: 0 0 auto;
		padding: 0.3rem 0.75rem 0.15rem;
		width: auto;
		font-size: 0.9rem;
		color: var(--v-secondary-base);
		background-color: darken(white, 10);
		border-radius: 0.75rem;
		font-weight: $bold;
		z-index: 999;

		&.under {
			opacity: 0.5;
		}
	}
	&__chart {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		pointer-events: none;
		// opacity: 0.75;
	}
}

.controller {
	.v-slider {
		transform: translateY(0.25rem);
		&__tick-label {
			display: none;
			transform: translateY(0.5rem);
		}
	}
}
@media screen and (min-width: 950px) {
	.controller__date {
		&:first-child,
		&:nth-child(7n) {
			display: block;
		}
	}
}
@media screen and (min-width: 480px) and (max-width: 950px) {
	.controller__date {
		&:first-child,
		&:nth-child(15n) {
			display: block;
		}
	}
}
@media screen and (max-width: 480px) {
	.controller__date {
		&:first-child,
		&:nth-child(30n) {
			display: block;
		}
	}
}
</style>

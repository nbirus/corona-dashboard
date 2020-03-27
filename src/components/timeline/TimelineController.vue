<template>
	<div class="controller">
		<div class="controller__timeline">
			<!-- date tracker -->
			<div class="controller__tracker" :style="trackerStyle">
				<span>{{ timelineDates[timelineIndex + 1] | date('MMM D') }}</span>
			</div>
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
			<v-btn large icon @click="toggle">
				<v-icon>mdi-{{ timelinePlaying ? 'pause' : 'play' }}</v-icon>
			</v-btn>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'timeline-controller',
	data() {
		return {
			localIndex: 0,
			trackerStyle: '',
			showDate: false,
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
		]),
		sliderValue: {
			get() {
				return this.timelineSlider
			},
			set(value) {
				this.set(Number.parseInt(value))
			},
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

		&:hover .controller__tracker {
			opacity: 1;
		}

		input[type='range'] {
			-webkit-appearance: none; /* Hides the slider so that custom slider can be made */
			width: 100%; /* Specific width is required for Firefox. */
			background: transparent; /* Otherwise white in Chrome */
		}
		input[type='range']::-webkit-slider-thumb {
			-webkit-appearance: none;
			border: 1px solid var(--v-secondary-lighten3);
			height: 65px;
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
		input[type='range']:focus::-webkit-slider-runnable-track {
			background: fade-out(black, 0.95);
		}
	}
	&__play-pause {
		flex: 0 0 auto;
		margin: 0 1rem;
	}
	&__tracker {
		background-color: fade-out(black, 0.1);
		color: white;
		position: absolute;
		font-size: 0.9rem;
		bottom: 4.75rem;
		min-width: 60px;
		text-align: center;
		opacity: 0;

		border-radius: 8px;
		padding: 0.25rem 0.5rem 0.1rem;
		z-index: 9999;
		transition: left 200ms ease, opacity 200ms;
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
@media screen and (min-width: 1401px) {
	.controller {
		.v-slider__tick {
			&:first-child,
			&:nth-child(5n) {
				.v-slider__tick-label {
					display: block;
				}
			}
		}
	}
}
@media screen and (min-width: 950px) and (max-width: 1400px) {
	.controller {
		.v-slider__tick {
			&:first-child,
			&:nth-child(8n) {
				.v-slider__tick-label {
					display: block;
				}
			}
		}
	}
}
@media screen and (min-width: 480px) and (max-width: 950px) {
	.controller {
		.v-slider__tick {
			&:first-child,
			&:nth-child(15n) {
				.v-slider__tick-label {
					display: block;
				}
			}
		}
	}
}
@media screen and (max-width: 480px) {
	.controller {
		.v-slider__tick {
			&:first-child,
			&:nth-child(30n) {
				.v-slider__tick-label {
					display: block;
				}
			}
		}
	}
}
</style>

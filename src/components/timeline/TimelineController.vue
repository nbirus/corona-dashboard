<template>
	<div class="controller" v-resize="onResize" :class="type">
		<div class="controller__timeline">
			<!-- date tracker -->
			<div class="controller__tracker" :style="trackerStyle">
				<span>{{ $h.get(data, `timeline.dates.${index}`) | date('MMM D') }}</span>
			</div>
			<chart-wrapper
				v-if="$h.exists(data.timeline)"
				:key="type"
				class="controller__chart"
				:id="`timeline-chart-${type}`"
				type="line"
				ignore-loading
				:formatter="`line${type}map`"
				:data="{ data: $h.get(data, `timeline.${type}`), dates: $h.get(data, 'timeline.dates') }"
				:extra-options="chartOptions"
			/>
			<ul class="controller__dates">
				<li
					class="controller__date"
					v-for="(date, i) in $h.get(data, 'timeline.dates')"
					:key="date"
					:class="i < index || 'under'"
				>
					<span v-html="date"></span>
				</li>
			</ul>

			<div
				tabindex="0"
				class="controller__slider"
				ref="slider"
				@click="setPos"
				@mousedown="mouseDown"
				@mouseup="mouseUp"
				@mouseleave="mouseUp"
			>
				<div ref="handle" :style="sliderStyle" class="controller__slider-handle"></div>
			</div>
		</div>
		<div class="controller__play-pause" :class="{ hover }">
			<div class="controller__play-pause-controller">
				<v-btn class="mr-2" icon color="white" @click="restart">
					<v-icon color="white">mdi-rewind</v-icon>
				</v-btn>
				<v-btn large icon @click="toggle" color="white">
					<v-icon color="white">mdi-{{ state.playing ? 'pause' : 'play' }}</v-icon>
				</v-btn>
				<v-btn class="ml-2" icon @click="incSpeed" color="white">
					<strong>{{ speed }}x</strong>
				</v-btn>
			</div>
		</div>
	</div>
</template>

<script>
import ChartWrapper from '@/components/charts/ChartWrapper'

let otherTimeout = null

export default {
	name: 'timeline-controller',
	components: { ChartWrapper },
	props: ['type', 'loading', 'hover'],
	data() {
		return {
			state: {
				sliding: false,
				playing: false,
			},
			width: undefined,
			speed: 1,
			max: 0,
			interval: null,
			timeout: null,
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
		data() {
			return this.$store.getters['data/get']
		},
		length() {
			return this.$h.get(this.data, 'timeline.dates', []).length - 1
		},
		sliderStyle() {
			return {
				width: `${this.width}px`,
				maxWidth: `${this.max}px`,
			}
		},
		trackerStyle() {
			return {
				left: `${this.width - 30}px`,
			}
		},
		index() {
			let ratio = this.width / this.max
			return Math.round(this.length * ratio)
		},
	},
	mounted() {
		document.addEventListener('mousemove', this.mouseMove)
	},
	methods: {
		// actions
		toggle() {
			if (this.state.playing) {
				this.pause()
			} else {
				this.play()
			}
		},
		play() {
			this.clear()
			this.state.playing = true
			this.interval = setInterval(this.onInterval, 16 / this.speed)
		},
		pause() {
			this.clear()
			this.state.playing = false
		},
		restart() {
			this.pause()
			this.width = 0
		},
		onInterval() {
			if (this.width >= this.max) {
				this.width = 0
			} else {
				this.width += 1
			}
		},
		clear() {
			clearInterval(this.interval)
			this.interval = null
			clearTimeout(this.timeout)
			this.timeout = null
		},
		incSpeed() {
			if (this.speed < 3) {
				this.speed++
			} else {
				this.speed = 1
			}
			this.play()
		},

		// events
		mouseMove(e) {
			if (this.state.sliding) {
				this.setPos(e)
			}
		},
		setPos(e) {
			let mousePos = e.pageX
			let sliderEl = this.$refs.slider
			if (sliderEl) {
				let sliderElBox = sliderEl.getBoundingClientRect()
				this.width = mousePos - sliderElBox.left
			}
			this.pause()
		},
		mouseDown() {
			this.state.sliding = true
		},
		mouseUp() {
			this.state.sliding = false
			this.updateIndex()
		},
		onResize() {
			this.max = this.$refs.slider.offsetWidth
			if (this.width === undefined) {
				this.width = this.max
			}
		},
		updateIndex() {
			this.$store.dispatch('timeline/set', this.index)
		},
	},
	watch: {
		index() {
			if (!this.state.sliding) {
				this.updateIndex()
			} else {
				if (otherTimeout) {
					clearTimeout(otherTimeout)
					otherTimeout = null
				}
				otherTimeout = setTimeout(() => {
					if (this.state.sliding) {
						this.updateIndex()
					}
				}, 100)
			}
		},
	},
	beforeDestroy() {
		this.clear()
		document.removeEventListener('mousemove', this.mouseMove, true)
	},
}
</script>

<style lang="scss">
.controller {
	display: flex;
	align-items: center;
	width: 100%;
	height: 100%;

	&__slider {
		z-index: 999;
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		cursor: col-resize;

		&:focus {
			outline: none;

			.controller__slider-handle:after {
				opacity: 1 !important;
				z-index: 999999;
			}
			.controller__slider-handle {
				opacity: 0.75 !important;
			}
		}
	}
	&__slider-handle {
		width: 0px;
		height: 100%;
		position: relative;
		opacity: 0.25;

		&:after {
			content: '';
			position: absolute;
			right: 0;
			top: 0;
			bottom: 0;
			width: 3px;
			opacity: 0;
			transition: opacity 0.2s ease;
		}
	}
	&__timeline {
		flex: 0 1 100%;
		height: 100%;
		display: flex;
		align-items: center;
		position: relative;
		z-index: 999;
		// border-right: solid thin $border-color;

		&:hover .controller__tracker {
			opacity: 1;
		}
		&:hover .controller__date {
			opacity: 1;
		}
	}
	&__play-pause {
		position: absolute;
		bottom: 75px;
		top: 0;
		width: calc(100% - 300px);
		display: flex;
		justify-content: center;
		align-items: flex-end;
		padding-bottom: 1.5rem;
		pointer-events: none;

		&.hover .controller__play-pause-controller {
			opacity: 1;
		}
	}
	&__play-pause-controller {
		background-color: fade-out(black, 0.15);
		width: auto;
		border-radius: 0.75rem;
		padding: 0.25rem 1rem;
		z-index: 99999;
		pointer-events: auto;
		opacity: 0;
		transition: opacity 0.2s ease;

		&:hover {
			opacity: 1;
		}
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
		user-select: none;
		transition: opacity 200ms;
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
		user-select: none;
		display: none;
		flex: 0 0 auto;
		padding: 0.2rem 0.35rem 0.05rem;
		width: auto;
		font-size: 0.8rem;
		color: white;
		border-radius: 0.25rem;
		font-weight: $thin;
		z-index: 9999;
		transition: opacity 0.2s ease, box-shadow 0.3s ease;

		&.under {
			opacity: 0.5;
			box-shadow: none !important;
		}
	}
	&__chart {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		pointer-events: none;
	}

	&.cases {
		.controller__slider-handle::after {
			background-color: darken(#1976d2, 10);
		}
		.controller__date {
			background-color: darken(#1976d2, 5);
			// background-color: transparent;
			// box-shadow: 0 0 0 2px fade-out(#1976d2, 0.5);

			border: solid thin darken(#1976d2, 5);
			color: darken(#1976d2, 5);
			color: white;

			&.under {
				color: darken(#1976d2, 5);
				border: solid thin lighten(#1976d2, 15);
				background-color: white;
			}
		}
		.controller__slider-handle {
			background-color: fade-out(#1976d2, 0.45);
		}
	}
	&.deaths {
		.controller__slider-handle::after {
			background-color: darken(#ff5252, 10);
		}
		.controller__date {
			background-color: darken(#ff5252, 10);
			box-shadow: 0 0 0 2px darken(#ff5252, 19);
		}
		.controller__slider-handle {
			background-color: fade-out(#ff5252, 0.5);
		}
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
		&:nth-child(15n) {
			display: block;
		}
		&:nth-child(7n) {
			span {
				display: none !important;
			}
			display: block;
			height: 4px;
			width: 4px;
			overflow: hidden;
			padding: 0;
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

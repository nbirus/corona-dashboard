<template>
	<div class="controller" v-resize="onResize" :class="type">
		<div class="controller__timeline">
			<!-- date tracker -->
			<div class="controller__tracker" :style="trackerStyle">
				<span>{{ $h.get(data, `timeline.dates.${index}`) | date('MMM D') }}</span>
			</div>
			<chart-wrapper
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
					v-html="date"
					:class="i < index || 'under'"
				></li>
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
		<div class="controller__play-pause">
			<v-btn x-large icon @click="toggle">
				<v-icon color="black">mdi-{{ state.playing ? 'pause' : 'play' }}</v-icon>
			</v-btn>
		</div>
	</div>
</template>

<script>
import ChartWrapper from '@/components/charts/ChartWrapper'

export default {
	name: 'timeline-controller',
	components: { ChartWrapper },
	props: ['type'],
	data() {
		return {
			state: {
				sliding: false,
				playing: false,
			},
			width: undefined,
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
			this.interval = setInterval(this.onInterval, 16)
		},
		pause() {
			this.clear()
			this.state.playing = false
		},
		restart() {
			// this.timeout = setTimeout(() => {
			// 	if (this.state.playing) {
			// 		this.width = 0
			// 	}
			// }, 2000)
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

		// events
		mouseMove(e) {
			if (this.state.sliding) {
				this.setPos(e)
			}
		},
		setPos(e) {
			let mousePos = e.pageX
			let sliderEl = this.$refs.slider
			let sliderElBox = sliderEl.getBoundingClientRect()
			this.width = mousePos - sliderElBox.left
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
		}
	}
	&__slider-handle {
		width: 0px;
		height: 100%;
	}
	&__timeline {
		flex: 0 1 100%;
		height: 100%;
		display: flex;
		align-items: center;
		position: relative;
		z-index: 999;
		border-right: solid thin $border-color-light;

		&:hover .controller__tracker {
			opacity: 1;
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
		display: none;
		flex: 0 0 auto;
		padding: 0.3rem 0.75rem 0.15rem;
		width: auto;
		font-size: 0.8rem;
		color: white;
		background-color: fade-out(black, 0.75);
		border-radius: 25px;
		font-weight: $thin;
		z-index: 9999;

		&.under {
			color: white;
			background-color: fade-out(black, 0.75);
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
		.controller__slider-handle {
			background-color: fade-out(#1976d2, 0.25);
		}
	}
	&.deaths {
		.controller__slider-handle {
			background-color: fade-out(#ff5252, 0.25);
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
		&:nth-child(12n) {
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

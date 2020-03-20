<template>
	<div class="chart-body">
		<!-- actions -->
		<!-- <div class="chart-body__actions" v-if="!state$.expand">
			<v-tooltip top>
				<template v-slot:activator="{ on }">
					<v-btn icon @click="$store.dispatch('presentor/toggleExpand')" v-on="on">
						<v-icon size="20">fa-expand</v-icon>
					</v-btn>
				</template>
				<span>Fullscreen</span>
			</v-tooltip>
		</div> -->

		<!-- chart -->
		<div class="chart-body__chart" :class="state$">
			<div class="chart-body__chart-container" ref="container" :class="state$">
				<chart-wrapper
					ref="chart"
					:id="id"
					:type="type"
					v-bind="{ ...chartAttrs, ...chartSettings }"
					@change="updateChartState"
				/>
			</div>
		</div>

		<!-- resize helper -->
		<v-layout class="chart-body__reisze-helper" align-center v-if="state$.screenshot">
			<v-icon size="18" color="white" left>fa-info-circle</v-icon>
			<span class="body-1 white--text">Click and drag to resize chart</span>
		</v-layout>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import ChartWrapper from '@/components/charts/ChartWrapper'
import { camelCaseKeys } from '@/services/UtilsService'

export default {
	name: 'chart-presentor-body',
	components: { ChartWrapper },
	props: ['attrs', 'type', 'id', 'title'],
	data() {
		return {
			resizeSettings: {},
			key: 0,
			top: undefined,
			left: undefined,
		}
	},
	computed: {
		...mapGetters('presentor', ['state$', 'resizeKey$', 'chartSettings']),
		width$() {
			return this.$store.getters.width$
		},
		chartAttrs() {
			return camelCaseKeys(this.attrs)
		},
		chartStyle() {
			return this.top ? `top: ${this.top}px;` : ''
		},
	},
	methods: {
		resize() {
			if (this.$refs.chart) {
				this.$nextTick(this.$refs.chart.resize)
			}
		},
		setResizeBox() {
			let containerEl = this.$refs.container
			let containerRect = containerEl.getBoundingClientRect()
			this.left = containerRect.left + 32
			this.top = containerRect.top + 32
			this.resizeSettings = {
				x: containerRect.left + 32,
				y: containerRect.top + 32,
				w: containerRect.width - 64,
				h: containerRect.height - 64,
				maxWidth: containerRect.width - 16,
				maxHeight: containerRect.height - 16,
				minWidth: 350,
				minHeight: 350,
			}
		},
		resizeStop() {
			let containerEl = this.$refs.container
			let containerRect = containerEl.getBoundingClientRect()
			let chartEl = document.getElementById(`${this.id}-chart`)
			let chartRect = chartEl.getBoundingClientRect()

			let middleWidth = this.width$ / 2
			let middelElWidth = chartRect.width / 2
			let middleHeight = containerRect.height / 2
			let middelElHeight = chartRect.height / 2

			this.left = middleWidth - middelElWidth
			this.top = middleHeight - middelElHeight + 70
		},
		// commit state to store and bubble change event
		updateChartState(chartState) {
			this.$store.dispatch('presentor/setChartState', chartState)
			this.$emit('change', chartState)
		},
	},
	watch: {
		width$: 'resize',
		'state$.expand': 'resize',
		'state$.screenshot'(screenshot) {
			this.setResizeBox()
			this.resize()
			if (!screenshot) {
				this.resizeSettings = {}
			}
		},
		resizeKey$() {
			this.resizeSettings = {}
			this.$nextTick(() => {
				this.setResizeBox()
				this.resize()
			})
		},
	},
}
</script>

<style lang="scss">
.chart-body {
	height: 100%;
	width: 100%;
	position: relative;

	&__actions {
		position: absolute;
		top: -3rem;
		right: 0.35rem;
		z-index: 12;
		pointer-events: auto;
	}
	&__chart {
		height: 100%;
		width: 100%;
		background-color: transparent;
		transition: background-color 0.5s ease;
		// padding-top: 1.5rem;

		&.expand {
			position: fixed;
			z-index: 9;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			padding: 70px 0 0;
			background-color: white;
		}
	}
	&__chart-container {
		height: 100%;
		width: 100%;
		z-index: 10;
		transition: all 0.35s;
		display: flex;
		align-items: center;
		justify-content: center;

		& > div {
			width: 100%;
		}
	}
	&__reisze-helper {
		position: fixed;
		margin: 0 auto;
		background-color: fade-out(#202020, 0.05);
		box-shadow: 0 4px 8px fade-out(black, 0.75);
		border-radius: 45px;
		padding: 0.75rem 1.5rem 0.75rem 1.25rem;
		z-index: 12;
		bottom: 2rem;
		left: calc(50% - 151px);
		animation: resize 6s;
		opacity: 0;

		.message {
			color: white;
		}
	}
}
.dragging {
	position: absolute;
	left: 50% !important;
	transform: translateX(-50%);
}
.not-dragging {
	position: relative !important;
	width: 100% !important;
	height: 100% !important;
	top: unset !important;
	left: unset !important;
	right: unset !important;
	bottom: unset !important;
}
.resizable.resizable {
	border: dashed thin color(grey-base) !important;
}
.resizable.resizing {
	border: dashed thin color(primary-darken2) !important;
	background-color: color(primary-lighten4);
}

@keyframes resize {
	0% {
		opacity: 1;
		transform: translateY(30px);
	}
	10% {
		opacity: 0.9;
		transform: translateY(0px);
	}
	90% {
		opacity: 0.9;
		transform: translateY(0px);
	}
	0% {
		transform: translateY(30px);
		opacity: 0;
	}
}
</style>

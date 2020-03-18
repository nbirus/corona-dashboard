<template>
	<v-chart
		ref="chart"
		v-if="$data.$ready"
		:id="`${id}-chart`"
		:key="$data.$updateKey"
		:options="options"
		:autoresize="false"
		@click="$chartClick"
	/>
</template>

<script>
import ChartMixin from '@/mixins/ChartMixin'
import 'echarts/lib/chart/bar'

export default {
	name: 'bar-chart',
	inheritAttrs: false,
	mixins: [ChartMixin],
	components: {
		'v-chart': () => import('vue-echarts'),
	},
	props: {
		xAxisLabel: String,
		yAxisLabel: String,
		hideAxisLines: Boolean,
		hideIntervalLines: Boolean,
		hideIntervalTicks: Boolean,
		hideBarShadows: Boolean,
		interval: Number,
		log: Boolean,
		sortData: Boolean,
	},
	computed: {
		// get chart data
		chartData() {
			if (this.sortData) {
				return this.$h.cloneDeep(this.data).sort(this.$sortData)
			} else {
				return this.data
			}
		},
		// side properties
		series() {
			let series = []
			let data = this.chartData.map(this.dataFormatter)
			if (!this.hideBarShadows) {
				series.push(this.getBarShadows(data))
			}
			series.push({ type: 'bar', data })
			return series
		},
		xAxis() {
			return {
				data: this.chartData.map(this.labelFormatter),
				name: this.xAxisLabel,
				nameLocation: 'center',
				nameGap: '32',
				nameTextStyle: {
					fontWeight: 'bold',
				},
				axisLine: {
					show: !this.hideAxisLines,
				},
				axisTick: {
					show: !this.hideIntervalTicks,
				},
				axisLabel: {
					formatter: this.$labelNameFormatter,
				},
			}
		},
		yAxis() {
			return {
				name: this.yAxisLabel,
				nameLocation: 'center',
				nameGap: '45',
				nameTextStyle: {
					fontWeight: 'bold',
				},
				type: this.log ? 'log' : 'value',
				max: this.$getMaxLength(this.$h.get(this.series, '0.data', [])),
				interval: this.interval || undefined,
				axisLine: {
					show: !this.hideAxisLines,
				},
				axisTick: {
					show: !this.hideIntervalTicks,
				},
				splitLine: {
					show: !this.hideIntervalLines,
				},
				axisLabel: {
					formatter: this.$valueNameFormatter,
				},
			}
		},
		grid() {
			let top = this.title ? (this.subTitle ? 72 : 50) : 48
			let right = this.dataZoomY ? 70 : 16
			let bottom = this.xAxisLabel ? 60 : 32
			let left = this.yAxisLabel ? 70 : 32

			// adjust for data zoom
			if (this.dataZoomX) {
				bottom = this.xAxisLabel ? 90 : 70
			}

			return { top, right, bottom, left }
		},

		// main chart options
		options() {
			let options = {
				xAxis: this.xAxis,
				yAxis: this.yAxis,
				series: this.series,
				title: this.$title,
				textStyle: this.$textStyle,
				grid: this.grid,
				legend: this.$legend,
				animationDuration: 2000,
			}

			if (this.tooltip) {
				options.tooltip = this.$tooltip
			}
			if (this.dataZoomX || this.dataZoomY) {
				options.dataZoom = this.$dataZoom
			}

			return options
		},
	},
	methods: {
		dataFormatter(item, index) {
			return {
				value: item.data,
				meta: item.meta,
				itemStyle: {
					color: this.$chartColors[index],
					barBorderRadius: [5, 5, 0, 0],
				},
				emphasis: {
					itemStyle: {
						shadowColor: 'rgba(0, 0, 0, 0.25)',
						shadowBlur: 4,
						shadowOffsetX: 2,
						shadowOffsetY: 2,
					},
				},
			}
		},
		labelFormatter(item) {
			return item.name
		},
		getBarShadows(data) {
			const max = this.$getMaxLength(data)
			return {
				type: 'bar',
				data: data.map(item => ({ value: max, shadow: true, item })),
				itemStyle: {
					normal: { color: 'rgba(0,0,0,0.04)' },
				},
				barBorderRadius: [15, 15, 0, 0],
				barGap: '-100%',
				barCategoryGap: '40%',
				animation: false,
				tooltip: {
					show: false,
					formatter: '',
				},
			}
		},
	},
}
</script>

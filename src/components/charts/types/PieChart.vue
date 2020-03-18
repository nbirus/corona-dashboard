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
import 'echarts/lib/chart/pie'

export default {
	name: 'pie-chart',
	inheritAttrs: false,
	mixins: [ChartMixin],
	components: {
		'v-chart': () => import('vue-echarts'),
	},
	props: {
		scale: {
			type: Number,
			default: 65,
		},
		donut: Boolean,
		rose: Boolean,
		hideLabels: Boolean,
		sortData: Boolean,
		labelPosition: String,
		labelSize: [String, Number],
	},
	computed: {
		chartData() {
			if (this.sortData) {
				return this.$h.cloneDeep(this.data).sort(this.$sortData)
			} else {
				return this.data
			}
		},
		// side properties
		series() {
			return [
				{
					type: 'pie',
					radius: this.radius,
					label: this.label,
					roseType: this.rose ? 'radius' : undefined,
					center: this.center,
					data: this.chartData.map(this.dataFormatter),
				},
			]
		},
		center() {
			let x = 50
			let y = 50

			if (this.legend) {
				y += 3
			}
			if (this.title) {
				y += 3
			}
			if (this.subTitle) {
				y += 3
			}

			return [`${x}%`, `${y}%`]
		},
		radius() {
			let scaleFactor = this.scale / 100
			let inner = this.donut ? 80 : 0
			let outter = 100
			return [`${inner * scaleFactor}%`, `${outter * scaleFactor}%`]
		},
		label() {
			return {
				show: !this.hideLabels,
				formatter: label => {
					return this.$labelNameFormatter(this.$h.get(label, 'data.name'))
				},
				position: this.labelPosition,
				fontSize: this.labelSize,
				color: this.labelPosition === 'outside' ? 'black' : 'white',
				textBorderColor: this.labelPosition === 'outside' ? 'transparent' : 'rgba(0,0,0,0.5)',
				textBorderWidth: 2,
			}
		},

		// main options
		options() {
			return {
				series: this.series,
				title: this.$title,
				tooltip: this.$tooltip,
				legend: this.$legend,
				textStyle: this.$textStyle,
			}
		},
	},
	methods: {
		dataFormatter(item, index) {
			return {
				value: item.data,
				name: item.name,
				meta: item.meta,
				itemStyle: {
					color: this.$chartColors[index],
				},
			}
		},
	},
}
</script>

import { getColors, defaults } from '@/services/ChartService'
import { abbreviate, localeString } from '@/services/FilterService'
import debounce from 'lodash/debounce'

// title
// const titleResource = () => import('echarts/lib/component/title')
const titleProps = {
	title: {
		type: String,
	},
	titleSize: {
		type: [Number, String],
		default: 20,
	},
	titleLineHeight: {
		type: [Number, String],
	},
	titleFontWeight: {
		type: String,
	},
	titleFontStyle: {
		type: String,
	},
	subTitle: {
		type: String,
	},
	subTitleSize: {
		type: [Number, String],
		default: 16,
	},
	titleSpacing: {
		type: Number,
	},
}

// legend
const legendResource = () => import('echarts/lib/component/legend')
const chartTypesWithLegends = ['pie']
const legendProps = {
	legend: {
		type: Boolean,
	},
}

// dataZoom
const dataZoomResource = () => import('echarts/lib/component/dataZoom')
const chartTypesWithDataZoom = ['bar']
const dataZoomProps = {
	dataZoomX: {
		type: Boolean,
	},
	dataZoomY: {
		type: Boolean,
	},
}

// tooltip
const tooltipResource = () => import('echarts/lib/component/tooltip')
const tooltipProps = {
	tooltip: {
		type: Boolean,
	},
}

// visualMap
const visualMapResource = () => import('echarts/lib/component/visualMap')
const chartTypesWithVisualMap = ['']
const visualMapProps = {
	visualMap: {
		type: Boolean,
	},
}

export default {
	async created() {
		// code split optional resources
		// if (this.title) {
		// 	await titleResource()
		// }
		if (this.tooltip) {
			await tooltipResource()
		}
		if (this.visualMap && chartTypesWithVisualMap.includes(this.type)) {
			await visualMapResource()
		}
		if (this.legend && chartTypesWithLegends.includes(this.type)) {
			await legendResource()
		}
		if ((this.dataZoomX || this.dataZoomY) && chartTypesWithDataZoom.includes(this.type)) {
			await dataZoomResource()
		}
		this.$data.$ready = true
		this.dResize = debounce(this._resize, 50)
	},
	props: {
		id: String,
		type: String,
		data: {
			type: [Object, Array],
			required: true,
		},
		color: {
			type: String,
			required: true,
		},
		abbreviateLabels: {
			type: Number,
			default: 30,
		},
		...titleProps,
		...legendProps,
		...tooltipProps,
		...dataZoomProps,
		...visualMapProps,
	},
	data() {
		return {
			$ready: false,
			$updateKey: 0,
			dResize: undefined,
		}
	},
	computed: {
		// shared options
		$textStyle() {
			return {
				fontFamily: 'Noto Sans',
			}
		},
		$title() {
			if (!this.title) {
				return {}
			}
			return {
				text: this.title,
				subtext: this.subTitle,
				textStyle: {
					...defaults.textStyle('title'),
					fontSize: this.titleSize,
					lineHeight: this.titleLineHeight,
					fontWeight: this.titleFontWeight,
					fontStyle: this.titleFontStyle,
				},
				subtextStyle: {
					...defaults.textStyle('subtitle'),
					fontSize: this.subTitleSize,
				},
				left: 'center',
				padding: [16, 10, 5, 10],
			}
		},
		$legend() {
			if (!this.legend || !chartTypesWithLegends.includes(this.type)) {
				return []
			}
			return {
				top: this.title ? (this.subTitle ? 64 : 42) : 16,
				data: this.data.map(v => v.name),
			}
		},
		$dataZoom() {
			if ((!this.dataZoomX && !this.dataZoomY) || !chartTypesWithDataZoom.includes(this.type)) {
				return {}
			}
			let dataZoom = []
			if (this.dataZoomX) {
				dataZoom.push({
					type: 'slider',
					show: true,
					start: 0,
					end: 100,
					bottom: '2rem',
					orient: 'horizontal',
				})
			}
			if (this.dataZoomY) {
				dataZoom.push({
					type: 'slider',
					show: true,
					start: 0,
					end: 100,
					right: '16px',
					orient: 'vertical',
				})
			}
			return dataZoom
		},
		$tooltip() {
			if (!this.tooltip) {
				return {}
			}
			return {
				trigger: {
					grid: 'axis',
					pie: 'item',
				}[this.type],
			}
		},
		$visualMap() {
			if (!this.visualMap) {
				return {}
			}
			return {
				orient: 'horizontal',
				top: '16px',
				right: '16px',
				min: 0,
				max: Math.max(...this.chartData.map(m => m.data)),
				text: ['High', 'Low'],
				// Map the score column to color
				dimension: 1,
				inRange: {
					color: ['#D7DA8B', '#E15457'],
				},
			}
		},

		// helpers
		$chartColors() {
			return getColors(this.color, this.data.length)
		},
	},
	methods: {
		$chartClick(e) {
			const data = e.data
			if (data.shadow) {
				this.$emit('click', data.item)
			} else {
				this.$emit('click', data)
			}
		},
		$labelNameFormatter(label) {
			return abbreviate(label, this.abbreviateLabels)
		},
		$valueNameFormatter(value) {
			return localeString(value)
		},
		$getMaxLength(data) {
			return Math.max(...data.map(m => m.value))
		},
		$sortData(a, b) {
			return a.data - b.data
		},
		$resize() {
			this.dResize()
		},
		_resize() {
			if (this.$refs.chart) {
				this.$refs.chart.resize()
			}
		},
	},
	watch: {
		abbreviateLabels() {
			this.$data.$updateKey++
		},
	},
}

<script>
import { Line } from 'vue-chartjs'
import { localeString } from '@/services/FilterService.js'
var SI_SYMBOL = ['', 'k', 'M', 'G', 'T', 'P', 'E']

function abbreviateNumber(number) {
	// what tier? (determines SI symbol)
	var tier = (Math.log10(number) / 3) | 0

	// if zero, we don't need a suffix
	if (tier == 0) return number

	// get suffix and determine scale
	var suffix = SI_SYMBOL[tier]
	var scale = Math.pow(10, tier * 3)

	// scale the number
	var scaled = number / scale

	// format number and add suffix
	return scaled.toFixed(0) + ' ' + suffix
}
export default {
	extends: Line,
	props: {
		data: [Array, Object],
		logarithmic: Boolean,
		extraOptions: {
			type: Object,
			default: () => ({}),
		},
	},
	data() {
		return {
			options: {
				type: 'line',
				tooltips: {
					mode: 'index',
				},
				scales: {
					xAxes: [
						{
							gridLines: {
								display: false,
							},
							ticks: {
								fontSize: 14,
							},
						},
					],
					yAxes: [
						{
							type: this.logarithmic ? 'logarithmic' : 'linear',
							gridLines: {
								drawBorder: false,
								offsetGridLines: true,
								drawTicks: false,
							},
							ticks: {
								fontSize: 14,
								callback: value => {
									if (value !== 0) {
										return abbreviateNumber(value)
									}
								},
							},
							afterBuildTicks: chartObj => {
								if (this.logarithmic) {
									const ticks = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000]
									chartObj.ticks.splice(0, chartObj.ticks.length)
									chartObj.ticks.push(...ticks)
								}
							},
						},
					],
				},
				legend: {
					position: 'top',
					reverse: true,
					labels: {
						padding: 16,
						fontSize: 14,
					},
				},
				responsive: true,
				maintainAspectRatio: false,
				...this.extraOptions,
			},
		}
	},
	watch: {
		data: {
			handler(data) {
				this.$nextTick(() => {
					this.renderChart(data, this.options)
				})
			},
			deep: true,
			immediate: true,
		},
	},
}
</script>

<style></style>

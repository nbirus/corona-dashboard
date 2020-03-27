<script>
import { Line } from 'vue-chartjs'
import { localeString } from '@/services/FilterService.js'

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
				scales: {
					xAxes: [
						{
							gridLines: {
								display: false,
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
								callback: function(value) {
									if (value !== 0) {
										return localeString(value)
									}
								},
							},
						},
					],
				},
				legend: {
					position: 'top',
					reverse: true,
					labels: {
						padding: 26,
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

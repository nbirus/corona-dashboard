<script>
import { HorizontalBar } from 'vue-chartjs'

export default {
	extends: HorizontalBar,
	props: {
		data: [Array, Object],
		extraOptions: {
			type: Object,
			default: () => ({}),
		},
	},
	data() {
		return {
			options: {
				scales: {
					yAxes: [
						{
							gridLines: {
								display: false,
							},
						},
					],
					xAxes: [
						{
							gridLines: {
								drawBorder: false,
								offsetGridLines: true,
								drawTicks: false,
								zeroLineColor: 'rgba(0,0,0,0)',
							},
							ticks: {
								fontSize: 14,
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

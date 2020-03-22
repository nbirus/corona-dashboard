<script>
import { Line } from 'vue-chartjs'

export default {
	extends: Line,
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
					xAxes: [
						{
							gridLines: {
								display: false,
							},
						},
					],
					yAxes: [
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

<style></style>

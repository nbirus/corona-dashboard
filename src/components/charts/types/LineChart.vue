<script>
import { Line } from 'vue-chartjs'

export default {
	extends: Line,
	props: {
		data: [Array, Object],
	},
	data() {
		return {
			options: {
				legend: {
					position: 'bottom',
					reverse: true,
					labels: {
						padding: 22,
						fontSize: 14,
					},
				},
				responsive: true,
				maintainAspectRatio: false,
			},
		}
	},
	watch: {
		data: {
			handler(data) {
				// console.log('watcher', data)
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

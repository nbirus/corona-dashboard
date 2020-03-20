<script>
import { formatChartData } from '@/services/ChartService.js'

export default {
	name: 'chart-formatter',
	inheritAttrs: false,
	props: {
		data: [Object, Array],
		type: String,
	},
	data() {
		return {
			chartData: undefined,
			loading: true,
			error: undefined,
		}
	},
	mounted() {
		if (this.$h.exists(this.data)) {
			this.formatData(this.data)
		}
	},
	methods: {
		async formatData(data) {
			if (this.$h.exists(data)) {
				this.reset()
				try {
					this.chartData = await formatChartData(data, this.type)
				} catch (e) {
					this.error = e
				} finally {
					this.loading = false
				}
			} else {
				this.loading = false
			}
		},
		reset() {
			this.chartData = undefined
			this.loading = true
			this.error = undefined
		},
	},
	watch: {
		data: {
			handler: 'formatData',
			deep: true,
			immediate: false,
		},
	},
	render() {
		if (this.$scopedSlots.default !== undefined) {
			return this.$scopedSlots.default({
				_chartState: {
					data: this.chartData,
					loading: this.loading,
					error: this.error,
				},
			})
		} else {
			return this.$slots
		}
	},
}
</script>

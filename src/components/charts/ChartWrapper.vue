<template>
	<data-wrapper v-bind="$attrs" v-slot="{ _state, _refresh }">
		<chart-formatter v-slot="{ _chartState }" v-bind="_state" :type="formatter || type">
			<state-handler
				:data="_chartState.data"
				:loading="_state.loading"
				:error="$h.exists(_state.error) ? _state.error : _chartState.error"
				:refresh="_refresh"
				@change="$emit('change', _state)"
			>
				<!-- error -->
				<slot v-if="$slots.error" name="error" slot="error" :error="_state.error" />

				<!-- loading -->
				<slot v-if="$slots.loading" name="loading" slot="loading" />

				<!-- response -->
				<component
					:is="`${type}-chart`"
					ref="chart"
					:type="type"
					:data="_chartState.data"
					v-bind="$attrs"
				/>
			</state-handler>
		</chart-formatter>
	</data-wrapper>
</template>

<script>
import ChartFormatter from './ChartFormatter'

export default {
	name: 'chart-wrapper',
	inheritAttrs: false,
	components: {
		ChartFormatter,
		BarChart: () => import('@/components/charts/types/BarChart'),
		PieChart: () => import('@/components/charts/types/PieChart'),
	},
	props: {
		type: {
			type: String,
			required: true,
		},
		formatter: {
			type: String,
		},
	},
	methods: {
		resize() {
			if (this.$refs.chart) {
				this.$refs.chart.$resize()
			}
		},
	},
}
</script>

<style lang="scss">
.echarts {
	width: 100% !important;
	height: 100% !important;

	> div {
		> canvas {
			width: 100% !important;
			height: 100% !important;
		}
	}
}
.height-100 {
	height: 100%;
}
</style>

<template>
	<div class="home-page">
		<v-card class="pa-3 mb-10" style="width: 400px; height: auto">
			<keyword-field persist />
		</v-card>
		<v-card class="pa-3" style="width: 600px; height: 500px">
			<chart-presentor
				id="chart-test"
				type="bar"
				color="blue"
				resource="example"
				title="Studies by Particiapting Site"
				sub-title="This is a subtitle"
				yAxisLabel="Counts (sm)"
				xAxisLabel="Test Label"
				tooltip
				data-zoom
			/>
		</v-card>
		<v-card class="mb-10 border hide-overflow" v-if="false">
			<chart-builder
				id="chart-builder-test"
				type="bar"
				color="blue"
				:data="chartData"
				title="This is a chart"
				sub-title="this is a subtitle"
				yAxisLabel="Counts (sm)"
				xAxisLabel="Test Label"
				:dataZoomX="true"
				:dataZoomY="true"
				:tooltip="true"
				:hideAxisLines="false"
				:hideIntervalLines="false"
				:hideIntervalTicks="false"
				:hideBarShadows="false"
				:abbreviateLabels="10"
			/>
		</v-card>
		<v-card class="mb-10 border hide-overflow" v-if="false">
			<chart-builder
				id="chart-builder-pie-test"
				type="pie"
				color="blue"
				:data="chartData"
				title="This is a chart"
				sub-title="this is a subtitle"
				:tooltip="true"
				:legend="true"
			/>
		</v-card>
		<v-card style="height: 500px; width: 600px" class="pa-5 mb-10" v-if="false">
			<chart-wrapper
				type="pie"
				color="blue"
				:data="chartData"
				:donut="false"
				:hide-labels="false"
				title="This is a chart"
				sub-title="thisi s aubasldfkj"
				label-position="outside"
				label-size="14"
				tooltip
			/>
		</v-card>
		<expand v-model="expand">
			<v-card style="height: 500px; width: 1000px" class="pa-5" v-if="false">
				<chart-wrapper
					type="bar"
					color="blue"
					:data="chartData"
					title="This is a chart"
					sub-title="thisi s aubasldfkj"
					yAxisLabel="Counts (sm)"
					xAxisLabel="Test Label"
					tooltip
					data-zoom
				/>
			</v-card>
		</expand>
	</div>
</template>

<script>
import ChartWrapper from '@/components/charts/ChartWrapper'
import ChartPresentor from '@/components/charts/presentor/ChartPresentor'
import Expand from '@/components/utils/Expand'

import KeywordField from '@/components/form/fields/KeywordField'

export default {
	name: 'home-page',
	components: { ChartPresentor, ChartWrapper, Expand, KeywordField },
	data() {
		return {
			expand: false,
			chartData: [
				{
					name: 'One',
					data: 10,
				},
				{
					name: 'Two',
					data: 20,
				},
				{
					name: 'Three',
					data: 30,
				},
				{
					name: 'Four',
					data: 100,
				},
				{
					name: 'Five',
					data: 120,
				},
				{
					name: 'Three Four Five',
					data: 130,
				},
				{
					name: 'One Test Label',
					data: 90,
				},
				{
					name: 'Thisisaverylonglabel',
					data: 60,
				},
				{
					name: 'Three',
					data: 50,
				},
			],
		}
	},
}
</script>

<style lang="scss" scoped>
.home-page {
	min-height: 100vh;
	padding: 3rem;
}
</style>

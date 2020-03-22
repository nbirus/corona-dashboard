<template>
	<v-card class="count-widget">
		<chart-wrapper
			class="count-widget__chart"
			:id="`timeline-chart-${id}`"
			type="line"
			ignore-loading
			:formatter="`line${id}`"
			:data="{ data: chartData, dates }"
			:extra-options="chartOptions"
		/>
		<div class="count-widget__data">
			<h1>{{ value | localeString }}</h1>
			<label class="text--secondary">{{ label }}</label>
		</div>
		<v-icon class="count-widget__badge">mdi-badge-account</v-icon>
		<div :class="id" class="count-widget__banner body-2">
			<!-- <v-icon class="icon" left>mdi-trending-up</v-icon> -->
			<span>
				+
				<strong>{{ valueToday | localeString }}</strong>
				today ({{parseInt(value / valueToday)}}%)
			</span>
		</div>
	</v-card>
</template>

<script>
import ChartWrapper from '@/components/charts/ChartWrapper'

export default {
	name: 'count-widget',
	components: { ChartWrapper },
	inheritAttrs: false,
	props: {
		value: Number,
		valueToday: Number,
		id: String,
		label: String,
		color: String,
		chartData: Array,
		dates: Array,
	},
	data() {
		return {
			chartOptions: {
				scales: {
					xAxes: [
						{
							display: false,
						},
					],
					yAxes: [
						{
							display: false,
						},
					],
				},
				legend: {
					display: false,
				},
			},
		}
	},
}
</script>

<style lang="scss">
div.count-widget {
	min-height: 170px;
	transition: transform 0.2s ease;
	overflow: hidden;
	display: flex !important;
	// align-items: center;
	position: relative;
	padding-top: 1rem;
	padding-left: 1.5rem;

	.default-loading {
		display: none;
	}
	&__data {
		z-index: 2;

		label {
			display: block;
			margin-top: -0.3rem;
		}
	}
	&__badge {
		position: absolute;
		right: 1rem;
		top: 1rem;
		z-index: 13;
	}
	&__chart {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 30px;
		height: calc(100% - 65px);
	}
	&__banner {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 0.15rem 1rem 0;
		height: 30px;
		background-color: fade-out(black, 0.975);
		color: var(--v-secondary-lighten1);
		display: flex;
		justify-content: center;

		.icon {
			position: absolute;
			left: 1rem;
		}
	}
	.cases {
		background-color: rgba(218, 235, 249, 1);
		color: var(--v-primary-darken3);
	}
	.deaths {
		background-color: rgba(252, 198, 194, 1);
		color: var(--v-error-darken3);
	}
	.recovered {
		background-color: rgba(219, 239, 220, 1);
		color: var(--v-success-darken3);
	}
}
</style>

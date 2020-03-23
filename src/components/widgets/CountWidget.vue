<template>
	<v-card class="count-widget" :class="{loading: chartLoading}">
		<chart-wrapper
			class="count-widget__chart"
			:id="`timeline-chart-${id}`"
			type="line"
			ignore-loading
			:formatter="`line${id}`"
			:data="{ data: chartData, dates }"
			:extra-options="chartOptions"
			@change="chartLoading=$event.loading"
		/>

		<!-- data -->
		<div class="count-widget__data">
			<h1>{{ value | localeString }}</h1>
			<label class="text--secondary">{{ label }}</label>
		</div>

		<!-- bottom data -->
		<div :class="id" class="count-widget__banner body-2">
			<span>
				<strong>{{ valueToday | localeString }}</strong>
				today (+{{percent}}%)
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
			chartLoading: true,
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
	computed: {
		percent() {
			return ((this.valueToday / this.value) * 100).toFixed(1)
		},
	},
}
</script>

<style lang="scss">
div.count-widget {
	min-height: 150px;
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
			margin-top: -0.5rem;
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
		bottom: 29px;
		height: calc(100% - 65px);
	}
	&__banner {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 30px;
		background-color: fade-out(black, 0.975);
		color: var(--v-secondary-lighten1);
		display: flex;
		justify-content: center;
		align-items: center;

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

	&.loading {
		.cases {
			border-top: solid 1px var(--v-primary-lighten1);
		}
		.deaths {
			border-top: solid 1px var(--v-error-lighten1);
		}
		.recovered {
			border-top: solid 1px var(--v-success-lighten1);
		}
	}
}
</style>

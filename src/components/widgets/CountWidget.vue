<template>
	<v-card class="count-widget" :class="{ loading: chartLoading }">
		<chart-wrapper
			class="count-widget__chart"
			:id="`timeline-chart-${id}`"
			type="line"
			ignore-loading
			:formatter="`line${id}`"
			:data="{ data: chartData, dates }"
			:extra-options="chartOptions"
			@change="chartLoading = $event.loading"
		/>

		<div class="count-widget__gradient"></div>

		<!-- data -->
		<div class="count-widget__data" :class="id">
			<h1 class="text">{{ value | localeString }}</h1>
			<label class="text">{{ label }}</label>
		</div>

		<!-- bottom data -->
		<div :class="id" class="count-widget__banner body-2">
			<span>
				<strong>{{ valueToday | localeString }}</strong>
				today (+{{ percent }}%)
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
		value: [Number, String],
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
				tooltips: {
					display: false,
				},
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
	padding-top: 1.5rem;
	padding-left: 2rem;

	.default-loading {
		display: none;
	}
	&__data {
		z-index: 2;
		font-size: 1.3rem;
		// transform: translateY(-2.5rem);

		label {
			display: block;
			font-size: 1.2rem;
			margin-top: -0.5rem;
		}

		&.cases .text {
			color: darken(#2e495f, 10);
		}
		&.deaths .text {
			color: darken(#9f0010, 20);
		}
		&.recovered .text {
			color: #2e495f;
		}
	}
	&__chart {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 28px;
		height: calc(100% - 28px);
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

		&.cases {
			background-color: rgba(218, 235, 249, 1);
			color: darken(#2e495f, 10);

			.text {
				color: #2e495f;
			}
			label {
				color: darken(#2e495f, 10);
			}
		}
		&.deaths {
			background-color: rgba(252, 198, 194, 1);
			color: darken(#9f0010, 20);
		}
		&.recovered {
			background-color: rgba(219, 239, 220, 1);
			color: var(--v-success-darken3);
		}
	}
}
</style>

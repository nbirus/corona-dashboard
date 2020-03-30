<template>
	<div class="stat-widget">
		<div class="bar">
			<div v-if="!loading" class="critical" :style="`flex: 0 0 ${criticalPercent}%`"></div>
			<div v-if="!loading" class="recovered" :style="`flex: 0 0 ${recoveredPercent}%`"></div>
			<div v-if="!loading" class="active" :style="`flex: 0 0 ${activePercent}%`"></div>
		</div>
		<div class="legend">
			<div class="key-group body-1">
				<div class="bullet critical"></div>
				<div class="value">{{ totals.critical | localeString }}</div>
				<div class="key">critical</div>
				<div class="percent">({{ criticalPercent }}%)</div>
			</div>
			<div class="key-group body-1">
				<div class="bullet recovered"></div>

				<div class="value">{{ totals.recovered | localeString }}</div>
				<div class="key">recovered</div>
				<div class="percent">({{ recoveredPercent }}%)</div>
			</div>
			<div class="key-group body-1">
				<div class="bullet active"></div>

				<div class="value">{{ totals.active | localeString }}</div>
				<div class="key">active</div>
				<div class="percent">({{ activePercent }}%)</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'count-widget',
	inheritAttrs: false,
	props: {
		loading: Boolean,
		totals: {
			type: Object,
			default: () => ({}),
		},
	},
	computed: {
		recoveredPercent() {
			return Math.round((this.totals.recovered / this.totals.cases) * 100)
		},
		criticalPercent() {
			return Math.round((this.totals.critical / this.totals.cases) * 100)
		},
		activePercent() {
			return Math.round((this.totals.active / this.totals.cases) * 100)
		},
	},
}
</script>

<style lang="scss" scoped>
.stat-widget {
	width: 100%;
	padding: 1.75rem 2rem 0.5rem;

	.bar {
		height: 12px;
		background-color: fade-out(black, 0.9);
		width: 100%;
		position: relative;
		border-radius: 0.75rem;
		overflow: hidden;
		margin-bottom: 1rem;
		display: flex;
	}
	.critical {
		position: relative;
		height: 100%;
		background-color: var(--v-warning-base);
	}
	.recovered {
		position: relative;
		height: 100%;
		background-color: var(--v-success-base);
	}
	.active {
		position: relative;
		height: 100%;
		background-color: var(--v-primary-base);
		z-index: 2;
	}
	.legend {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 650px;
		margin: 0 auto;
	}
	.key-group {
		display: flex;
		align-items: center;

		.value {
			font-weight: $bold;
			margin-right: 0.25rem;
		}
		.key {
			margin-right: 0.25rem;
		}
	}
	.bullet {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		margin-right: 0.5rem;

		&.critical {
			background-color: var(--v-warning-base);
		}
		&.recovered {
			background-color: var(--v-success-base);
		}
		&.active {
			background-color: var(--v-primary-base);
		}
	}
}
</style>

<template>
	<div class="stat-widget">
		<div class="bar">
			<div
				v-if="!loading"
				class="bar-item critical"
				:style="`flex: 0 1 ${criticalPercent}%`"
				v-text="`${criticalPercent === 0 ? 1 : criticalPercent}%`"
			></div>
			<div
				v-if="!loading"
				class="bar-item deaths"
				:style="`flex: 0 1 ${deathsPercent}%`"
				v-text="`${deathsPercent}%`"
			></div>
			<div
				v-if="!loading"
				class="bar-item recovered"
				:style="`flex: 0 1 ${recoveredPercent}%`"
				v-text="`${recoveredPercent}%`"
			></div>
			<div
				v-if="!loading"
				class="bar-item active"
				:style="`flex: 0 1 ${activePercent}%`"
				v-text="`${activePercent}%`"
			></div>
		</div>
		<div class="legend">
			<div class="key-group body-1 critical-group">
				<div class="bullet critical"></div>
				<div class="value">{{ totals.critical | localeString }}</div>
				<div class="key">critical</div>
				<!-- <div class="percent">({{ criticalPercent }}%)</div> -->
			</div>
			<div class="key-group body-1 deaths-group">
				<div class="bullet deaths"></div>
				<div class="value">{{ totals.deaths | localeString }}</div>
				<div class="key">deaths</div>
				<!-- <div class="percent">({{ deathsPercent }}%)</div> -->
			</div>
			<div class="key-group body-1 recovered-group">
				<div class="bullet recovered"></div>
				<div class="value">{{ totals.recovered | localeString }}</div>
				<div class="key">recovered</div>
				<!-- <div class="percent">({{ recoveredPercent }}%)</div> -->
			</div>
			<div class="key-group body-1 active-group">
				<div class="bullet active"></div>
				<div class="value">{{ totals.active | localeString }}</div>
				<div class="key">active</div>
				<!-- <div class="percent">({{ activePercent }}%)</div> -->
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
		total() {
			return this.totals.cases + this.totals.deaths
		},
		recoveredPercent() {
			return Math.round((this.totals.recovered / this.total) * 100)
		},
		criticalPercent() {
			return Math.round((this.totals.critical / this.total) * 100)
		},
		deathsPercent() {
			return Math.round((this.totals.deaths / this.total) * 100)
		},
		activePercent() {
			return Math.round((this.totals.active / this.total) * 100)
		},
	},
}
</script>

<style lang="scss" scoped>
.stat-widget {
	width: 100%;
	padding: 1.25rem 1.25rem 0;
	height: 100%;

	display: flex;
	flex-direction: column;

	.bar {
		height: 2rem;
		width: 100%;
		position: relative;
		display: flex;
		margin-bottom: 1rem;
	}
	.bar-item {
		padding-left: 0.5rem;
		font-size: 1rem;
		line-height: 2;
		min-width: 28px;
	}
	.active {
		position: relative;
		height: 100%;
		background-color: fade-out(#1976d2, 0.75);
		// border: solid thin var(--v-primary-base);
		color: var(--v-primary-darken3);
		border-radius: 0 0.75rem 0.75rem 0;
		border-left: none;
	}
	.recovered {
		position: relative;
		height: 100%;
		background-color: fade-out(#4caf50, 0.75);
		// border: solid thin var(--v-success-base);
		color: var(--v-success-darken3);
	}
	.critical {
		position: relative;
		height: 100%;
		background-color: fade-out(#fb8c00, 0.75);
		// border: solid thin var(--v-warning-base);
		color: var(--v-warning-darken3);
		z-index: 2;
		border-radius: 0.75rem 0 0 0.75rem;
		border-right: none;
	}
	.deaths {
		position: relative;
		height: 100%;
		background-color: fade-out(#ff5252, 0.75);
		// border: solid thin var(--v-error-base);
		color: var(--v-error-darken3);
		z-index: 2;
		border-radius: 0;
		border-right: none;
	}
	.legend {
		display: flex;
		justify-content: space-around;
		align-items: center;
		min-width: 750px;
		margin: 0 auto;
	}
	.key-group {
		display: flex;
		align-items: center;
		margin-right: 2rem;

		.value {
			margin-right: 0.25rem;
			font-size: 1.1rem;
		}
		.key {
			margin-right: 0.25rem;
		}
	}
	.bullet {
		width: 12px;
		height: 12px;
		border-radius: 25px;
		margin-right: 0.5rem;
		transform: translateY(-1px);
		// background-color: white;

		&.critical {
			border: solid 1px var(--v-warning-base);
		}
		&.recovered {
			border: solid 1px var(--v-success-base);
		}
		&.deaths {
			border: solid 1px var(--v-error-base);
		}
		&.active {
			border: solid 1px var(--v-primary-base);
		}
	}
}

@media screen and (max-width: 480px) {
	.stat-widget {
		padding: 1rem 1rem 1rem;
		.bar {
			height: 1.5rem;
		}
		.bar-item {
			line-height: 1.7;
		}
		.legend {
			flex-direction: column;
			align-items: flex-start;
			min-width: auto;
			margin: 0;
			padding: 0.5rem 0 0 0.5rem;
		}
		.value {
			font-weight: $bold;
		}
	}
}
</style>

<template>
	<ul class="map-table">
		<!-- <li class="map-table__header">
			<div class="bold">country</div>
			<div class="bold">{{ type }}</div>
		</li>-->

		<li class="map-table__row" v-for="(data, i) in activeData" :key="i">
			<div
				v-if="data && max && i < 20"
				class="bar"
				:class="type"
				:style="`width: ${(data[type] / max) * 100}%`"
			></div>
			<span class="index">{{ i + 1 }}.</span>
			<span class="name">{{ data.name }}</span>
			<span class="cases body-2">{{ data[type] | localeString }}</span>
		</li>
	</ul>
</template>

<script>
export default {
	name: 'map-country-table',
	props: {
		value: Object,
		type: {
			type: String,
			default: 'cases',
		},
	},
	data() {
		return {
			pagination: {
				size: 20,
				from: 0,
			},
		}
	},
	computed: {
		activeData() {
			return Object.keys(this.value)
				.map(key => {
					let cases = this.$h.get(this.value, `${key}.stats.cases`, 0)
					let deaths = this.$h.get(this.value, `${key}.stats.deaths`, 0)
					let recovered = this.$h.get(this.value, `${key}.stats.recovered`, 0)

					return {
						name: this.$h.get(this.value, `${key}.province`, 'Other'),
						cases,
						deaths,
						recovered,
					}
				})
				.sort((a, b) => {
					return b[this.type] - a[this.type]
				})
		},
		max() {
			return this.activeData[0][this.type]
		},
		sort() {
			return {
				key: this.type,
				desc: false,
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.map-table {
	margin: 0;
	padding: 0;
	height: 725px;
	overflow-y: auto;

	&.loading {
		.map-table__row {
			opacity: 0;
		}
	}

	&__row {
		margin: 0;
		padding: 0.65rem 1rem;
		display: flex;
		align-items: center;
		transition: opacity 0.2s ease;
		position: relative;

		span {
			display: block;
		}
		.index {
			flex: 0 0 1rem;
			font-size: 1rem !important;
			margin-right: 0.75rem;
			z-index: 2;
		}
		.name {
			flex: 0 1 100%;
			font-size: 1rem !important;
			z-index: 2;
		}
		.cases {
			flex: 0 0 auto;
			font-weight: $bold;
			z-index: 2;
		}
		.deaths {
			flex: 0 0 auto;
			font-weight: $bold;
		}

		&:hover {
			background-color: fade-out(black, 0.95);
		}
	}
	&__header {
		padding: 1rem 1rem 0.5rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 0.9rem;
		opacity: 0.8;
	}
	.bar {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;

		&.cases {
			background-color: rgba(218, 235, 249, 0.5);
		}
		&.deaths {
			background-color: rgba(252, 198, 194, 0.5);
		}
		&.deaths {
			background-color: rgba(252, 198, 194, 0.5);
		}
	}
}
</style>

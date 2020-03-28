<template>
	<data-wrapper :data="activeData" :sort="sort" :pagination="pagination" v-slot="{ _state }">
		<ul class="map-table">
			<li class="map-table__row" v-for="(data, i) in _state.data" :key="i">
				<span class="name">{{data.name}}</span>
				<span class="cases">{{data.cases}}</span>
				<span class="cases-today">+{{data.casesTodayPercent}}%</span>
				<span class="deaths">{{data.deaths}}</span>
			</li>
		</ul>
	</data-wrapper>
</template>

<script>
export default {
	name: 'map-table',
	props: {
		value: Object,
		dateIndex: Number,
		type: {
			type: String,
			default: 'cases',
		},
	},
	data() {
		return {
			pagination: {
				size: 10,
				from: 0,
			},
		}
	},
	computed: {
		activeData() {
			return Object.keys(this.value).map(key => {
				let cases = this.$h.get(this.value, `${key}.timeline.cases.${this.dateIndex}`, 0)
				let casesYesterday = this.$h.get(
					this.value,
					`${key}.timeline.cases.${this.dateIndex - 1}`,
					0
				)
				let casesToday = cases - casesYesterday
				let casesTodayPercent = ((cases / casesYesterday) * 100).toFixed(1)

				let deaths = this.$h.get(this.value, `${key}.timeline.deaths.${this.dateIndex}`, 0)
				let deathsYesterday = this.$h.get(
					this.value,
					`${key}.timeline.deaths.${this.dateIndex - 1}`,
					0
				)
				let deathsToday = deaths - deathsYesterday
				let deathsTodayPercent = ((deaths / deathsYesterday) * 100).toFixed(1)

				return {
					name: this.$h.get(this.value, `${key}.info.name`, 'Other'),
					cases,
					casesYesterday,
					casesToday,
					casesTodayPercent,
					deaths,
					deathsYesterday,
					deathsToday,
					deathsTodayPercent,
				}
			})
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

	&__row {
		margin: 0;
		padding: 1rem;
		display: flex;

		span {
			display: block;
		}

		.name {
			flex: 0 1 100%;
		}
		.cases {
			flex: 0 0 auto;
		}
		.cases-today {
			flex: 0 0 auto;
		}
		.deaths {
			flex: 0 0 auto;
		}

		&:not(:last-child) {
			border-bottom: solid thin $border-color-light;
		}
	}
}
</style>
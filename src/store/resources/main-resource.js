import get from 'lodash/get'

export default {
	namespaced: true,
	state() {
		return {
			data: {
				totals: {
					cases: 0,
					deaths: 0,
					recovered: 0,
					critical: 0,
					active: 0,
					casesPerOneMillion: 0,
				},
				today: {
					cases: 0,
					deaths: 0,
					recovered: 0,
				},
				timeline: {},
				countries: [],
				updated: '',
			},
			total: null,
			loading: true,
			error: null,
		}
	},
	getters: {
		state: state => ({
			loading: state.loading,
			error: state.error,
			data: state.data,
		}),
	},
	mutations: {
		SET_LOADING(state, loading = true) {
			state.loading = loading
		},
		SET_ERROR(state, error = null) {
			state.error = error
		},
		SET_DATA(state) {
			let totals = this.getters['countsResource/state']
			let timeline = this.getters['timelineResource/state']
			let countries = this.getters['countriesResource/state']

			let confirmedTotal = get(totals, 'data.cases', 0)
			let deathTotal = get(totals, 'data.deaths', 0)
			let recoveredTotal = get(totals, 'data.recovered', 0)

			let confirmedTotalYesterday = 0
			let deathTotalYesterday = 0
			let recoveredTotalYesterday = 0

			let critical = 0
			let active = 0
			let casesPerOneMillion = 0

			// loop over each country
			Object.keys(timeline.data).forEach(countryName => {
				let countryArray = timeline.data[countryName]

				// set totals
				let lastItem = countryArray[countryArray.length - 1]

				// set yesterday's totals
				confirmedTotalYesterday += lastItem.confirmed
				deathTotalYesterday += lastItem.deaths
				recoveredTotalYesterday += lastItem.recovered

				critical += lastItem.critical
				active += lastItem.active
				casesPerOneMillion += lastItem.casesPerOneMillion
			})

			state.data.totals.confirmed = confirmedTotal
			state.data.totals.deaths = deathTotal
			state.data.totals.recovered = recoveredTotal
			state.data.updated = totals.data.updated

			// set daily totals
			state.data.today.confirmed = confirmedTotal - confirmedTotalYesterday
			state.data.today.deaths = deathTotal - deathTotalYesterday
			state.data.today.recovered = recoveredTotal - recoveredTotalYesterday

			console.log(critical);


			state.data.today.critical = critical
			state.data.today.active = active
			state.data.today.casesPerOneMillion = casesPerOneMillion

			// set countries
			state.data.countries = countries.data
		},
	},
	actions: {
		async set({
			commit
		}) {
			try {
				commit('SET_DATA')
			} catch (error) {
				commit('SET_ERROR', error)
			} finally {
				commit('SET_LOADING', false)
			}
		},
	},
}
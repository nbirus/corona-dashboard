import dayjs from 'dayjs'

let timelineInterval = null
let timelinePauseTimeout = null
let timelineIntervalSpeed = 200
let timelinePauseInterval = 2000

let startDate = '1/22/20'

let dates = getDates()
function getDates() {
	var dateArray = []
	var currentDate = dayjs(startDate)
	while (currentDate <= dayjs()) {
		dateArray.push(dayjs(currentDate).format('MMM D'))
		currentDate = dayjs(currentDate).add(1, 'days')
	}
	return dateArray
}

export default {
	namespaced: true,
	state() {
		return {
			timelinePlaying: false,
			timelineDates: dates,
			timelineLength: 0,
			timelineIndex: dates.length - 1,
		}
	},
	getters: {
		timelineDates: state => state.timelineDates,
		timelinePlaying: state => state.timelinePlaying,
		timelineIndex: state => state.timelineIndex,
		timelineLength: state => state.timelineDates.length - 1,
		timelineActiveDate: state => state.timelineDates[state.timelineIndex],
	},
	mutations: {
		SET_PLAY(state, playing) {
			state.timelinePlaying = playing
		},
		SET_DATE_INDEX(state, index) {
			state.timelineIndex = index
		},
	},
	actions: {
		// controls
		start({ commit, dispatch, getters }) {
			// pause if the timeline is not already stoped
			let skipPause = getters.timelineIndex === getters.timelineLength && !getters.timelinePlaying
			timelinePauseInterval = skipPause ? 0 : 2000

			clear()
			commit('SET_PLAY', true)

			timelineInterval = setInterval(() => {
				dispatch('onInterval')
			}, timelineIntervalSpeed)
		},
		pause({ commit }) {
			clear()
			commit('SET_PLAY', false)
		},
		toggle({ getters, dispatch }) {
			if (getters.timelinePlaying) {
				dispatch('pause')
			} else {
				dispatch('start')
			}
		},
		set({ dispatch, commit }, index) {
			dispatch('pause')
			commit('SET_DATE_INDEX', index)
		},

		// methods
		onInterval({ commit, getters, dispatch }) {
			if (getters.timelineIndex > getters.timelineLength) {
				dispatch('restartAfterPause')
			} else {
				commit('SET_DATE_INDEX', getters.timelineIndex + 1)
			}
		},
		restartAfterPause({ dispatch, commit, getters }) {
			clear()
			timelinePauseTimeout = setTimeout(() => {
				if (getters.timelinePlaying) {
					commit('SET_DATE_INDEX', 0)
					dispatch('start')
				}
			}, timelinePauseInterval)
		},
	},
}

function clear() {
	clearInterval(timelineInterval)
	clearTimeout(timelinePauseTimeout)
	timelineInterval = null
	timelinePauseTimeout = null
}

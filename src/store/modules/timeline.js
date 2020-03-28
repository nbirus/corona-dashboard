import dayjs from 'dayjs'

let timelineInterval = null
let timelinePauseTimeout = null
let timelineIntervalSpeed = 1
let timelinePauseInterval = 2000

let startDate = '1/22/20'

function getDates() {
	var dateArray = []
	var currentDate = dayjs(startDate)
	while (currentDate <= dayjs().subtract(1, 'day')) {
		dateArray.push(dayjs(currentDate).format('MMM D'))
		currentDate = dayjs(currentDate).add(1, 'days')
	}
	return dateArray
}

export default {
	namespaced: true,
	state() {
		let dates = getDates()
		let dateLength = dates.length

		return {
			timelinePlaying: false,
			timelineDates: dates,
			timelineSlider: dateLength * 10,
			timelineMax: dateLength * 10,
			timelineType: 'cases',
		}
	},
	getters: {
		timelinePlaying: state => state.timelinePlaying,
		timelineDates: state => state.timelineDates,
		timelineSlider: state => state.timelineSlider,
		timelineMax: state => state.timelineMax,
		timelineIndex: state => Math.round(Number.parseInt(state.timelineSlider) / 10) - 1,
		timelineLength: state => state.timelineLength,
		timelineType: state => state.timelineType,
		timelineActiveDate: state => state.timelineDates[state.timelineIndex],
	},
	mutations: {
		SET_PLAY(state, playing) {
			state.timelinePlaying = playing
		},
		SET_SLIDER(state, value) {
			state.timelineSlider = value
		},
	},
	actions: {
		// controls
		start({
			commit,
			dispatch,
			getters
		}) {
			// pause if the timeline is not already stoped
			let skipPause = getters.timelineSlider === getters.timelineMax && !getters.timelinePlaying
			timelinePauseInterval = skipPause ? 0 : 2000

			clear()
			commit('SET_PLAY', true)

			timelineInterval = setInterval(() => {
				dispatch('onInterval')
			}, timelineIntervalSpeed)
		},
		pause({
			commit
		}) {
			clear()
			commit('SET_PLAY', false)
		},
		toggle({
			getters,
			dispatch
		}) {
			if (getters.timelinePlaying) {
				dispatch('pause')
			} else {
				dispatch('start')
			}
		},
		set({
			commit
		}, value) {
			commit('SET_SLIDER', value)
		},

		// methods
		onInterval({
			commit,
			getters,
			dispatch
		}) {
			if (getters.timelineSlider >= getters.timelineMax) {
				dispatch('restartAfterPause')
			} else {
				commit('SET_SLIDER', getters.timelineSlider + 5)
			}
		},
		restartAfterPause({
			dispatch,
			commit,
			getters
		}) {
			clear()
			timelinePauseTimeout = setTimeout(() => {
				if (getters.timelinePlaying) {
					commit('SET_SLIDER', 0)
					dispatch('start')
				}
			}, timelinePauseInterval)
		},
		setType({
			state
		}, type) {
			state.timelineType = type
		}
	},
}

function clear() {
	clearInterval(timelineInterval)
	clearTimeout(timelinePauseTimeout)
	timelineInterval = null
	timelinePauseTimeout = null
}
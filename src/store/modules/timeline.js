export default {
	namespaced: true,
	state() {
		return {
			timelineIndex: 0,
		}
	},
	getters: {
		timelineIndex: state => state.timelineIndex,
	},
	actions: {
		set({
			state
		}, index) {
			state.timelineIndex = index
		}
	},
}
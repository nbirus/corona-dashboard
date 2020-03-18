import set from 'lodash/set'

export default {
	namespaced: true,
	state() {
		return {
			chartState: {},
			chartSettings: {},
			expand: false,
			settings: false,
			screenshot: false,
			screenshotModal: false,
			resizeKey: 0,
		}
	},
	getters: {
		resizeKey$: state => state.resizeKey,
		screenshotModal$: state => state.screenshotModal,
		chartSettings: state => state.chartSettings,
		chartState: state => state.chartState,
		state$: state => ({
			expand: state.expand,
			settings: state.settings,
			screenshot: state.screenshot,
		}),
	},
	mutations: {
		SET(state, { key, value }) {
			set(state, key, value)
		},
	},
	actions: {
		toggleExpand({ commit, getters }) {
			if (getters.state$.expand) {
				enableScroll()
				commit('SET', { key: 'expand', value: false })
				commit('SET', { key: 'settings', value: false })
				commit('SET', { key: 'screenshot', value: false })
			} else {
				preventScroll()
				commit('SET', { key: 'expand', value: true })
			}
		},
		toggleSettings({ commit, getters }) {
			commit('SET', { key: 'settings', value: !getters.state$.settings })
		},
		toggleScreenshot({ commit, getters }) {
			commit('SET', { key: 'screenshot', value: !getters.state$.screenshot })
		},
		setScreenshotModal({ commit }, value = true) {
			commit('SET', { key: 'screenshotModal', value })
		},
		updateSettings({ commit }, settings) {
			commit('SET', { key: 'chartSettings', value: settings })
		},
		resetResize({ state }) {
			state.resizeKey++
		},
		setChartState({ commit }, chartState) {
			commit('SET', { key: 'chartState', value: chartState })
		},
	},
}

function preventScroll() {
	document.getElementsByTagName('html')[0].classList.add('no-scroll')
}
function enableScroll() {
	document.getElementsByTagName('html')[0].classList.remove('no-scroll')
}

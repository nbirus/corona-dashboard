<template>
	<timeout-warning
		:key="this.$route.name !== 'login'"
		:expiresIn="appSession.time.expiresIn"
		:open="showTimeoutAlert"
		@userDidRespond="userDidRespond"
		@userDidntRespond="userDidntRespond"
	/>
</template>

<script>
import TimeoutWarning from './TimeoutWarning.vue'

export default {
	name: 'timeout-guard',
	components: { TimeoutWarning },
	data() {
		return {
			showTimeoutAlert: false,
			appSession: null,
		}
	},
	created() {
		this.appSession = this.$sm
	},
	mounted() {
		this.appSession.events.on(this.$smEvents.SHOW_TIMEOUT, this.onShowTimeout)
		this.appSession.events.on(this.$smEvents.RENEWAL_ERROR, this.onRenewError)
		this.appSession.events.on(this.$smEvents.OAUTH_ERROR, this.onAuthError)
		this.appSession.mount()
	},
	methods: {
		// events
		onShowTimeout() {
			if (this.$route.name !== 'login') {
				// eslint-disable-next-line no-console
				console.warn('SHOW TIMEOUT')
				this.showTimeoutAlert = true
			}
		},
		onRenewError(error) {
			// eslint-disable-next-line no-console
			console.error('AUTH ERROR: ', error)
			this.logout('<b>Your session has expired!</b> Please log back in.')
		},
		onAuthError(error) {
			// eslint-disable-next-line no-console
			console.error('AUTH ERROR: ', error)
			this.logout()
		},

		// respond events
		async userDidRespond() {
			this.showTimeoutAlert = false
			await this.appSession.userDidRespond()
		},
		userDidntRespond() {
			this.appSession.userDidntRespond()
			this.logout('<b>Your session has expired!</b> Please log back in.')
		},

		// actions
		logout(message) {
			this.showTimeoutAlert = false
			this.$store.dispatch('auth/setPreAuth', this.$route.path)
			this.$router.push({
				path: '/logout',
				query: { message },
			})
		},
	},
	watch: {
		$route() {
			this.$nextTick(() => {
				// fix overlay bug
				let list = document.getElementsByClassName('v-overlay')
				if (list.length) {
					for (let i = list.length - 1; 0 <= i; i--)
						if (list[i] && list[i].parentElement) list[i].parentElement.removeChild(list[i])
				}
			})
		},
	},
	beforeDestroy() {
		this.appSession.beforeDestroy()
	},
}
</script>

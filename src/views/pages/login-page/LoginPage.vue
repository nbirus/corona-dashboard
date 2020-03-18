<template>
	<v-layout class="page page-warning" justify-center>
		<v-flex class="page-warning__warning">
			<v-layout column align-center>
				<!-- nci logo -->
				<img
					width="100%"
					class="page-warning__img"
					src="@/assets/nci-logo-full.svg"
					alt="National Cancer Institute at the National Institutes of Health Logo"
				/>

				<!-- text -->
				<p class="body-2" align="justify">
					You are accessing a U.S. Government information system, which includes (1) this computer,
					(2) this computer network, (3) all computers connected to this network, and (4) all
					devices and storage media attached to this network or to a computer on this network. This
					information system is provided for U.S. Government-authorized use only. Unauthorized or
					improper use of this system may result in disciplinary action, as well as civil and
					criminal penalties. By using this information system, you understand and consent to the
					following:
				</p>
				<hr class="my-5 light-border" />
				<p class="body-2" align="justify">
					You have no reasonable expectation of privacy regarding any communications or data
					transiting or stored on this information system. At any time, and for any lawful
					Government purpose, the government may monitor, intercept, record, and search and seize
					any communication or data transiting or stored on this information system.
				</p>
				<hr class="my-5 light-border" />
				<p class="body-2" align="justify">
					Any communication or data transiting or stored on this information system may be disclosed
					or used for any lawful Government purpose.
				</p>

				<!-- submit button -->
				<form name="warning-form" class="page-warning__submit" @submit.prevent="login">
					<v-btn id="log-in-btn" block depressed color="primary" type="submit" min-height="47">
						<v-icon left>fa-check</v-icon>Acknowledge and Continue
					</v-btn>
				</form>

				<!-- warning -->
				<div class="text-secondary body-2 text-center grey lighten-3 py-3 px-3 border-radius">
					<v-icon size="12" left>fa-info-circle</v-icon>Please ensure your pop-up blocker is
					disabled before accessing the site
				</div>
			</v-layout>
		</v-flex>

		<!-- okta widget -->
		<v-dialog v-model="widgetShown" width="400" eager content-class="okta-widget-container">
			<v-card flat>
				<div id="okta-widget"></div>
			</v-card>
		</v-dialog>
	</v-layout>
</template>

<script>
export default {
	name: 'login-page',
	widgetSelector: '#okta-widget',
	data() {
		return {
			widgetShown: false,
		}
	},
	async mounted() {
		this.$store.dispatch('auth/check')

		if (await this.$sm.auth.isAuthenticated()) {
			this.$router.push('/')
		}
	},
	methods: {
		showWidget() {
			this.$sm.auth.checkSessionAndLogin(
				{ el: this.$options.widgetSelector },
				this.onSuccess,
				this.onFailure
			)
		},
		async login() {
			if (!(await this.$sm.auth.isAuthenticated())) {
				this.showWidget()
				this.widgetShown = true
			} else {
				this.onSuccess()
			}
		},
		onSuccess() {
			// route to their previous authenticated route or to home
			this.$router.push(this.$store.getters['auth/preAuthRoute'] || '/')

			// set login information
			this.$store.dispatch('auth/login')
		},
		onFailure(error) {
			// eslint-disable-next-line no-console
			console.error(`Login Error: `, error)
		},
	},
}
</script>

<style lang="scss" scoped>
.page-warning {
	width: 100%;
	padding-top: 4rem;

	&__warning {
		max-width: 535px;
	}
	&__img {
		margin-bottom: 2rem;
	}
	&__submit {
		width: 100%;
		margin-top: 2.5rem;
		margin-bottom: 1.5rem;
	}

	hr {
		width: 100%;
	}
	p {
		margin: 0;
	}
}
</style>

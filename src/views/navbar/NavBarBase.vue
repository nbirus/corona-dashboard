<template>
	<v-app-bar
		id="nav"
		class="nav-bar"
		:height="70"
		color="aqua darken-2"
		absolute
		app
		dark
		elevation="3"
	>
		<div class="nav-bar__inner limited-width-lg">
			<!-- logo -->
			<div class="nav-bar__logo" :class="{ md: $vuetify.breakpoint.mdAndDown }">
				<v-layout
					class="pointer nav-bar__logo-container"
					align-center
					justify-center
					@click="$router.push('/')"
				></v-layout>
			</div>

			<!-- nci logo -->
			<div class="nav-bar__nci-logo">
				<a href="https://www.cancer.gov/" target="_blank">
					<img
						:height="$vuetify.breakpoint.mdAndUp ? '26px' : '23px'"
						src="@/assets/nci-logo-white.svg"
						alt="National Cancer Institute at the National Institutes of Health"
						title="National Cancer Institute at the National Institutes of Health"
					/>
				</a>
			</div>

			<!-- actions -->
			<v-layout class="nav-bar__actions" align-center justify-end>
				<!-- help -->
				<v-flex shrink>
					<v-tooltip bottom>
						<template v-slot:activator="{ on }">
							<v-btn
								@click="openDocLink"
								class="nav-bar__icon ml-2"
								icon
								v-on="on"
								aria-label="Logout"
							>
								<v-icon size="24">fa-question-circle</v-icon>
							</v-btn>
						</template>
						<span>Open Documentation</span>
					</v-tooltip>
				</v-flex>

				<!-- user -->
				<v-menu v-model="open" :close-on-content-click="false" max-width="335" offset-y>
					<template v-slot:activator="{ on }">
						<v-flex shrink>
							<v-btn
								id="nav-account-btn"
								class="nav-bar__icon ml-2"
								icon
								v-on="on"
								aria-label="Logout"
							>
								<v-icon class="white--text" size="24">fa-user</v-icon>
							</v-btn>
						</v-flex>
					</template>
					<v-card>
						<v-layout class="px-10 py-5" column align-center>
							<v-avatar color="dark" class="mb-3" size="66">
								<h3 class="white--text">
									{{ $h.get(name, '0', $h.get(email, '0', '')) | titleCase }}
								</h3>
							</v-avatar>
							<strong v-text="name"></strong>
							<div class="body-2 text-secondary" v-text="email"></div>
							<v-tooltip left>
								<template v-slot:activator="{ on }">
									<v-chip class="mt-4" label color="light" v-on="on">
										<v-icon small left>fa-user-tag</v-icon>
										{{ roles.join(', ') | titleCase }}
									</v-chip>
								</template>
								<span>Role</span>
							</v-tooltip>
						</v-layout>

						<v-divider></v-divider>

						<v-layout class="py-2" align-center justify-center>
							<v-btn
								width="220"
								large
								text
								@click="
									$router.push('/logout')
									open = false
								"
							>
								<v-icon left>fa-sign-out-alt</v-icon>Sign out
							</v-btn>
						</v-layout>
					</v-card>
				</v-menu>
			</v-layout>
		</div>
	</v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'nav-bar-base',
	data() {
		return {
			open: false,
		}
	},
	computed: {
		...mapGetters('auth', ['name', 'username', 'email', 'roles', 'lab']),
	},
	methods: {
		openDocLink() {
			window.open('/documentation/', '_blank')
		},
	},
}
</script>

<style lang="scss">
.nav-bar {
	padding-left: 0;

	.v-toolbar__content {
		padding: 0;
	}
	.dlap-title {
		font-size: 1.2rem;
	}

	&__inner {
		position: relative;
		width: 100%;

		display: flex;
		align-items: center;
		padding: 0 1rem;
	}
	&__nci-logo {
		margin-top: 0.5rem;
		z-index: 1;
	}
	&__logo {
		position: absolute;
		width: 100%;
		left: 0;

		&.md {
			h3 {
				font-size: 1rem;
			}
			.nav-bar__logo-container {
				margin-left: -4rem;
			}
		}
	}
	&__logo-container {
		position: relative;
		margin-left: -3rem;
	}
}
</style>

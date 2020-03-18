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
	></v-app-bar>
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

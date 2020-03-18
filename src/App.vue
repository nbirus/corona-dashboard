<template>
	<v-app v-resize="() => $store.dispatch('width')">
		<!-- nav bar -->
		<nav-bar-base v-if="$store.getters['auth/authenticated'] && $route.name !== 'login'" />

		<!-- side bar -->
		<side-bar-base v-if="$store.getters['auth/authenticated'] && $route.name !== 'login'" />

		<!-- page view -->
		<transition name="page" mode="out-in">
			<v-content :key="$route.name">
				<router-view />
			</v-content>
		</transition>

		<!-- nav bar -->
		<footer-base />

		<!-- global components -->
		<timeout-gaurd />
		<dialog-table />
		<snackbar />
	</v-app>
</template>

<script>
import NavBarBase from '@/views/navbar/NavBarBase'
import SideBarBase from '@/views/navbar/SideBarBase'
import FooterBase from '@/views/footer/FooterBase'
import TimeoutGaurd from '@/components/timeout/TimeoutGaurd'

export default {
	name: 'App',
	components: {
		NavBarBase,
		SideBarBase,
		FooterBase,
		TimeoutGaurd,
		Snackbar: () => import('@/components/utils/Snackbar'),
		DialogTable: () => import('@/components/utils/DialogTable'),
	},
	watch: {
		$route() {
			this.$store.dispatch('auth/check')
		},
	},
}
</script>

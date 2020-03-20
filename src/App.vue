<template>
	<v-app v-resize="() => $store.dispatch('width')">
		<!-- nav bar -->
		<nav-bar-base />

		<!-- page view -->
		<transition name="page" mode="out-in">
			<v-content>
				<router-view :key="$route.name" />
			</v-content>
		</transition>

		<!-- global components -->
		<dialog-table />
		<snackbar />
	</v-app>
</template>

<script>
import NavBarBase from '@/views/navbar/NavBarBase'

export default {
	name: 'App',
	components: {
		NavBarBase,
		Snackbar: () => import('@/components/utils/Snackbar'),
		DialogTable: () => import('@/components/utils/DialogTable'),
	},
	async created() {
		await this.$store.dispatch('timelineResource/get')
		await this.$store.dispatch('countsResource/get')
		await this.$store.dispatch('countriesResource/get')
		this.$store.dispatch('mainResource/set')
	},
}
</script>

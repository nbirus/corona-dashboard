<template>
	<v-app>
		<!-- page view -->
		<transition name="page" mode="out-in">
			<v-content v-if="!loading">
				<router-view :key="$route.name" />
			</v-content>
		</transition>

		<div class="loader" v-if="loading">
			<spinner></spinner>
		</div>

		<!-- global components -->
		<!-- <snackbar /> -->
	</v-app>
</template>

<script>
import NavBarBase from '@/views/navbar/NavBarBase'
import { requestResource } from '@/services/RequestService'

export default {
	name: 'App',
	components: {
		NavBarBase,
		Snackbar: () => import('@/components/utils/Snackbar'),
	},
	async created() {
		let totals = await requestResource('totals')
		let locations = await requestResource('locations')
		let response = await new Promise(resolve => {
			const dataWorker = new Worker('./workers/data.js', { type: 'module' })
			dataWorker.postMessage({ totals, locations })
			dataWorker.onmessage = e => resolve(e.data)
		})
		this.$store.dispatch('data/set', response)
		this.loading = false
	},
	data() {
		return {
			loading: true,
		}
	},
}
</script>

<style lang="scss" scoped>
.loader {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background: white;

	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
<template>
	<v-app ref="app">
		<img class="wave" src="wave.svg" />
		<!-- <img class="wave wave-2" src="wave-2.svg" /> -->
		<!-- <img class="wave wave-3" src="wave-3.svg" /> -->
		<!-- nav bar -->
		<app-nav-bar />

		<!-- page view -->
		<transition name="page" mode="out-in">
			<v-content>
				<router-view :key="$route.name" />
			</v-content>
		</transition>
	</v-app>
</template>

<script>
import { requestResource } from '@/services/RequestService'
import AppNavBar from '@/views/navbar/NavBarBase'
let dataWorker

export default {
	name: 'App',
	components: {
		AppNavBar,
	},
	async created() {
		let countries = await requestResource('countries')
		let history = await requestResource('history')
		let jhucsse = await requestResource('jhucsse')

		// format response
		let response = await new Promise(resolve => {
			dataWorker = new Worker('./workers/data.js', { type: 'module' })
			dataWorker.postMessage({ countries, history, jhucsse })
			dataWorker.onmessage = e => resolve(e.data)
		})
		dataWorker.terminate()

		this.$store.dispatch('data/set', response)
		this.$store.dispatch('data/setLoading', false)
	},
}
</script>

<style lang="scss" scoped>
.loader {
	z-index: 3;
}
.wave {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	width: 100vw;
	opacity: 0.025;
}
.nav {
	box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
	background-color: #fff;
	display: flex;
	flex-direction: column;
	align-items: stretch;
	justify-content: stretch;
	z-index: 99999;

	&__title {
		text-align: center;
		padding: 2.25rem 1rem 1rem;

		p {
			margin: 0;
			font-size: 1.1rem;
		}
	}
	&__controllers {
		display: flex;
		align-items: center;
		padding: 1rem 1.5rem;
	}
	&__country {
		margin-right: 2rem;
	}
	&__timeline {
		padding: 0;
	}
}
@media screen and (min-width: 480px) {
	.sticky {
		.nav__controllers {
			box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
			background-color: #fff;
			position: fixed;
			top: 0;
			right: 0;
			left: 0;
			height: 88px;
		}
		.page {
			margin-top: 88px !important;
		}
	}
}
@media screen and (max-width: 480px) {
	.nav {
		&__title {
			padding: 2rem 2rem 1rem;
		}
		&__controllers {
			flex-direction: column;
			align-items: stretch;
			padding: 0;
		}

		&__country {
			margin-right: 0;
			padding: 1rem 1.5rem 0.5rem;
		}
		&__timeline {
			padding: 0.75rem 1rem;
		}
	}
	.sticky {
		.nav__timeline {
			box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
			background-color: #fff;
			position: fixed;
			top: 0;
			right: 0;
			left: 0;
			height: 78px;
		}
		.page {
			margin-top: 78px !important;
		}
	}
}

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

.pagea {
	height: 150vh;
}
</style>

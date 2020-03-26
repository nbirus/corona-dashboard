<template>
	<v-app ref="app">
		<div class="nav" ref="nav">
			<div class="nav__title">
				<h1>Covid-19 Dashboard</h1>
				<p>A collection of analytics about the recent Covid-19 outbreak</p>
			</div>
			<div class="nav__controllers">
				<!-- country -->
				<country-controller class="nav__country" />

				<!-- timleine -->
				<timeline-controller ref="timeline" class="nav__timeline" />
			</div>
		</div>

		<!-- page view -->
		<transition name="page" mode="out-in">
			<v-content v-if="!loading">
				<router-view :key="$route.name" />
			</v-content>
		</transition>

		<!-- <div class="loader" v-if="loading">
			<spinner></spinner>
		</div>-->
	</v-app>
</template>

<script>
import { requestResource } from '@/services/RequestService'
import TimelineController from '@/components/timeline/TimelineController'
import CountryController from '@/components/country/CountryController'

export default {
	name: 'App',
	components: {
		TimelineController,
		CountryController,
	},
	async created() {
		// let totals = await requestResource('totals')
		// let countries = await requestResource('countries')
		// let history = await requestResource('history')
		// // format response
		// let response = await new Promise(resolve => {
		// 	const dataWorker = new Worker('./workers/data.js', { type: 'module' })
		// 	dataWorker.postMessage({ totals, countries, history })
		// 	dataWorker.onmessage = e => resolve(e.data)
		// })
		// this.$store.dispatch('data/set', response)
		this.loading = false
	},
	mounted() {
		let app = this.$refs.app.$el
		let header = this.$refs.timeline.$el
		let sticky = header.offsetTop
		window.onscroll = () => {
			if (window.pageYOffset > sticky) {
				app.classList.add('sticky')
			} else {
				app.classList.remove('sticky')
			}
		}
	},
	data() {
		return {
			loading: true,
		}
	},
}
</script>

<style lang="scss" scoped>
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

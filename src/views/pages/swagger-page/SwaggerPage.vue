<template>
	<div class="page max">
		<h3 class="mb-5">API Documentation</h3>
		<hr class="mb-5" />
		<v-layout class="swagger__loading" align-center justify-center v-if="loading">
			<v-progress-circular color="primary" indeterminate :size="52" :width="3" />
		</v-layout>
		<div ref="swagger" class="swagger-page"></div>
	</div>
</template>

<script>
/* eslint-disable */
import { request } from '@/services/RequestService'

const swaggerConfig = {
	endpoint: '/doc',
}

export default {
	name: 'swagger-page',
	async mounted() {
		try {
			await getSwaggerScripts()
			this.$nextTick(this.generateUI)
		} catch (e) {
			console.log(e)
		}
	},
	data() {
		return {
			loading: true,
		}
	},
	methods: {
		async generateUI() {
			try {
				const json = await request(swaggerConfig)
				const token = await this.$sm.auth.getAccessToken()
				const baseURL = process.env.VUE_APP_PROJECT_BASE_API

				json.data.host = process.env.VUE_APP_OKTA_REDIRECT_URI
				json.data.servers = [
					{
						url: baseURL.substring(0, baseURL.length - 1),
						variables: {},
					},
				]

				console.log(json.data)

				this.loading = false

				SwaggerUIBundle({
					spec: json.data,
					domNode: this.$refs.swagger,
					// defaultModelsExpandDepth: -1,
					presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
					requestInterceptor(request) {
						if (!request.url.includes('github')) {
							request.headers.Authorization = `Bearer ${token.accessToken}`
							request.url = `${baseURL}${request.url.split('/v1/')[1]}`
						}
						return request
					},
					plugins: [SwaggerUIBundle.plugins.DownloadUrl],
					layout: 'StandaloneLayout',
				})
			} catch (error) {
				console.log(error)
			}
		},
	},
}

// swagger utils
const swaggerUI = 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.23.11/swagger-ui-bundle.js'
const swaggerPreset =
	'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.23.11/swagger-ui-standalone-preset.js'
const swaggerCSS = 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.23.11/swagger-ui.css'

function getSwaggerScripts() {
	return new Promise(resolve => {
		getScript(swaggerUI).then(() => {
			getStyle(swaggerCSS).then(() => {
				getScript(swaggerPreset).then(resolve)
			})
		})
	})
}
function getScript(src) {
	return new Promise(resolve => {
		let script = document.createElement('script')
		script.onload = () => {
			resolve()
		}
		script.async = true
		script.src = src
		document.head.appendChild(script)
	})
}
function getStyle(src) {
	return new Promise(resolve => {
		let script = document.createElement('link')
		script.onload = () => {
			resolve()
		}
		script.async = true
		script.href = src
		script.type = 'text/css'
		script.rel = 'stylesheet'
		document.head.appendChild(script)
	})
}
/* eslint-enable */
</script>

<style lang="scss">
.page {
	.topbar,
	.information-container,
	.scheme-container {
		display: none;
	}

	.swagger-page .wrapper > section {
		padding-left: 0;
		padding-right: 0;
	}

	.swagger-ui .wrapper {
		padding: 0;
	}
}
.swagger__loading {
	min-height: 70vh;
}
</style>

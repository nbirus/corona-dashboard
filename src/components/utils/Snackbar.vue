<template>
	<v-snackbar
		class="snackbar"
		v-model="open"
		:timeout="options.timeout"
		:color="options.color"
		:vertical="options.vertical"
		:multi-line="options.multiLine"
		:left="options.position.includes('left')"
		:right="options.position.includes('right')"
		:bottom="options.position.includes('bottom')"
		:top="options.position.includes('top')"
	>
		<!-- snackbar message -->
		<span v-html="options.message" />

		<!-- close button -->
		<v-btn icon color="white" @click="open = false" v-if="!options.persist && !options.textButton">
			<v-icon size="20">mdi-close</v-icon>
		</v-btn>
		<v-btn text @click="open = false" v-else-if="!options.persist">close</v-btn>
	</v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'global-snackbar',
	data() {
		return {
			open: false,
		}
	},
	computed: mapGetters('snackbar', ['options']),
	watch: {
		// reset snackbar when options are updated
		options: {
			handler(options) {
				this.open = false
				this.$nextTick(() => {
					this.open = this.$h.exists(options.message)
				})
			},
			deep: true,
		},
		$route(route) {
			if (route.name !== 'login') {
				this.$store.dispatch('snackbar/clear')
			}
		},
	},
}
</script>

<style lang="scss">
.v-snack__wrapper {
	position: relative;
	overflow: hidden;

	span a {
		color: white !important;
		font-weight: $bold;
	}
}
.snackbar-progress {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 3px;
}
.snackbar-progress-bar {
	width: 100%;
}
</style>

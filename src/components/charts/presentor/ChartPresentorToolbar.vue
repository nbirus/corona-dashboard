<template>
	<transition name="chart-toolbar" mode="out-in">
		<v-layout v-if="state$.expand" align-center class="toolbar">
			<!-- header -->
			<v-layout align-center class="toolbar__title">
				<h6 class="white--text bold" v-text="title"></h6>
				<div class="toolbar__count body-2" v-if="!$h.exists(chartState.error)">
					<spinner v-if="chartState.loading" size="30" width="5" />
					<span v-else>
						<strong>{{ chartState.total }}</strong>
						{{ dataLabel || 'items' }}
					</span>
				</div>
				<v-tooltip top v-if="description">
					<template v-slot:activator="{ on }">
						<v-icon color="white" size="16" class="ml-4" v-on="on">fa-question-circle</v-icon>
					</template>
					<span v-html="description"></span>
				</v-tooltip>
			</v-layout>

			<v-flex></v-flex>

			<transition name="chart-toolbar-buttons" mode="out-in">
				<!-- settings buttons -->
				<!-- <v-layout align-center justify-end v-if="state$.settings" key="settings">
					<v-btn class="chart-presentor__toolbar-button" text @click="toggleSettings">
						Close Editor
						<v-icon size="14" right>fa-chevron-right</v-icon>
					</v-btn>
				</v-layout>-->

				<!-- screenshot buttons -->
				<v-layout align-center justify-end v-if="state$.screenshot" key="screenshot">
					<v-btn color="grey darken-3" class="mr-4" @click="resetResize">
						<v-icon color="white" small left>fa-undo</v-icon>Reset
					</v-btn>
					<v-btn class="mr-4" width="225" color="success darken-1" @click="setScreenshotModal">
						<v-icon small left>fa-download</v-icon>download chart
					</v-btn>
					<v-btn class="toolbar__button" color="white" text @click="toggleScreenshot">
						<v-icon small left>fa-ban</v-icon>cancel
					</v-btn>
				</v-layout>

				<!-- main buttons -->
				<v-layout align-center justify-end v-else key="main">
					<v-btn class="mr-4" color="grey darken-3" @click="toggleScreenshot">
						<v-icon small left>fa-download</v-icon>download
					</v-btn>
					<v-btn class="mr-4" color="grey darken-3" @click="toggleSettings">
						<v-icon small left>fa-cog</v-icon>settings
					</v-btn>
					<v-btn color="white" text @click="toggleExpand">
						<v-icon small left>fa-times</v-icon>Close
					</v-btn>
				</v-layout>
			</transition>
		</v-layout>
	</transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'chart-presentor-toolbar',
	props: ['title', 'dataLabel', 'description'],
	computed: {
		...mapGetters('presentor', ['state$', 'chartState']),
	},
	methods: {
		...mapActions('presentor', [
			'toggleExpand',
			'toggleSettings',
			'toggleScreenshot',
			'setScreenshotModal',
			'resetResize',
		]),
	},
}
</script>

<style lang="scss" scoped>
.toolbar {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: 70px;
	padding: 0 1.5rem;
	z-index: 10;
	overflow: hidden;
	box-shadow: 0 0 20px fade-out(black, 0.6);
	background-color: color(grey-darken4);
	// background-color: #fff;
	will-change: padding;

	&__title {
		h6 {
			font-size: 1.1rem;
		}
	}
	&__count {
		position: relative;
		margin-left: 1rem;
		background-color: fade-out(black, 0.7);
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		color: white;
	}
}
</style>

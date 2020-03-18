<template>
	<div class="chart-presentor" :class="state$">
		<!-- body -->
		<chart-presentor-body
			:attrs="$attrs"
			v-bind="{ id, type, title }"
			@change="$emit('change', $event)"
		/>
		<!-- toolbar -->
		<chart-presentor-toolbar v-bind="{ title, description, dataLabel }" />
		<!-- settings -->
		<chart-presentor-form :attrs="$attrs" v-bind="{ id, type }" />
		<!-- screenshot modal -->
		<chart-presentor-screenshot v-bind="{ id, title }" />

		<!-- link used for download -->
		<a id="screenshot-link"></a>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import ChartPresentorScreenshot from './ChartPresentorScreenshot'
import ChartPresentorToolbar from './ChartPresentorToolbar'
import ChartPresentorForm from './ChartPresentorForm'
import ChartPresentorBody from './ChartPresentorBody'

export default {
	name: 'chart-presentor',
	inheritAttrs: false,
	components: {
		ChartPresentorToolbar,
		ChartPresentorBody,
		ChartPresentorForm,
		ChartPresentorScreenshot,
	},
	props: {
		type: String,
		id: String,
		title: String,
		description: String,
		dataLabel: String,
	},
	computed: {
		...mapGetters('presentor', ['state$']),
	},
}
</script>

<style lang="scss">
.chart-presentor {
	height: 100%;
	width: 100%;
}
</style>

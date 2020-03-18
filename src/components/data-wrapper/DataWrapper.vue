<template functional>
	<!-- eslint-disable -->
	<component
		:is="
			data.attrs.resource
				? injections.components.AsyncDataWrapper
				: injections.components.LocalDataWrapper
		"
		v-bind="data.attrs"
		v-slot="{ _state, _refresh }"
		v-on="{
			resolve: listeners.resolve ? listeners.resolve : () => {},
			reject: listeners.reject ? listeners.reject : () => {},
			request: listeners.request ? listeners.request : () => {},
			params: listeners.params ? listeners.params : () => {},
		}"
	>
		<slot :_state="_state" :_refresh="_refresh"></slot>
	</component>
</template>

<script>
import LocalDataWrapper from './LocalDataWrapper'
import AsyncDataWrapper from './AsyncDataWrapper'

export default {
	inheritAttrs: false,
	inject: {
		components: {
			default: {
				LocalDataWrapper,
				AsyncDataWrapper,
			},
		},
	},
}
</script>

// ignore-coverage

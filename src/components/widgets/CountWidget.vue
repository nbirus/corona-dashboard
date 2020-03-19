<template>
	<v-card class="count-widget">
		<state-handler v-bind="{ loading, error }">
			<!-- widget -->
			<v-layout class="count-widget__container" column align-center justify-center>
				<v-avatar color="secondary lighten-5" size="65" class="mb-5">
					<v-icon>fa-user</v-icon>
				</v-avatar>
				<h1>{{ count | localeString }}</h1>
				<label class="text-secondary">{{ label }}</label>
			</v-layout>
		</state-handler>
	</v-card>
</template>

<script>
export default {
	name: 'count-widget',
	inheritAttrs: false,
	props: {
		loading: Boolean,
		error: String,
		count: Number,
		label: String,
		img: String,
	},
	computed: {
		total() {
			return 0
		},
	},
}
</script>

<style lang="scss">
.count-widget {
	min-height: 250px;

	&__container {
		height: 100%;
	}
}
</style>

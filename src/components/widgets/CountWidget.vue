<template>
	<v-card class="count-widget">
		<state-handler v-bind="{ loading, error }">
			<!-- widget -->
			<v-layout class="count-widget__container" column align-center justify-center>
				<v-avatar :color="color" size="85" class="mb-3">
					<!-- <v-icon>fa-user</v-icon> -->
				</v-avatar>
				<h1>{{ count | localeString }}</h1>
				<label class="text-secondary">{{ label }}</label>

				<span class="count-widget__banner body-2 text-secondary"
					>{{ countToday | localeString }} TODAY</span
				>
			</v-layout>
		</state-handler>
	</v-card>
</template>

<script>
export default {
	name: 'count-widget',
	inheritAttrs: false,
	props: {
		data: Object,
		loading: Boolean,
		id: String,
		color: String,
		error: [String, Error],
		label: String,
		img: String,
	},
	computed: {
		count() {
			return this.$h.get(this.data, `totals.${this.id}`, 0)
		},
		countToday() {
			return this.$h.get(this.data, `today.${this.id}`, 0)
		},
	},
}
</script>

<style lang="scss">
.count-widget {
	min-height: 275px;

	&__container {
		height: 100%;
		margin-top: -1rem;
	}
	&__banner {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 0.5rem 1rem;
		background-color: fade-out(black, 0.95);
		color: var(--v-secondary-lighten1);
		text-align: center;
	}
}
</style>

<template>
	<div class="page page-dashboard">
		<data-wrapper resource="counts" persist v-slot="{ _state }">
			<v-layout class="page-dashboard__counts" justify-space-between>
				<count-widget
					label="cases"
					v-bind="_state"
					:count="$h.get(_state, 'data.cases')"
				></count-widget>
				<count-widget
					label="deaths"
					v-bind="_state"
					:count="$h.get(_state, 'data.deaths')"
				></count-widget>
				<count-widget
					label="recovered"
					v-bind="_state"
					:count="$h.get(_state, 'data.recovered')"
				></count-widget>
			</v-layout>
		</data-wrapper>
	</div>
</template>

<script>
import CountWidget from '@/components/widgets/CountWidget'
export default {
	name: 'dashboard-page',
	components: { CountWidget },
}
</script>

<style lang="scss">
.page-dashboard {
	&__counts {
		max-width: 700px;

		.count-widget {
			width: 100%;

			&:not(:last-child) {
				margin-right: 2rem;
			}
		}
	}
}
</style>

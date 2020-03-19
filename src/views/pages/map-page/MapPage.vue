<template>
	<div class="page page-map">
		<data-accessor resource="countriesResource" v-slot="{ _state }">
			<world-map v-if="!_state.loading" :value="$h.get(_state, 'data.data', [])" />
			<!-- <state-handler v-bind="_state">
			</state-handler> -->
		</data-accessor>
	</div>
</template>

<script>
import WorldMap from '@/components/map/WorldMap'

export default {
	name: 'map-page',
	components: { WorldMap },
}
</script>

<style lang="scss" scoped>
.map-dashboard {
}
</style>

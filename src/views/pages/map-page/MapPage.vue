<template>
	<div class="page page-map no-padding">
		<data-accessor resourceAccessor="countriesResource" v-slot="{ _state }">
			<!-- <state-handler v-bind="_state">
			</state-handler>-->
		</data-accessor>
	</div>
</template>

<script>
export default {
	name: 'map-page',
}
</script>

<style lang="scss" scoped>
.map-dashboard {
}
</style>

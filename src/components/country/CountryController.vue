<template>
	<v-select outlined hide-details :items="items" :value="activeCountry" />
</template>

<script>
export default {
	name: 'country-controller',
	data() {
		return {
			activeCountry: 'world',
			items: [{ text: 'World', value: 'world' }],
		}
	},
}
</script>

<style>
</style>
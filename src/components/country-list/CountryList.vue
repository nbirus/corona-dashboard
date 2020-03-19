<template>
	<ul class="v-card white country-list">
		<country-list-item v-for="(item, i) in items" :key="i" v-bind="item" />
	</ul>
</template>

<script>
import CountryListItem from '@/components/country-list/CountryListItem'

export default {
	name: 'country-list',
	components: { CountryListItem },
	props: ['items'],
}
</script>

<style lang="scss" scoped>
.country-list {
	margin: 0 !important;
	padding: 0 !important;
}
</style>

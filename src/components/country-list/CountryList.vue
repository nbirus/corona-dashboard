<template>
	<v-card class="country-list-card">
		<state-handler v-bind="{ loading }">
			<ul class="country-list">
				<country-list-item v-for="(item, i) in items" :key="i" v-bind="item" />
			</ul>
		</state-handler>
	</v-card>
</template>

<script>
import CountryListItem from '@/components/country-list/CountryListItem'

export default {
	name: 'country-list',
	components: { CountryListItem },
	props: ['items', 'loading'],
}
</script>

<style lang="scss" scoped>
.country-list {
	margin: 0 !important;
	padding: 0 !important;
}
.country-list-card {
	min-height: 300px;
}
</style>

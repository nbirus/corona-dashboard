<template>
	<v-simple-table>
		<template v-slot:default>
			<tbody>
				<tr v-for="(item, index) in filteredItems" :key="index">
					<td>
						<b>{{ item.label }}</b>
					</td>
					<td class="user-select">{{ item.value }}</td>
				</tr>
			</tbody>
		</template>
	</v-simple-table>
</template>

<script>
export default {
	name: 'table-list',
	props: {
		items: {
			type: Array,
			default: () => [],
		},
	},
	computed: {
		filteredItems() {
			return this.items.filter(item => this.$h.exists(item.value))
		},
	},
}
</script>

<style>
.user-select {
	user-select: all;
}
</style>

<template>
	<v-dialog :value="open" @click:outside="close">
		<v-card v-if="open">
			<data-table-wrapper class="row-pad" v-if="!mixed" v-bind="props" />
			<mixed-data-table-wrapper class="row-pad" v-else v-bind="props" />
		</v-card>
	</v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
	name: 'dialog-table',
	components: {
		DataTableWrapper: () => import('@/components/table/wrappers/DataTableWrapper'),
		MixedDataTableWrapper: () => import('@/components/table/wrappers/MixedDataTableWrapper'),
	},
	computed: mapGetters('dialogTable', ['open', 'props', 'mixed']),
	methods: mapActions('dialogTable', ['close']),
	watch: { $route: 'close' },
}
</script>

<template>
	<v-input class="v-checkboxes" v-bind="$attrs">
		<v-checkbox
			class="v-checkboxes__checkbox"
			v-for="(item, index) in items"
			:key="index"
			v-bind="[$attrs, item]"
			v-model="$value"
		/>
	</v-input>
</template>

<script>
import FieldMixin from '@/mixins/FieldMixin'

export default {
	name: 'radio',
	mixins: [FieldMixin],
	props: ['items'],
}
</script>

<style lang="scss">
.v-checkboxes {
	padding-top: 12px;
	margin-top: 4px;

	.v-input__slot {
		flex-direction: column;
		align-items: flex-start;
	}
}
.v-checkboxes__checkbox > .v-input__control .v-input__slot {
	flex-direction: row;
	margin-bottom: 0;
}
.v-checkboxes__checkbox:not(:nth-child(2)) {
	margin-top: 0;
}
</style>

<template>
	<v-radio-group v-model="$value" v-bind="$attrs">
		<v-radio v-for="(item, index) in items" :key="index" v-bind="item" />
	</v-radio-group>
</template>

<script>
import FieldMixin from '@/mixins/FieldMixin'

export default {
	name: 'radio',
	mixins: [FieldMixin],
	props: ['items'],
}
</script>

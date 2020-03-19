<template>
	<v-combobox
		ref="input"
		class="keyword-field"
		:id="id"
		v-model="$value"
		v-bind="$attrs"
		v-on="$listeners"
		:menu-props="{ contentClass: 'keyword-field__menu', maxHeight: 220, nudgeBottom: 5 }"
		:items="items"
	>
		<template v-slot:item="{ item }">
			<v-list-item-action @click.stop>
				<v-layout>
					<v-flex grow>{{ item }}</v-flex>
				</v-layout>
			</v-list-item-action>
		</template>
	</v-combobox>
</template>

<script>
import FieldMixin from '@/mixins/FieldMixin'
import CountryItems from '@/assets/CountryItems.json'

export default {
	name: 'radio',
	mixins: [FieldMixin],
	props: {
		id: String,
		persist: Boolean,
		length: {
			type: Number,
			default: 6,
		},
	},
	data() {
		return {
			items: CountryItems,
		}
	},
	mounted() {
		// hide dropdown icon
		const icon = this.$refs.input.$el.querySelector('.v-icon')
		icon.style.display = 'none'
	},
}
</script>
<style lang="scss">
.keyword-field {
	&__menu {
		.v-list-item__action {
			width: 100%;
			margin-left: 0 !important;
			margin-right: 0 !important;
			pointer-events: none;
		}
		.remove-button {
			z-index: 99;
			pointer-events: auto;
		}
	}
}
</style>

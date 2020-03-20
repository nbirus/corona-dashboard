<template>
	<v-combobox
		ref="input"
		class="keyword-field"
		:id="id"
		v-model="$value"
		v-bind="$attrs"
		v-on="$listeners"
		:menu-props="{ contentClass: 'keyword-field__menu', maxHeight: 600, nudgeBottom: 10 }"
		:items="displayItems"
		@change="onChange"
	>
		<template v-slot:item="{ item }">
			<v-list-item-action @click.stop>
				<v-layout>
					<v-flex grow>{{ item }}</v-flex>
					<v-flex shrink>
						<v-hover v-slot:default="{ hover }">
							<v-btn
								class="remove-button"
								icon
								small
								:color="hover ? 'red' : 'grey'"
								@click.stop.prevent="onRemove(item)"
							>
								<v-icon size="14">mdi-close</v-icon>
							</v-btn>
						</v-hover>
					</v-flex>
				</v-layout>
			</v-list-item-action>
		</template>
	</v-combobox>
</template>

<script>
import FieldMixin from '@/mixins/FieldMixin'

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
			items: [],
		}
	},
	computed: {
		displayItems() {
			return this.$h
				.cloneDeep(this.items)
				.reverse()
				.splice(0, this.length)
		},
	},
	mounted() {
		// hide dropdown icon
		const icon = this.$refs.input.$el.querySelector('.v-icon')
		icon.style.display = 'none'

		// get persisted fields
		if (this.persist) {
			this.items = this.$store.getters['keyword/get'](this.id)
		}
	},
	methods: {
		onChange(item) {
			// hide dropdown
			this.$refs.input.blur()

			// add items to the list
			if (item && !this.items.includes(item)) {
				this.items.push(item)
			}
		},
		onRemove(item) {
			const itemIndex = this.items.indexOf(item)
			if (item && itemIndex !== -1) {
				this.items.splice(itemIndex, 1)
			}
		},
	},
	watch: {
		items: {
			handler(items) {
				if (this.persist) {
					let id = this.id
					this.$store.dispatch('keyword/set', { id, items })
				}
			},
			deep: true,
		},
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

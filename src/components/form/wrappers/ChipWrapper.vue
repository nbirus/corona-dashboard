<template>
	<v-menu
		bottom
		origin="center center"
		transition="scale-transition"
		:close-on-content-click="false"
		v-model="open"
	>
		<!-- pill button -->
		<template v-slot:activator="{ on }">
			<div :class="`v-chip-form-layout__button-wrapper ${formId}-activator`">
				<v-btn
					class="v-chip-form-layout__button mr-3"
					depressed
					rounded
					:color="active ? 'primary' : ''"
					v-on="on"
					v-html="label"
				/>
			</div>
		</template>

		<!-- input slot -->
		<v-card width="350px">
			<div class="px-5 pt-2">
				<slot />
			</div>
			<v-card-actions>
				<div class="flex-grow-1"></div>
				<v-btn text @click="clear">Clear</v-btn>
				<v-btn text @click="open = false" color="primary">Ok</v-btn>
			</v-card-actions>
		</v-card>
	</v-menu>
</template>

<script>
export default {
	name: 'menu-wrapper',
	inheritAttrs: false,
	props: {
		formId: String,
		fieldId: String,
		label: String,
		active: Boolean,
		resetField: Function,
	},
	data() {
		return {
			open: false,
		}
	},
	methods: {
		clear() {
			this.resetField(this.fieldId)
			this.open = false
		},
	},
	watch: {
		open(open) {
			if (open) {
				setTimeout(() => {
					let field = document.querySelector(
						`.v-text-field__slot #${this.formId}-${this.fieldId}-wrapper`
					)
					if (this.$h.exists(field)) {
						field.focus()
					}
				}, 100) // set focus after transition compeletes
			}
		},
	},
}
</script>

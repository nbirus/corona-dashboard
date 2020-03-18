<template>
	<div class="v-chip-form-layout" ref="container">
		<!-- chip form -->
		<form-builder
			class="v-chip-form-layout__form"
			v-bind="[$attrs]"
			:form="chipForm"
			:key="chipKey"
			:active-fields.sync="activeFields"
			v-on="$listeners"
		/>
		<v-btn
			class="v-chip-form-layout__button show mr-3"
			:class="{ active: activeFields.length }"
			depressed
			rounded
			@click="aside = true"
		>
			ALL FILTERS
			<span v-if="activeFields.length">({{ activeFields.length }})</span>
		</v-btn>

		<!-- aside filters -->
		<v-navigation-drawer
			class="v-chip-form-layout__drawer"
			v-model="aside"
			fixed
			temporary
			right
			width="350"
		>
			<div class="header pa-5 pb-0 d-flex">
				<div class="title">Filter Samples</div>
				<v-spacer></v-spacer>
				<v-btn depressed rounded @click="aside = false">
					Close
				</v-btn>
			</div>

			<v-divider class="my-4" />

			<!-- aside form -->
			<form-builder
				class="px-5 py-3"
				v-bind="[$attrs]"
				:form="form"
				:key="asideKey"
				persist
				submit-on-change
				v-on="$listeners"
			/>
		</v-navigation-drawer>
	</div>
</template>

<script>
import FormBuilder from '@/components/form/FormBuilder'

export default {
	name: 'chip-form-layout',
	components: { FormBuilder },
	props: ['form'],
	data() {
		return {
			aside: false,
			chipForm: {},
			activeFields: [],
			intersectedFields: [],
			chipKey: 0,
			asideKey: 0,
		}
	},
	created() {
		this.addChipWrapper()
	},
	mounted() {
		this.observeChips()
	},
	methods: {
		addChipWrapper() {
			let form = this.$h.cloneDeep(this.form)
			form.schema.forEach(field => (field.wrapper = 'chip'))
			this.chipForm = form
		},
		observeChips() {
			// create observer
			let observer = new IntersectionObserver(this.onIntersect, {
				root: this.$refs.container,
				rootMargin: '0px -325px 0px 0px',
			})

			// watch all form buttons
			document.querySelectorAll(`.${this.$attrs.id}-activator`).forEach(activator => {
				observer.observe(activator)
			})
		},
		onIntersect(entries) {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.remove('hide')
				} else {
					entry.target.classList.add('hide')
				}
			})
		},
	},
	watch: {
		aside(aside) {
			if (aside) {
				this.asideKey++
			} else {
				this.chipKey++
				this.$nextTick(this.observeChips)
			}
		},
	},
}
</script>

<style lang="scss">
.hide-test {
	opacity: 0;
	position: absolute;
	pointer-events: none;
}

.v-chip-form-layout {
	display: flex;

	&__form {
		display: flex;
		justify-content: flex-start;
	}

	&__button-wrapper {
		&.hide {
			.v-chip-form-layout__button {
				opacity: 0;
				position: absolute;
				pointer-events: none;
			}
		}
	}
}
</style>

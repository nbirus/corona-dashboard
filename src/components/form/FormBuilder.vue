<template>
	<v-form ref="form" v-model="valid" :id="id" lazy-validation>
		<!-- eslint-disable vue/no-use-v-if-with-v-for -->

		<!-- wrapper -->
		<component
			v-for="field in schema"
			:key="`${id}-${field.id}-wrapper`"
			:class="{ 'd-none': $h.exists(field.show) ? !field.show : false }"
			:is="`${field.wrapper || 'default'}-wrapper`"
			:form-id="id"
			:field-id="field.id"
			:active="activeFields.includes(field.id)"
			v-bind="{
				...field.props,
				...field.wrapperProps,
				resetField,
			}"
		>
			<!-- field -->
			<component
				:is="fieldNameMap[field.type]"
				:id="`${id}-${field.id}-input`"
				:key="`${id}-${field.id}-input`"
				:class="{ 'd-none': $h.exists(field.show) ? !field.show : false }"
				:value="get(model, field.id)"
				@input="onFieldChange(field, $event)"
				@change="onFieldChange(field, $event)"
				v-bind="field.props"
				:dark="dark"
				:color="color"
				:rules="!allowRules ? [] : bindRules(field.props.rules)"
			/>
		</component>
	</v-form>
</template>

<script>
import { Fields, fieldNameMap } from './fields'
import Wrappers from './wrappers'
import cloneDeep from 'lodash/cloneDeep'
import debounce from 'lodash/debounce'
import intersection from 'lodash/intersection'
import isEqual from 'lodash/isEqual'
import set from 'lodash/set'
import get from 'lodash/get'
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'form-builder',
	components: { ...Fields, ...Wrappers },
	model: {
		event: 'change',
	},
	props: {
		id: {
			type: String,
			required: true,
		},
		form: {
			type: Object,
			required: true,
			validator(v) {
				if (intersection(Object.keys(v), ['model', 'schema']).length !== 2) {
					// eslint-disable-next-line no-console
					console.warn(`The form must include both a model and a schema`)
					return false
				}
				return true
			},
		},
		value: {
			type: Object,
			default: () => ({}),
		},
		activeFields: {
			type: Array,
			default: () => [],
		},
		submitOnChange: Boolean,
		validateOnChange: Boolean,
		dark: Boolean,
		color: String,
		validateOnSubmit: {
			type: Boolean,
			default: true,
		},
		isFormValid: Boolean,
		persist: Boolean,
	},
	data() {
		return {
			fieldNameMap,
			valid: false,
			schema: [],
			model: {},
			onSubmit: undefined,
			onChange: undefined,
			transform: undefined,
			dChange: undefined,
			hasSubmitted: false,
		}
	},
	computed: {
		...mapGetters('form', ['getModel']),
		allowRules() {
			return this.validateOnChange || (this.validateOnSubmit && this.hasSubmitted)
		},
	},
	created() {
		// debounce change
		this.dChange = debounce(this.triggerChange, 250)

		// setup form data
		const form = this.$h.cloneDeep(this.form)
		this.schema = form.schema
		this.model = this.persist ? this.getModel(this.id, form.model) : form.model
		this.onSubmit = this.$h.get(this.form, 'onSubmit', model => model)
		this.onChange = this.$h.get(this.form, 'onChange', () => {})
	},
	methods: {
		...mapActions('form', ['setModel', 'clearForms']),
		get,
		set,

		// methods
		submit() {
			this.hasSubmitted = true
			this.$nextTick(this.triggerSubmit)
		},
		reset() {
			this.triggerReset()
		},
		resetValidation() {
			this.hasSubmitted = false
			this.$refs.form.resetValidation()
		},

		// events
		onFieldChange(field, newValue) {
			const oldValue = get(this.model, field.id)

			if (!isEqual(newValue, oldValue)) {
				// set value in model
				set(this.model, field.id, newValue)

				// call specific onChange if has handler
				if (field.hasOwnProperty('onChange')) {
					field.onChange.call(this.getChangeBinds(), newValue, oldValue)
				}
			}
		},

		// actions
		triggerSubmit() {
			if (this.$refs.form && this.$refs.form.validate()) {
				// get model, id, and formatted model
				const id = this.id
				const model = cloneDeep(this.model)
				const formattedModel = this.onSubmit.call(this.getChangeBinds(), model)

				// submit change
				this.$emit('submit', formattedModel)

				// commit unformatted model to store
				if (this.persist) {
					this.setModel({ id, model })
				}
			}
		},
		triggerReset() {
			this.resetValidation()
			set(this, 'model', this.$h.cloneDeep(this.form).model)
		},
		triggerChange(model) {
			// emit change
			this.$emit('change', model)

			// update active fields
			this.checkActiveFields()

			// call form onChange
			this.onChange.call(this.getChangeBinds())

			// submit result
			if (this.submitOnChange) {
				this.$nextTick(this.triggerSubmit)
			}
		},

		// utils
		getField(id) {
			return this.schema.find(field => field.id === id) || {}
		},
		resetField(id) {
			if (this.model.hasOwnProperty(id)) {
				set(this.model, id, this.$h.get(this.form, `model.${id}`))
			}
		},
		setFieldValue(id, value) {
			if (this.model.hasOwnProperty(id)) {
				set(this.model, id, value)
			}
		},
		setFieldProperty(id, property, value) {
			set(this.getField(id), property, value)
		},

		// other
		checkActiveFields() {
			// loop over each id and check if the value is active
			// if there is a custom `isActive` hook, use it
			const activeFields = Object.keys(this.model).filter(id => {
				const field = this.getField(id)
				const value = this.model[id]

				// use custom hook if avaliable
				if (field.hasOwnProperty('isActive')) {
					return field.isActive.call(this.getChangeBinds(), value)
				}

				// return true if value exists
				return this.$h.exists(value)
			})

			this.$emit('update:activeFields', activeFields)
		},
		bindHook(hook, field) {
			return hook.call({
				field,
				value: this.model[field.id],
				model: this.model,
				schema: this.schema,
			})
		},
		getChangeBinds() {
			return {
				setFieldProperty: this.setFieldProperty,
				setFieldValue: this.setFieldValue,
				resetField: this.resetField,
				getField: this.getField,
				schema: cloneDeep(this.schema),
				model: cloneDeep(this.model),
			}
		},
		bindRules(rules) {
			if (rules) {
				return rules.map(rule => {
					return rule.bind({
						model: cloneDeep(this.model),
					})
				})
			} else return undefined
		},
	},
	watch: {
		model: {
			handler(model) {
				this.dChange(cloneDeep(model))
			},
			deep: true,
			immediate: false,
		},
		value: {
			handler(value) {
				// update model if differs
				if (!isEqual(value, this.model)) {
					this.model = {
						...this.model,
						...cloneDeep(value),
					}
				}
			},
			deep: true,
		},
		valid: {
			handler(valid) {
				this.$emit('update:isFormValid', valid)
			},
			immediate: true,
		},
	},
}
</script>

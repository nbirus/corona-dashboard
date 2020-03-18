import { required, maxLength, minLength } from './validations'

// define the fields (required)
const schema = [
	{
		id: 'text',
		type: 'text',
		show: true,
		props: {
			label: 'Text',
			disabled: false,
			rules: [required],
		},
		onChange(value, oldValue) {
			console.log(value, oldValue)
			/*
        Expose relavent fields through 'this'
        console.log(this) => { model, schema, setFieldValue, resetField, getField, setFieldProperty }
      */
		},
	},
	{
		id: 'textarea',
		type: 'textarea',
		props: {
			label: 'Textarea',
		},
	},
	{
		id: 'select',
		type: 'select',
		props: {
			label: 'Select',
			items: [
				{ text: '1', value: 1 },
				{ text: '2', value: 2 },
			],
		},
	},
	{
		id: 'checkboxes',
		type: 'checkboxes',
		props: {
			label: 'Checkboxes',
			items: [
				{ label: '1', value: 1 },
				{ label: '2', value: 2 },
				{ label: '3', value: 3 },
				{ label: '4', value: 4 },
			],
		},
	},
	{
		id: 'radio',
		type: 'radio',
		props: {
			label: 'Radio',
			items: [
				{ label: '1', value: 1 },
				{ label: '2', value: 2 },
			],
		},
	},
	{
		id: 'switch',
		type: 'switch',
		props: {
			label: 'Switch',
		},
		isActive(value) {
			return value
		},
	},
	{
		id: 'validation',
		type: 'text',
		props: {
			label: 'Validation',
			rules: [
				required,
				maxLength(10),
				minLength(2),
				// email,
			],
		},
	},
	{
		id: 'date',
		type: 'date',
		props: {
			label: 'Date Picker',
		},
	},
	{
		id: 'custom-active',
		type: 'text',
		props: {
			label: 'Custom Active',
		},
		isActive(value) {
			/*
        Returns a boolean, is field active or not
        Expose relavent fields through 'this'
        console.log(this) => { model, schema, setFieldValue, resetField, getField, setFieldProperty }
      */
			return value.length
		},
	},
]

// set default values (required)
const model = {
	text: '',
	textarea: '',
	radio: 1,
	checkboxes: [],
	select: undefined,
	checkbox: false,
	switch: false,
	date: undefined,
	validation: 'test',
	'custom-active': '',
}

// transform the object as needed before submitting
function onSubmit(model) {
	/*
    Expose relavent fields through 'this'
    console.log(this) => { model, schema, setFieldValue, resetField, getField, setFieldProperty }
  */

	return model
}

// call on change
function onChange() {
	/*
    Expose relavent fields and actions through 'this'
    console.log(this) => { model, schema, setFieldValue, resetField, getField, setFieldProperty }
  */

	// set value of field
	this.setFieldValue('select', 1)

	// disable the 'text' field based on the 'textarea' value
	this.setFieldProperty('text', 'props.disabled', this.model.textarea !== '')

	// hide the 'select' field based on the 'textarea' value
	this.setFieldProperty('select', 'show', this.model.textarea === '')
}

export default {
	onSubmit,
	onChange,
	schema,
	model,
}

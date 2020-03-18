import { maxLength } from './validations'

// define the fields (required)
const schema = [
	{
		id: 'title',
		type: 'text',
		props: {
			label: 'Title',
			rules: [maxLength(50)],
		},
	},
	{
		id: 'subTitle',
		type: 'text',
		props: {
			label: 'Subtitle',
			disabled: false,
			rules: [maxLength(50)],
		},
	},
	{
		id: 'scale',
		type: 'slider',
		props: {
			label: 'Pie Scale',
			min: 1,
			max: 100,
			step: 1,
			thumbLabel: true,
			hideDetails: true,
		},
	},
	{
		id: 'labelSize',
		type: 'slider',
		props: {
			label: 'Label Size',
			min: 6,
			max: 22,
			step: 1,
			thumbLabel: true,
			hideDetails: true,
		},
	},
	{
		id: 'abbreviateLabels',
		type: 'text',
		props: {
			type: 'number',
			step: 1,
			label: 'Abbreviate Labels',
		},
	},
	{
		id: 'sortData',
		type: 'switch',
		props: {
			label: 'Sort',
			color: 'dark',
			hideDetails: true,
		},
	},
	{
		id: 'donut',
		type: 'switch',
		props: {
			label: 'Donut',
			hideDetails: true,
			color: 'dark',
		},
	},
	{
		id: 'legend',
		type: 'switch',
		props: {
			label: 'Legend/Key',
			color: 'dark',
		},
	},
	{
		id: 'labelPosition',
		type: 'select',
		props: {
			label: 'Label Position',
			items: [
				{ text: 'Outside', value: 'outside' },
				{ text: 'Inside', value: 'inside' },
			],
		},
	},
	{
		id: 'color',
		type: 'color',
	},
]

// set default values (required)
const model = {
	title: '',
	subTitle: '',
	labelPosition: 'outside',
	donut: false,
	legend: false,
	sortData: false,
	scale: 75,
	abbreviateLabels: undefined,
	labelSize: '12',
	color: '',
}

// transform the object as needed before submitting
function onSubmit(model) {
	model.scale = parseInt(model.scale)
	model.abbreviateLabels = parseInt(model.abbreviateLabels)
	return model
}

// call on change
function onChange() {
	// disable subtitle if title is not available
	this.setFieldProperty('subTitle', 'props.disabled', this.model.title === '')
}

export default {
	onSubmit,
	onChange,
	schema,
	model,
}

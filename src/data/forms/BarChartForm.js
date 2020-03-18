import { maxLength } from './validations'

// define the fields (required)
const schema = [
	// {
	// 	id: 'titleStyle',
	// 	type: 'textStyle',
	// 	props: {
	// 		label: 'Title',
	// 	},
	// },
	// {
	// 	id: 'title',
	// 	type: 'text',
	// 	props: {
	// 		label: 'Title',
	// 		counter: 50,
	// 		maxLength: 50,
	// 		rules: [maxLength(50)],
	// 	},
	// },
	// {
	// 	id: 'titleSize',
	// 	type: 'text',
	// 	props: {
	// 		type: 'number',
	// 		step: 1,
	// 		label: 'Title Size',
	// 	},
	// },
	// {
	// 	id: 'subTitle',
	// 	type: 'text',
	// 	props: {
	// 		label: 'Subtitle',
	// 		disabled: false,
	// 		counter: 50,
	// 		maxLength: 50,
	// 		rules: [maxLength(50)],
	// 	},
	// },
	// {
	// 	id: 'subTitleSize',
	// 	type: 'text',
	// 	props: {
	// 		type: 'number',
	// 		step: 1,
	// 		label: 'Sub Title Size',
	// 	},
	// },
	{
		id: 'xAxisLabel',
		type: 'text',
		props: {
			label: 'X Axis Label',
			counter: 50,
			maxLength: 50,
			rules: [maxLength(50)],
		},
	},
	{
		id: 'yAxisLabel',
		type: 'text',
		props: {
			label: 'Y Axis Label',
			counter: 50,
			maxLength: 50,
			rules: [maxLength(50)],
		},
	},
	{
		id: 'interval',
		type: 'text',
		props: {
			type: 'number',
			step: 5,
			label: 'Interval',
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
		id: 'dataZoomX',
		type: 'switch',
		props: {
			label: 'Show X Axis Data Zoom',
			color: 'dark',
			hideDetails: true,
		},
	},
	{
		id: 'dataZoomY',
		type: 'switch',
		props: {
			label: 'Show Y Axis Data Zoom',
			color: 'dark',
			hideDetails: true,
		},
	},
	{
		id: 'hideAxisLines',
		type: 'switch',
		props: {
			label: 'Hide Axis Lines',
			color: 'dark',
			hideDetails: true,
		},
	},
	{
		id: 'hideIntervalLines',
		type: 'switch',
		props: {
			label: 'Hide Interval Lines',
			color: 'dark',
			hideDetails: true,
		},
	},
	{
		id: 'hideIntervalTicks',
		type: 'switch',
		props: {
			label: 'Hide Interval Ticks',
			color: 'dark',
			hideDetails: true,
		},
	},
	{
		id: 'hideBarShadows',
		type: 'switch',
		props: {
			label: 'Hide Bar Shadows',
			color: 'dark',
			hideDetails: true,
		},
	},
	{
		id: 'log',
		type: 'switch',
		props: {
			label: 'Scale Logarithmically',
			color: 'dark',
		},
	},
	{
		id: 'color',
		type: 'color',
	},
]

// set default values (required)
const model = {
	titleStyle: {
		title: '',
		titleSize: 20,
		lineHeight: 20,
		fontWeight: 'bold',
		fontStyle: 'normal',
	},
	subTitle: '',
	subTitleSize: 16,
	xAxisLabel: '',
	yAxisLabel: '',
	dataZoomX: false,
	dataZoomY: false,
	hideAxisLines: false,
	hideIntervalLines: false,
	hideIntervalTicks: false,
	hideBarShadows: false,
	log: false,
	sortData: false,
	interval: undefined,
	abbreviateLabels: undefined,
	color: '',
}

// transform the object as needed before submitting
function onSubmit(model) {
	model.interval = parseInt(model.interval)
	model.abbreviateLabels = parseInt(model.abbreviateLabels)
	model = {
		...model,
		...spread(model.titleStyle, 'title'),
	}

	return model
}

function spread(model, key) {
	return {
		[key]: model.title,
		[`${key}Size`]: parseInt(model.titleSize),
		[`${key}LineHeight`]: parseInt(model.titleSize),
		[`${key}FontWeight`]: model.fontWeight,
		[`${key}FontStyle`]: model.fontStyle,
	}
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

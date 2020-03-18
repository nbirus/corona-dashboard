// code split fields
export const Fields = {
	// vuetify fields
	VTextField: () => import('vuetify/lib/components/VTextField'),
	VTextarea: () => import('vuetify/lib/components/VTextarea'),
	VSelect: () => import('vuetify/lib/components/VSelect'),
	VCheckbox: () => import('vuetify/lib/components/VCheckbox'),
	VSwitch: () => import('vuetify/lib/components/VSwitch'),
	VSlider: () => import('vuetify/lib/components/VSlider'),

	// custom fields
	RadioField: () => import('./RadioField'),
	CheckboxesField: () => import('./CheckboxesField'),
	DatePickerField: () => import('./DatePickerField'),
	ColorPickerField: () => import('./ColorPickerField'),
	TextStyleField: () => import('./TextStyleField'),
}

// set ids
export const fieldNameMap = {
	text: 'v-text-field',
	textarea: 'v-textarea',
	select: 'v-select',
	checkbox: 'v-checkbox',
	switch: 'v-switch',
	slider: 'v-slider',

	checkboxes: 'checkboxes-field',
	radio: 'radio-field',
	date: 'date-picker-field',
	color: 'color-picker-field',
	textStyle: 'text-style-field',
}

import { exists } from '@/services/UtilsService'

const ERROR_TEMPLATES = {
	required: 'This field is required',
	email: 'Must be a valid email',
	maxLength: max => `Must be less than ${max} characters`,
	minLength: min => `Must be longer than ${min} characters`,
}

export function required(val) {
	return exists(val) || ERROR_TEMPLATES.required
}

export function maxLength(max = 10) {
	return value => (value ? value.length < max : true) || ERROR_TEMPLATES.maxLength(max)
}

export function minLength(min = 10) {
	return value => (value ? value.length > min : false) || ERROR_TEMPLATES.minLength(min)
}

export function email(value) {
	// eslint-disable-next-line
	const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
	return re.test(value) || ERROR_TEMPLATES.email
}

export function specialRequired(val) {
	return exists(val) || ERROR_TEMPLATES.required
}

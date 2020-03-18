import t from 'typy'
import { exists } from './UtilsService'
import get from 'lodash/get'
import camelCaseLodash from 'lodash/camelCase'
import dayjs from 'dayjs'
import pluralize from 'pluralize'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

/**
 * 1000 -> '1,000'
 * @param {number} value
 */
export function localeString(value) {
	return exists(value) && t(value).isNumber ? value.toLocaleString() : value
}

/**
 * 'test string' -> 'Test String'
 * @param {string} value
 */
export function titleCase(value) {
	return validString(value)
		? value.replace(/\w\S*/g, txt => `${txt.charAt(0).toUpperCase()}${txt.substr(1).toLowerCase()}`)
		: value
}

/**
 * 'test_string' -> 'title string'
 * @param {string} value
 */
export function replaceUnderscores(value) {
	return validString(value) ? value.replace(/_/g, ' ') : value
}

/**
 * 'test-string' -> 'title string'
 * @param {string} value
 */
export function replaceDashes(value) {
	return validString(value) ? value.replace(/-/g, ' ') : value
}

/**
 * 'test string' -> 'TEST STRING'
 * @param {string} value
 */
export function upperCase(value) {
	return validString(value) ? value.toUpperCase() : value
}

/**
 * 'TEST STRING' -> 'test string'
 * @param {string} value
 */
export function lowerCase(value) {
	return validString(value) ? value.toLowerCase() : value
}

/**
 * 'test-string' -> 'testString'
 * @param {string} value
 */
export function camelCase(value) {
	return validString(value) ? camelCaseLodash(value) : value
}

/**
 * 'test-string' -> 'TestString'
 * @param {string} value
 */
export function kebabToUpperCase(value) {
	return validString(value)
		? `${camelCase(value)
				.charAt(0)
				.toUpperCase()}${camelCase(value).slice(1)}`
		: value
}

/**
 * [1, 2, 3] -> '1, 2, 3'
 * @param {array} value
 */
export function arrayToString(value) {
	return t(value).isArray && !t(value).isEmptyArray ? value.join(', ') : value
}

/**
 * [{test: 'test'}, ...] -> 'test, ...'
 * @param {array} value
 * @param {string} path
 */
export function objectArrayToString(value, path = 'value') {
	return t(value).isArray && !t(value).isEmptyArray
		? value.map(item => get(item, path)).join(', ')
		: value
}

/**
 * true -> 'Yes'
 * @param {any} value
 */
export function toYesNo(value) {
	return exists(value) ? 'Yes' : 'No'
}

/**
 * 'test string' -> 'test str...'
 * @param {string} value
 * @param {number} length
 */
export function abbreviate(value, length = 10) {
	return validString(value) && value.length > length ? `${value.substr(0, length)}...` : value
}

/**
 * 'date' -> 'formatted date.'
 * @param {string} value
 */
export function date(value, format = 'MMMM DD, YYYY hh:mm A') {
	let newDate = dayjs(value).format(format)
	return newDate === 'Invalid Date' ? value : newDate
}

/**
 * 'date' -> 'formatted date.'
 * @param {string} value
 */
export function timeAgo(value) {
	if (exists(value)) {
		let newValue = dayjs().to(dayjs(value))
		return newValue === 'Invalid Date' ? value : newValue
	} else {
		return value
	}
}

/**
 * 'date' -> 'formatted date.'
 * @param {string} value
 */
export function highlight(words, query) {
	return words.replace(query, '<span class="h--word">' + query + '</span>')
}

/**
 * 'word' -> 'words'
 * @param {string} word
 */
export function plural(word) {
	return pluralize(word)
}

// helper
function validString(value) {
	return exists(value) && t(value).isString
}

import t from 'typy'
import camelCase from 'lodash/camelCase'

/**
 * Check to see if a variable is `exists'
 * @param {any} data
 */
export function exists(data) {
	const check = t(data)
	return !(
		check.isNullOrUndefined ||
		check.isEmptyString ||
		check.isEmptyArray ||
		check.isUndefined ||
		check.isEmptyObject
	)
}

/**
 * Compares a search term against an array of strings
 * Use with `.filter()` array function
 * @param {string} search
 */
export function searchFilter(search) {
	return value => {
		return (
			value
				.toString()
				.toLowerCase()
				.search(search.toLowerCase()) !== -1 && value !== search
		)
	}
}

/**
 * Takes in a string and search
 * @param {string} word
 * @param {string} query
 */
export function highlightSearch(word, query) {
	if (t(word).isString && t(query).isString) {
		let reg = new RegExp(query, 'gi')
		return word.replace(reg, str => `<span class="highlight-search">${str}</span>`)
	}
	return word
}

export function camelCaseKeys(object) {
	let camelCaseObject = {}
	for (let key in object) {
		camelCaseObject[camelCase(key)] = object[key]
	}
	return camelCaseObject
}

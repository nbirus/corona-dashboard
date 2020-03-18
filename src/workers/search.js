/* eslint-disable */
import t from 'typy'
import get from 'lodash/get'

// param keys to ignore when searching
const ignoreParams = ['include', 'size', 'from', 'to', 'sort', 'order']

// param keys to custom compare
const customCompare = {
  example(a, b) {
    return a === b
  }
}

/* istanbul ignore next */
addEventListener('message', e => {
  const { data, params } = e.data
  postMessage(searchObject(data, params))
})


/**
 * search object with params object
 * @param {array} data data that will be searched
 * @param {object} params key value pairs of search terms
 */
export function searchObject(data, params = {}) {

  // compress search keys, get rid of special keys and move _keyword to the front of the array
  let paramsKeys = Object
    .keys(params)
    .filter(param => !ignoreParams.includes(param) && params[param])
    .sort((a, b) => (b === '_keyword') - (a === '_keyword'))

  return paramsKeys.length > 0
    ? data.filter(filterRow) 
    : data

  function filterRow(row) {
    let matchFound = false

    // loop over each search key and check for a match
    for (const key of paramsKeys) {

      // exit loop if match found
      if (matchFound) {
        break
      }

      // keyword search, skip specific key search
      if (key === '_keyword') {
        matchFound = Object.keys(row).some(rowKey => compare(params['_keyword'], row[rowKey]))
        continue
      }

      // get the paramater value and the value in the row, get custom compare function if available
      let paramValue = get(params, key)
      let rowValue = get(row, key)
      let compareFunction = get(customCompare, key, compare)

      if (exists(paramValue) && exists(rowValue)) {
        matchFound = compareFunction(paramValue, rowValue)
      }
    }

    return matchFound

  }
}

function compare(a, b) {
  let aType = t(a)
  let bType = t(b)

  // string
  if (aType.isString) {
    if (bType.isObject) {
      return fuzyCompare(a.toString(), JSON.stringify(Object.values(b)))
    }
    return fuzyCompare(a, bType.isString ? b : JSON.stringify(b))
  }
  // numbers
  else if (aType.isNumber) {
    if (bType.isNumber) {
      return defaultCompare(a, b)
    }
    else if (bType.isString) { 
      return fuzyCompare(a.toString(), b.toString())
    }
    else if (bType.isArray) { 
      return fuzyCompare(a.toString(), JSON.stringify(b))
    }
    else if (bType.isObject) {
      return fuzyCompare(a.toString(), JSON.stringify(Object.values(b)))
    }
    return false
  }
  // booleans
  else if (aType.isBoolean) {
    if (bType.isString) {
      return defaultCompare(a.toString(), b)
    }
    else if (bType.isArray) {
      return fuzyCompare(a.toString(), JSON.stringify(b))
    }
    else if (bType.isObject) {
      return fuzyCompare(a.toString(), JSON.stringify(Object.values(b)))
    }

    return defaultCompare(a, b)
  }
  // array
  else if (aType.isArray) {
    return a.some(aValue => compare(aValue, b))
  }
  // object
  else if (aType.isObject) {
    return false
  }
}
function defaultCompare(a, b) {
  return a === b
}
function fuzyCompare(a, b) {
  return b.toLowerCase().search(a.toLowerCase()) !== -1
}
function exists(value) {
	const check = t(value)
	return !(
		check.isNullOrUndefined ||
		check.isEmptyString ||
		check.isEmptyArray ||
		check.isUndefined ||
		check.isEmptyObject
	)
}
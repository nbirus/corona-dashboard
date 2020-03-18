import t from 'typy'
import cloneDeep from 'lodash/cloneDeep'

// format certin row data before sort
const specialFormat = {
  example: value => value
}

/* istanbul ignore next */
addEventListener('message', e => {
  const { data, params } = e.data
  postMessage(sortObject(cloneDeep(data), params))
})


/**
 * sort data
 * @param {array} data data that will be sorted
 * @param {object} sort 
 * @param {string} sort.key key which you'd like to have sorted
 * @param {boolean} sort.desc order in which it will be sorted
 */
export function sortObject(data, sort = {}) {
  if (data && sort && sort.key && sort.desc !== undefined) {

    // create list of keys to format
    const specialKeys = Object.keys(specialFormat)

    // sort data
    data.sort((a, b) => {
      const aValue = specialKeys.includes(sort.key) ? specialFormat[sort.key](a[sort.key]) : a[sort.key]
      const bValue = specialKeys.includes(sort.key) ? specialFormat[sort.key](b[sort.key]) : b[sort.key]
      const aType = t(aValue)
      const bType = t(bValue)

      // check for existance
      if (aType.isNullOrUndefined || bType.isNullOrUndefined) {
        return false
      }

      // number compare
      if (aType.isNumber && bType.isNumber) {
        return bValue - aValue
      }
      
      // default compare
      return bValue.localeCompare(aValue, undefined, {
        numeric: true,
        sensitivity: 'base',
      })
    })
  }

  // reverse if desc
  if (sort.desc === true) {
    data.reverse()
  }

  return data
}
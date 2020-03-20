import get from 'lodash/get'
import cloneDeep from 'lodash/cloneDeep'

/**
 * web worker event listener
 */
/* istanbul ignore next */
addEventListener('message', e => {
  const { data, params } = e.data
  postMessage(paginateObject(data, params))
})

export function paginateObject(data, pagination) {
  const from = get(pagination, 'from', 0)
  const size = get(pagination, 'size', 10000)
  const total = data.length

  if (Array.isArray(data)) {
    return {
      data: cloneDeep(data).splice(from, size),
      total,
    }
  }
  else {
    return {
      data,
      total: -1,
    }
  }
}

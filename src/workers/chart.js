import cloneDeep from 'lodash/cloneDeep'
const formatMap = { pie, bar }

/**
 * web worker event listener
 */
/* istanbul ignore next */
addEventListener('message', e => {
  const { data, type } = e.data
  postMessage(formatChartData(cloneDeep(data), type))
})

/**
 * Select correct function and format data by chart type
 */
export function formatChartData(data, type = 'bar') {
  return formatMap[type](data)
}

/**
 * Bar chart formatting
 */
function bar(data) {
  return data
}

/**
 * Pie chart formatting
 */
function pie(data) {
  return data
}

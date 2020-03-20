import cloneDeep from 'lodash/cloneDeep'
import set from 'lodash/set'
import get from 'lodash/get'
import dayjs from 'dayjs'
const formatMap = { pie, bar, line, country }

const blue = 'rgba(33,150,243, 0.15)'
const blueBorder = 'rgba(33,150,243, 1)'

const red = 'rgba(244,67,53, 0.3)'
const redBorder = 'rgba(244,67,53, 1)'

const green = 'rgba(76,175,80, 0.2)'
const greenBorder = 'rgba(76,175,80, 1)'

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
function country(data) {
  const casesDataSet = {
    label: 'Confirmed',
    data: [],
    backgroundColor: [blue],
    borderColor: [blueBorder],
    pointBackgroundColor: blueBorder,
    pointBorderColor: blueBorder,
    pointBorderWidth: 1,
    borderWidth: 2,
    order: 3,
  }
  const deathDataSet = {
    label: 'Deaths',
    data: [],
    backgroundColor: [red],
    borderColor: [redBorder],
    pointBackgroundColor: redBorder,
    pointBorderColor: redBorder,
    pointBorderWidth: 1,
    order: 1,
  }
  const recoveredDataSet = {
    label: 'Recovered',
    data: [],
    backgroundColor: [green],
    borderColor: [greenBorder],
    pointBackgroundColor: greenBorder,
    pointBorderColor: greenBorder,
    pointBorderWidth: 1,
    order: 2,
  }
  const dates = []

  data.forEach((day, i) => {
    set(casesDataSet, `data.${i}`, day.confirmed)
    set(deathDataSet, `data.${i}`, day.deaths)
    set(recoveredDataSet, `data.${i}`, day.recovered)
    set(dates, i, dayjs(day.date).format('MMM DD'))
  })

  return {
    datasets: [casesDataSet, deathDataSet, recoveredDataSet],
    labels: dates,
  }
}

/**
 * Bar chart formatting
 */
function line(data) {
  
  
  const casesDataSet = {
    label: 'Confirmed',
    data: [],
    backgroundColor: [blue],
    borderColor: [blueBorder],
    pointBackgroundColor: blueBorder,
    pointBorderColor: blueBorder,
    pointBorderWidth: 1,
    borderWidth: 2,
    order: 3,
  }
  const deathDataSet = {
    label: 'Deaths',
    data: [],
    backgroundColor: [red],
    borderColor: [redBorder],
    pointBackgroundColor: redBorder,
    pointBorderColor: redBorder,
    pointBorderWidth: 1,
    order: 1,
  }
  const recoveredDataSet = {
    label: 'Recovered',
    data: [],
    backgroundColor: [green],
    borderColor: [greenBorder],
    pointBackgroundColor: greenBorder,
    pointBorderColor: greenBorder,
    pointBorderWidth: 1,
    order: 2,
  }
  const dates = []

  Object.keys(data).forEach(countryName => {
    data[countryName].forEach((country, i) => {

      let currentConfirmedCount = get(casesDataSet, `data.${i}`, 0)
      let currentDeathCount = get(deathDataSet, `data.${i}`, 0)
      let currentRecoveredCount = get(recoveredDataSet, `data.${i}`, 0)

      set(casesDataSet, `data.${i}`, currentConfirmedCount + country.confirmed)
      set(deathDataSet, `data.${i}`, currentDeathCount + country.deaths)
      set(recoveredDataSet, `data.${i}`, currentRecoveredCount + country.recovered)

      if (dates[i] === undefined) {
        set(dates, i, dayjs(country.date).format('MMM DD'))
      }
    })
  })

  return {
    datasets: [casesDataSet, deathDataSet, recoveredDataSet],
    labels: dates,
  }
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

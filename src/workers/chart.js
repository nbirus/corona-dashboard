import cloneDeep from 'lodash/cloneDeep'
import get from 'lodash/get'

const formatMap = {
  pie,
  bar,
  line,
  country,
  linedeaths,
  linedeathsmap,
  linecases,
  linecasesmap,
}

const blue = 'rgba(218,235,249, 1)'
const blueBorder = 'rgba(33,150,243, 1)'

const red = 'rgba(252,198,194, 1)'
const redBorder = 'rgba(244,67,53, 1)'

const green = 'rgba(219,239,220, 1)'
const greenBorder = 'rgba(76,175,80, 1)'

/**
 * web worker event listener
 */
/* istanbul ignore next */
addEventListener('message', e => {
  const {
    data,
    type
  } = e.data
  postMessage(formatChartData(cloneDeep(data), type))
})

/**
 * Select correct function and format data by chart type
 */
export function formatChartData(data, type = 'bar') {
  return formatMap[type](data)
}

/**
 * Line chart formatting
 */
function line(data) {
  let cases = {
    ...casesDataSet,
    data: data.cases,
  }
  let deaths = {
    ...deathsDataSet,
    data: data.deaths,
  }
  return {
    datasets: [cases, deaths],
    labels: data.dates,
  }
}

function country(data) {
  let cases = {
    ...casesDataSet,
    data: data.data.cases,
  }
  let deaths = {
    ...deathsDataSet,
    data: data.data.deaths,
  }

  return {
    datasets: [cases, deaths],
    labels: data.dates,
  }
}

let daysAgo = 40

function linecasesmap(data) {
  return formatLineData(data, casesDataSet, 380, {
    pointRadius: 0,
    borderWidth: 0,
  })
}

function linedeathsmap(data) {
  return formatLineData(data, deathsDataSet, 380, {
    pointRadius: 0,
    borderWidth: 0,
  })
}

function linecases(data) {
  return formatLineData(data, casesDataSet)
}

function linedeaths(data) {
  return formatLineData(data, deathsDataSet)
}

function linerecovered(data) {
  return formatLineData(data, recoveredDataSet)
}

// extra data
const casesDataSet = {
  label: 'Cases',
  data: [],
  backgroundColor: [blue],
  borderColor: [blueBorder],
  pointBackgroundColor: 'white',
  pointBorderColor: blueBorder,
  pointBorderWidth: 1,
  pointRadius: 2,
  borderWidth: 1,
  order: 3,
}
const deathsDataSet = {
  label: 'Deaths',
  data: [],
  backgroundColor: [red],
  borderColor: [redBorder],
  pointBackgroundColor: 'white',
  pointBorderColor: redBorder,
  pointBorderWidth: 1,
  pointRadius: 2,
  borderWidth: 1,
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
  pointRadius: 2,
  borderWidth: 1,
  order: 2,
}

function formatLineData(data, dataset, ago = daysAgo, extra = {}) {
  let length = data.dates.length
  let modifiedDataset = {
    ...dataset,
    pointRadius: 3,
    borderWidth: 1,
    ...extra,
    data: data.data.splice(length - ago, length - 1).filter((d, i) => i % 3 === 0),
  }
  return {
    datasets: [modifiedDataset],
    labels: data.dates.splice(length - ago, length - 1).filter((d, i) => i % 3 === 0),
  }
}

/**
 * Bar chart formatting
 */
function bar(response) {
  const limit = 2000
  const data = Object.values(response.map)
  const countries = []
  const casesPerOneMillion = []
  const deathsPerOneMillion = []


  data.sort((a, b) => get(b, 'totals.casesPerOneMillion', 0) - get(a, 'totals.casesPerOneMillion', 0)).forEach(country => {
    if (get(country, 'totals.cases', 0) > limit) {
      countries.push(country.info.name)
      casesPerOneMillion.push(country.totals.casesPerOneMillion)
      deathsPerOneMillion.push(country.totals.deathsPerOneMillion)
    }
  })

  const deathDataSet = {
    label: 'Deaths Per Million',
    backgroundColor: red,
    borderColor: redBorder,
    borderWidth: 1,
    data: deathsPerOneMillion,
  }
  const caseDataSet = {
    label: 'Cases Per Million',
    data: casesPerOneMillion,
    backgroundColor: blue,
    borderColor: blueBorder,
    borderWidth: 1,
  }

  return {
    datasets: [deathDataSet, caseDataSet],
    labels: countries,
  }
}

/**
 * Pie chart formatting
 */
function pie(data) {
  return data
}
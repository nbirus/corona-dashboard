import cloneDeep from 'lodash/cloneDeep'

const formatMap = {
  pie,
  bar,
  line,
  country,
  linedeaths,
  linerecovered,
  linecases,
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
  // let recovered = {
  //   ...recoveredDataSet,
  //   data: data.recovered,
  // }

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

let daysAgo = 14

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
  pointBackgroundColor: blueBorder,
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
  pointBackgroundColor: redBorder,
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

function formatLineData(data, dataset) {
  let length = data.dates.length
  let modifiedDataset = {
    ...dataset,
    pointRadius: 0,
    borderWidth: 0,
    data: data.data.splice(length - daysAgo, length - 1),
  }
  return {
    datasets: [modifiedDataset],
    labels: data.dates.splice(length - daysAgo, length - 1),
  }
}

/**
 * Bar chart formatting
 */
function bar(response) {
  const limit = 2000
  const data = Object.values(response)
  const countries = []
  const casesPerOneMillion = []
  const deathsPerOneMillion = []

  data.sort((a, b) => b.casesPerOneMillion - a.casesPerOneMillion).forEach(country => {
    if (country.cases > limit) {
      countries.push(country.country)
      casesPerOneMillion.push(country.casesPerOneMillion)
      deathsPerOneMillion.push(country.deathsPerOneMillion)
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
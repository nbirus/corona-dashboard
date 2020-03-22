import get from 'lodash/get'
import set from 'lodash/set'
import dayjs from 'dayjs'

/* istanbul ignore next */
addEventListener('message', e => {
  const {
    totals,
    countries,
    history,
  } = e.data
  postMessage(format(totals.data, countries.data, history.data))
})

export function format(totalsData, countries, history) {
  let updated = dayjs(new Date(totalsData.updated))
  let countryMap = {}
  let totals = {
    ...totalsData,
    active: 0,
    critical: 0,
    casesPerOneMillion: 0,
  }
  let today = {
    cases: 0,
    deaths: 0,
    recovered: 0,
  }
  let countryMax = {
    cases: 0,
    deaths: 0,
    recovered: 0,
  }
  let timeline = {
    cases: [],
    deaths: [],
    recovered: [],
    dates: Object.keys(get(history, '0.timeline.cases', {})).map(date => {
      return dayjs(date).format('MMM D')
    }),
  }

  // loop over each location
  history.forEach(country => {

    // get timeline
    let casesTimeline = Object.values(get(country, 'timeline.cases', [])).map(n => Number.parseInt(n))
    let deathsTimeline = Object.values(get(country, 'timeline.deaths', [])).map(n => Number.parseInt(n))
    let recoveredTimeline = Object.values(get(country, 'timeline.recovered', [])).map(n => Number.parseInt(n))

    // get today's count
    today.cases += casesTimeline[casesTimeline.length - 1]
    today.deaths += deathsTimeline[deathsTimeline.length - 1]
    today.recovered += recoveredTimeline[recoveredTimeline.length - 1]

    // loop over each day in a country
    timeline.dates.forEach((date, index) => {
      set(timeline.cases, index, get(timeline.cases, index, 0) + casesTimeline[index])
      set(timeline.deaths, index, get(timeline.deaths, index, 0) + deathsTimeline[index])
      set(timeline.recovered, index, get(timeline.recovered, index, 0) + recoveredTimeline[index])
    })
  })

  // loop over countries
  countries.forEach(country => {

    // set totals
    totals.active += country.active
    totals.critical += country.critical
    totals.casesPerOneMillion += country.casesPerOneMillion

    if (countryMax.cases < country.cases) {
      countryMax.cases = country.cases
    }
    if (countryMax.deaths < country.deaths) {
      countryMax.deaths = country.deaths
    }
    if (countryMax.recovered < country.recovered) {
      countryMax.recovered = country.recovered
    }

    countryMap[country.country] = country
  })

  // set totals
  today.cases = totalsData.cases - today.cases
  today.deaths = totalsData.deaths - today.deaths
  today.recovered = totalsData.recovered - today.recovered

  return {
    updated,
    totals,
    today,
    timeline,
    countries: {
      list: countryMap,
      max: countryMax,
    },
  }
}
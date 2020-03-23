import get from 'lodash/get'
import set from 'lodash/set'
import dayjs from 'dayjs'
import Countries from '@/assets/Countries.json'

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

  let ok = []

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

    let id = getCountryId(country.country)
    if (id !== undefined) {
      countryMap[id] = country
      countryMap[id].timeline = {
        cases: [],
        deaths: [],
        recovered: [],
      }
    }

  })

  // loop over each location
  history.forEach(country => {

    // get timeline
    let casesTimeline = Object.values(get(country, 'timeline.cases', [])).map(n => Number.parseInt(n))
    let deathsTimeline = Object.values(get(country, 'timeline.deaths', [])).map(n => Number.parseInt(n))
    let recoveredTimeline = Object.values(get(country, 'timeline.recovered', [])).map(n => Number.parseInt(n))

    // add timeline to country object
    let id = getCountryId(country.country)

    if (id !== undefined && countryMap[id] !== undefined) {
      let t = countryMap[id].timeline
      countryMap[id].timeline = {
        cases: casesTimeline.map((c, i) => get(t, i, 0) + c),
        deaths: deathsTimeline.map((c, i) => get(t, i, 0) + c),
        recovered: recoveredTimeline.map((c, i) => get(t, i, 0) + c),
      }
    }

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

  // set totals
  today.cases = totalsData.cases - today.cases
  today.deaths = totalsData.deaths - today.deaths
  today.recovered = totalsData.recovered - today.recovered

  return {
    updated,
    totals,
    today,
    timeline,
    countries: countryMap,
  }
}


function getCountryId(label = '') {
  let code
  Countries.features.forEach(country => {
    if (country.properties.name.toLowerCase() === label.toLowerCase()) {
      code = country.code
    }
  })
  return code
}

// let test = ["", "", "Czechia", "Diamond Princess", "Singapore", "Bahrain", "Hong Kong", "", "San Marino", "", "", "Faeroe Islands", "Andorra", "Réunion", "Palestine", "Guadeloupe", "Liechtenstein", "Martinique", "Channel Islands", "DRC", "Mauritius", "Guam", "Monaco", "Macao", "French Polynesia", "Gibraltar", "Barbados", "Maldives", "Tanzania", "Mayotte", "Aruba", "Seychelles", "U.S. Virgin Islands", "Isle of Man", "Saint Martin", "Bahamas", "Eswatini", "Cayman Islands", "Curaçao", "Cabo Verde", "CAR", "Congo", "St. Barth", "Saint Lucia", "Antigua and Barbuda", "Dominica", "Grenada", "Vatican City", "Montserrat", "St. Vincent Grenadines", "Sint Maarten", "Timor-Leste"]
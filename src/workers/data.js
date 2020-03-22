import get from 'lodash/get'
import set from 'lodash/set'
import dayjs from 'dayjs'

/* istanbul ignore next */
addEventListener('message', e => {
  const {
    totals,
    locations,
  } = e.data
  postMessage(format(totals.data, locations.data))
})


export function format(totals, locationData) {
  let today = {
    confirmed: 0,
    deaths: 0,
    recovered: 0,
  }
  let timeline = {
    confirmed: [],
    deaths: [],
    recovered: [],
    dates: Object.keys(get(locationData, '0.timelines.confirmed.timeline', {})).map(date => {
      return dayjs(date).format('MMM DD')
    }),
  }
  let countries = {}

  // loop over each location
  locationData.forEach(location => {

    // set today'stotals
    today.confirmed += get(location, 'latest.confirmed', 0)
    today.deaths += get(location, 'latest.deaths', 0)
    today.recovered += get(location, 'latest.recovered', 0)

    // get timeline
    let confirmedTimeline = Object.values(get(location, 'timelines.confirmed.timeline', []))
    let deathsTimeline = Object.values(get(location, 'timelines.deaths.timeline', []))
    let recoveredTimeline = Object.values(get(location, 'timelines.recovered.timeline', []))


    // loop over each day in a country
    timeline.dates.forEach((date, index) => {
      set(timeline.confirmed, index, get(timeline.confirmed, index, 0) + confirmedTimeline[index])
      set(timeline.deaths, index, get(timeline.deaths, index, 0) + deathsTimeline[index])
      set(timeline.recovered, index, get(timeline.recovered, index, 0) + recoveredTimeline[index])
    })

    // set country 
    countries[location.country_code] = {
      ...location,
      totals: location.latest,
      timelines: {
        confirmed: confirmedTimeline,
        deaths: deathsTimeline,
        recovered: recoveredTimeline,
        dates: timeline.dates,
      },
    }

  })

  // calculate today's counts
  today.confirmed = totals.confirmed - today.confirmed
  today.deaths = totals.deaths - today.deaths
  today.recovered = totals.recovered - today.recovered

  return {
    totals,
    today,
    timeline,
    countries,
  }
}
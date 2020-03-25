import get from 'lodash/get'
import set from 'lodash/set'
import dayjs from 'dayjs'

/* istanbul ignore next */
addEventListener('message',  e => {
  const {
    totals, 
    countries, 
    history, 
  } = e.data
  postMessage(format(totals.data,  countries.data,  history.data))
})

export function format(totalsData,  countries,  history) {
  let updated = dayjs(new Date(totalsData.updated))
  let dates = Object.keys(get(history,  '0.timeline.cases',  {})).map(date => {
    return dayjs(date).format('MMM D')
  })

  let countryMap = {}
  let usMap = {}
  let totals = {
    ...totalsData, 
    active: 0, 
    critical: 0, 
    casesPerOneMillion: 0, 
    deathsPerCases: 0,
    averageDeathsPerCases: 0,
  }
  let today = {
    cases: 0, 
    deaths: 0, 
    recovered: 0, 
  }
  let timeline = {
    cases: [], 
    deaths: [], 
    recovered: [], 
    dates, 
  }
  let highestDeathsPerCases = undefined
  let lowestDeathsPerCases = undefined

  let casesPerMillionArray = []
  let deathsPerCases = []

  // loop over countries
  countries.forEach(country => {

    let d = (country.deaths / country.cases) * 100

    // deaths / cases
    country.deathsPerCases = d.toFixed(1)
    deathsPerCases.push(d)

    // set totals
    totals.active += country.active
    totals.critical += country.critical
    casesPerMillionArray.push(country.casesPerOneMillion)

    let id = country.country === 'USA' ? 'US' : country.countryInfo.iso2
    countryMap[id] = country
    countryMap[id].timeline = {
      cases: [], 
      deaths: [], 
      recovered: [], 
    }

    if (country.cases > 3000 && get(highestDeathsPerCases, 'deathsPerCases', 0) < country.deathsPerCases) {
      highestDeathsPerCases = country
    }
    if (lowestDeathsPerCases === undefined || country.cases > 3000 && get(lowestDeathsPerCases, 'deathsPerCases', 0) >= country.deathsPerCases) {
      lowestDeathsPerCases = country
    }
  
  })

  totals.casesPerOneMillion = casesPerMillionArray.reduce((a, b) => (a + b)) / casesPerMillionArray.length
  totals.deathsPerCases = (deathsPerCases.reduce((a, b) => (a + b)) / deathsPerCases.length).toFixed(1)

  // loop over each location
  history.forEach(country => {

    // get timeline
    let casesTimeline = Object.values(get(country,  'timeline.cases',  [])).map(n => Number.parseInt(n))
    let deathsTimeline = Object.values(get(country,  'timeline.deaths',  [])).map(n => Number.parseInt(n))
    // let recoveredTimeline = Object.values(get(country,  'timeline.recovered',  [])).map(n => Number.parseInt(n))

    if (!isNaN(casesTimeline[casesTimeline.length - 1])) {
      today.cases += casesTimeline[casesTimeline.length - 1]
    }
    if (!isNaN(deathsTimeline[deathsTimeline.length - 1])) {
      today.deaths += deathsTimeline[deathsTimeline.length - 1]
    }
    // if (!isNaN(recoveredTimeline[recoveredTimeline.length - 1])) {
    //   today.recovered += recoveredTimeline[recoveredTimeline.length - 1]
    // }
    
    
    let id = getCountryId(country.country)
    if (countryMap.hasOwnProperty(id)) {           
      set(countryMap, `${id}.timeline.cases`,  mergeTimeline(casesTimeline, get(countryMap, `${id}.timeline.cases`, [])))
      set(countryMap, `${id}.timeline.deaths`,  mergeTimeline(deathsTimeline, get(countryMap, `${id}.timeline.deaths`, [])))
      // set(countryMap, `${id}.timeline.recovered`,  mergeTimeline(casesTimeline, get(countryMap, `${id}.timeline.recovered`, [])))
    }

    // loop over each day in a country and set timeline
    timeline.dates.forEach((date,  index) => {
      if (!isNaN(get(timeline.cases, index, 0)) && !isNaN(casesTimeline[index])) {
        set(timeline.cases, index, get(timeline.cases, index, 0) + casesTimeline[index])
      }
      if (!isNaN(get(timeline.deaths, index, 0)) && !isNaN(deathsTimeline[index])) {
        set(timeline.deaths, index, get(timeline.deaths, index, 0) + deathsTimeline[index])
      }
      // if (!isNaN(get(timeline.recovered, index, 0)) && !isNaN(recoveredTimeline[index])) {
      //   set(timeline.recovered, index, get(timeline.recovered, index, 0) + recoveredTimeline[index])
      // }
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
    highestDeathsPerCases, 
    lowestDeathsPerCases, 
    countries: countryMap, 
    us: usMap, 
  }
}

function mergeTimeline(array1, array2) {
  let createdArray = []
  array1.forEach((array1Number, index) => {
    if (!isNaN(array1[index]) && !isNaN(array2[index]) ) {
      createdArray.push(array1Number + array2[index])
    }
    else {
      createdArray.push(array1Number)
    }
  })
  return createdArray
}


function getCountryId(label) {
  return { "cote d'ivoire":'CI', 'thailand':'TH','japan':'JP','singapore':'SG','nepal':'NP','malaysia':'MY','canada':'CA','australia':'AU','cambodia':'KH','sri lanka':'LK','germany':'DE','finland':'FI','uae':'AE','philippines':'PH','india':'IN','italy':'IT','sweden':'SE','spain':'ES','belgium':'BE','egypt':'EG','lebanon':'LB','iraq':'IQ','oman':'OM','afghanistan':'AF','bahrain':'BH','kuwait':'KW','algeria':'DZ','croatia':'HR','switzerland':'CH','austria':'AT','israel':'IL','pakistan':'PK','brazil':'BR','georgia':'GE','greece':'GR','north macedonia':'MK','norway':'NO','romania':'RO','estonia':'EE','san marino':'SM','belarus':'BY','iceland':'IS','lithuania':'LT','mexico':'MX','new zealand':'NZ','nigeria':'NG','ireland':'IE','luxembourg':'LU','monaco':'MC','qatar':'QA','ecuador':'EC','azerbaijan':'AZ','armenia':'AM','dominican republic':'DO','indonesia':'ID','portugal':'PT','andorra':'AD','latvia':'LV','morocco':'MA','saudi arabia':'SA','senegal':'SN','argentina':'AR','chile':'CL','jordan':'JO','ukraine':'UA','hungary':'HU','liechtenstein':'LI','poland':'PL','tunisia':'TN','bosnia':'','slovenia':'SI','south africa':'ZA','bhutan':'BT','cameroon':'CM','colombia':'CO','costa rica':'CR','peru':'PE','serbia':'RS','slovakia':'SK','togo':'TG','malta':'MT','martinique':'MQ','bulgaria':'BG','maldives':'MV','bangladesh':'BD','paraguay':'PY','albania':'AL','cyprus':'CY','brunei':'BN','usa':'US','burkina faso':'BF','holy see':'VA','mongolia':'MN','panama':'PA','china':'CN','iran':'IR','s. korea':'KR','france':'FR','cruise ship':'','denmark':'DK','czech republic':'CZ','taiwan*':'TW','vietnam':'VN','russia':'RU','moldova':'MD','bolivia':'BO','honduras':'HN','uk':'GB','congo (kinshasa)':'', 'jamaica':'JM','turkey':'TR','cuba':'CU','guyana':'GY','kazakhstan':'KZ','ethiopia':'ET','sudan':'SD','guinea':'GN','kenya':'KE','antigua and barbuda':'AG','uruguay':'UY','ghana':'GH','namibia':'NA','seychelles':'SC','trinidad and tobago':'TT','venezuela':'VE','eswatini':'','gabon':'GA','guatemala':'GT','mauritania':'MR','rwanda':'RW','saint lucia':'LC','saint vincent and the grenadines':'VC','suriname':'SR','kosovo':'','central african republic':'CF','congo (brazzaville)':'CG','equatorial guinea':'GQ','uzbekistan':'UZ','netherlands':'NL','benin':'BJ','liberia':'LR','somalia':'SO','tanzania':'TZ','barbados':'BB','montenegro':'ME','kyrgyzstan':'KG','mauritius':'MU','zambia':'ZM','djibouti':'DJ','gambia, the':'GM','bahamas, the':'BS','chad':'TD','el salvador':'SV','fiji':'FJ','nicaragua':'NI','madagascar':'MG','haiti':'HT','angola':'AO','cabo verde':'','niger':'NE','papua new guinea':'PG','zimbabwe':'ZW','cape verde':'CV','east timor':'TL','eritrea':'ER','uganda':'UG','dominica':'DM','grenada':'GD','mozambique':'MZ','syria':'SY','timor-leste':'TL'}[label]
}
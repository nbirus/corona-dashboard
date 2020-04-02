import get from 'lodash/get'
import set from 'lodash/set'
import dayjs from 'dayjs'

let startDate = '1/22/20'
let dates = getDates()

function getDates() {
  var dateArray = []
  var currentDate = dayjs(startDate)
  while (currentDate <= dayjs().subtract(1, 'days')) {
    dateArray.push(dayjs(currentDate).format('MMM D'))
    currentDate = dayjs(currentDate).add(1, 'days')
  }
  return dateArray
}

/* istanbul ignore next */
addEventListener('message', e => {
  const {
    countries,
    history,
    jhucsse,
  } = e.data
  // postMessage(format(countries.data.splice(0, 1), history.data))
  postMessage(format(countries.data, history.data, jhucsse.data))
})


export function format(countryData, historyData, jhucsseData) {
  let data = {}
  let totals = {
    cases: 0,
    todayCases: 0,
    deaths: 0,
    todayDeaths: 0,
    recovered: 0,
    active: 0,
    critical: 0,
  }
  let timeline = {
    cases: [],
    deaths: [],
    dates,
  }
  let casesPerOneMillion = []
  let deathsPerOneMillion = []

  // loop over country data and create country map
  countryData.forEach(countryDataPoint => {
    totals = {
      cases: totals.cases + countryDataPoint.cases,
      todayCases: totals.todayCases + countryDataPoint.todayCases,
      deaths: totals.deaths + countryDataPoint.deaths,
      todayDeaths: totals.todayDeaths + countryDataPoint.todayDeaths,
      recovered: totals.recovered + countryDataPoint.recovered,
      active: totals.active + countryDataPoint.active,
      critical: totals.critical + countryDataPoint.critical,
    }
    casesPerOneMillion.push(countryDataPoint.casesPerOneMillion)
    deathsPerOneMillion.push(countryDataPoint.deathsPerOneMillion)
    data[countryDataPoint.countryInfo.iso2] = {
      info: {
        name: countryDataPoint.country,
        ...countryDataPoint.countryInfo
      },
      totals: {
        cases: countryDataPoint.cases,
        todayCases: countryDataPoint.todayCases,
        deaths: countryDataPoint.deaths,
        todayDeaths: countryDataPoint.todayDeaths,
        recovered: countryDataPoint.recovered,
        active: countryDataPoint.active,
        critical: countryDataPoint.critical,
        casesPerOneMillion: countryDataPoint.casesPerOneMillion,
        deathsPerOneMillion: countryDataPoint.deathsPerOneMillion,
        deathRate: (countryDataPoint.deaths / countryDataPoint.cases * 100).toFixed(1),
      },
      timeline: {
        cases: [],
        deaths: [],
        dates,
      },
      map: {

      },
    }
  })

  // loop over history
  historyData.forEach(dataPoint => {
    let cases = Object.values(dataPoint.timeline.cases)
    let deaths = Object.values(dataPoint.timeline.deaths)

    timeline.cases = mergeTimeline(timeline.cases, cases)
    timeline.deaths = mergeTimeline(timeline.deaths, deaths)

    let iso2 = getIso(dataPoint)
    set(data, `${iso2}.timeline.cases`, mergeTimeline(get(data, `${iso2}.timeline.cases`), cases))
    set(data, `${iso2}.timeline.deaths`, mergeTimeline(get(data, `${iso2}.timeline.deaths`), deaths))
  })

  jhucsseData.forEach(dataPoint => {
    set(data, `${getIsojhucsse(dataPoint.country)}.map.${dataPoint.province}`, {
      ...dataPoint,
      stats: {
        cases: dataPoint.stats.confirmed,
        deaths: dataPoint.stats.deaths,
        recovered: dataPoint.stats.recovered,
      }
    })
  })

  // set world
  let map = JSON.parse(JSON.stringify(data))
  delete map['undefined']
  data['world'] = {
    totals,
    timeline,
    map,
  }

  // average totals
  totals.casesPerOneMillion = averageArray(casesPerOneMillion)
  totals.deathsPerOneMillion = averageArray(deathsPerOneMillion)
  totals.deathRate = (totals.deaths / totals.cases * 100).toFixed(1) 
  totals.deathRateYesterday = ((totals.deaths - totals.todayDeaths) / (totals.cases - totals.todayCases) * 100).toFixed(1) 
  
  return data

  function getIso(dataPoint) {
    let name = dataPoint.country
    let countryInfo = countryData.find(country => name.toLowerCase() === country.country.toLowerCase())
    let iso = get(countryInfo, 'countryInfo.iso2')

    if (iso == undefined) {
      iso = getCountryId(name)
    }

    return iso
  }
  function getIsojhucsse(countryName) {
    let countryInfo = countryData.find(country => countryName.toLowerCase() === country.country.toLowerCase())
    let iso = get(countryInfo, 'countryInfo.iso2')

    if (iso === undefined) {
      iso = nameMap[countryName]
    }

    return iso
  }

  function mergeTimeline(array1, array2) {
    let array = []
    dates.forEach((d, index) => {
      set(array, index, get(array1, index, 0) + get(array2, index, 0))
    })
    return array
  }
  function getCountryId(label) {
    return {
      "cote d'ivoire": 'CI',
      'mali': 'ML',
      'libya': 'LY',
      'thailand': 'TH',
      'japan': 'JP',
      'singapore': 'SG',
      'belize': 'BZ',
      'nepal': 'NP',
      'malaysia': 'MY',
      'canada': 'CA',
      'australia': 'AU',
      'cambodia': 'KH',
      'sri lanka': 'LK',
      'germany': 'DE',
      'finland': 'FI',
      'uae': 'AE',
      'philippines': 'PH',
      'india': 'IN',
      'italy': 'IT',
      'sweden': 'SE',
      'spain': 'ES',
      'belgium': 'BE',
      'egypt': 'EG',
      'lebanon': 'LB',
      'iraq': 'IQ',
      'oman': 'OM',
      'afghanistan': 'AF',
      'bahrain': 'BH',
      'kuwait': 'KW',
      'algeria': 'DZ',
      'croatia': 'HR',
      'switzerland': 'CH',
      'austria': 'AT',
      'israel': 'IL',
      'pakistan': 'PK',
      'brazil': 'BR',
      'georgia': 'GE',
      'greece': 'GR',
      'north macedonia': 'MK',
      'norway': 'NO',
      'romania': 'RO',
      'estonia': 'EE',
      'san marino': 'SM',
      'belarus': 'BY',
      'iceland': 'IS',
      'lithuania': 'LT',
      'mexico': 'MX',
      'new zealand': 'NZ',
      'nigeria': 'NG',
      'ireland': 'IE',
      'luxembourg': 'LU',
      'monaco': 'MC',
      'qatar': 'QA',
      'ecuador': 'EC',
      'azerbaijan': 'AZ',
      'armenia': 'AM',
      'dominican republic': 'DO',
      'indonesia': 'ID',
      'portugal': 'PT',
      'andorra': 'AD',
      'latvia': 'LV',
      'morocco': 'MA',
      'saudi arabia': 'SA',
      'senegal': 'SN',
      'argentina': 'AR',
      'chile': 'CL',
      'jordan': 'JO',
      'ukraine': 'UA',
      'hungary': 'HU',
      'liechtenstein': 'LI',
      'poland': 'PL',
      'tunisia': 'TN',
      'bosnia': 'BA',
      'slovenia': 'SI',
      'south africa': 'ZA',
      'bhutan': 'BT',
      'cameroon': 'CM',
      'colombia': 'CO',
      'costa rica': 'CR',
      'peru': 'PE',
      'serbia': 'RS',
      'slovakia': 'SK',
      'togo': 'TG',
      'malta': 'MT',
      'martinique': 'MQ',
      'bulgaria': 'BG',
      'maldives': 'MV',
      'bangladesh': 'BD',
      'paraguay': 'PY',
      'albania': 'AL',
      'cyprus': 'CY',
      'brunei': 'BN',
      'usa': 'US',
      'burkina faso': 'BF',
      'holy see': 'VA',
      'mongolia': 'MN',
      'panama': 'PA',
      'china': 'CN',
      'iran': 'IR',
      's. korea': 'KR',
      'france': 'FR',
      'cruise ship': '',
      'denmark': 'DK',
      'czech republic': 'CZ',
      'taiwan*': 'TW',
      'vietnam': 'VN',
      'russia': 'RU',
      'moldova': 'MD',
      'bolivia': 'BO',
      'honduras': 'HN',
      'uk': 'GB',
      'congo (kinshasa)': '',
      'jamaica': 'JM',
      'turkey': 'TR',
      'cuba': 'CU',
      'guyana': 'GY',
      'kazakhstan': 'KZ',
      'ethiopia': 'ET',
      'sudan': 'SD',
      'guinea': 'GN',
      'kenya': 'KE',
      'antigua and barbuda': 'AG',
      'uruguay': 'UY',
      'ghana': 'GH',
      'namibia': 'NA',
      'seychelles': 'SC',
      'trinidad and tobago': 'TT',
      'venezuela': 'VE',
      'eswatini': '',
      'gabon': 'GA',
      'guatemala': 'GT',
      'mauritania': 'MR',
      'rwanda': 'RW',
      'saint lucia': 'LC',
      'saint vincent and the grenadines': 'VC',
      'suriname': 'SR',
      'kosovo': '',
      'central african republic': 'CF',
      'congo (brazzaville)': 'CG',
      'equatorial guinea': 'GQ',
      'uzbekistan': 'UZ',
      'netherlands': 'NL',
      'benin': 'BJ',
      'liberia': 'LR',
      'somalia': 'SO',
      'tanzania': 'TZ',
      'barbados': 'BB',
      'montenegro': 'ME',
      'kyrgyzstan': 'KG',
      'mauritius': 'MU',
      'zambia': 'ZM',
      'djibouti': 'DJ',
      'gambia': 'GM',
      'bahamas': 'BS',
      'chad': 'TD',
      'el salvador': 'SV',
      'fiji': 'FJ',
      'nicaragua': 'NI',
      'madagascar': 'MG',
      'haiti': 'HT',
      'angola': 'AO',
      'cabo verde': 'CV',
      'niger': 'NE',
      'papua new guinea': 'PG',
      'zimbabwe': 'ZW',
      'cape verde': 'CV',
      'east timor': 'TL',
      'eritrea': 'ER',
      'uganda': 'UG',
      'dominica': 'DM',
      'grenada': 'GD',
      'mozambique': 'MZ',
      'syria': 'SY',
      'timor-leste': 'TL'
    } [label]
  }
  function averageArray(array) {
    let sum = array.reduce((previous, current) => current += previous)
    return (sum / array.length).toFixed(1)
  }
}

let nameMap = {"United Kingdom":"GB","US":"US","Botswana":"BW","Burma":"","Burundi":"BI","Central African Republic":"CF","Congo (Brazzaville)":"CG","Congo (Kinshasa)":"CD","Cote d'Ivoire":"CI","Holy See":"VA","Korea, South":"KR","Kosovo":"","Saint Vincent and the Grenadines":"VC","Sierra Leone":"SL","Taiwan*":"TW","United Arab Emirates":"AE","West Bank and Gaza":"EH"}
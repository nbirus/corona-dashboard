import get from 'lodash/get'

export default {
	// ninja api
	counts: {
		query: () => ({
			baseURL: 'https://corona.lmao.ninja',
			endpoint: 'all',
		}),
		formatter(response) {
			return get(response, 'data', {})
		},
	},
	news: {
		query: params => ({
			baseURL: 'https://www.reddit.com',
			endpoint: 'r/coronavirus/top.json',
			params: {
				limit: params.size,
				raw_json: 1,
			},
		}),
		formatter(response) {
			return get(response, 'data.data.children')
		},
	},
	countryCounts: {
		query: () => ({
			baseURL: 'https://corona.lmao.ninja',
			endpoint: 'countries',
		}),
		formatter(response) {
			return normalizeCountryNames(get(response, 'data', []))
		},
	},

	// https://github.com/ExpDev07/coronavirus-tracker-api
	counts2: {
		query: () => ({
			baseURL: 'https://coronavirus-tracker-api.herokuapp.com/v2',
			endpoint: 'latest',
		}),
	},
	// https://github.com/pomber/covid19
	countryTimeline: {
		query: () => ({
			baseURL: 'https://pomber.github.io/covid19',
			endpoint: 'timeseries.json',
		}),
		formatter(response) {
			return get(response, 'data', {})
		},
	},
}

function normalizeCountryNames(countries) {
	return countries.map(country => {
		// get country name
		let name = country.country

		// transform if not found
		if (Object.keys(countryNameMap).includes(name)) {
			name = countryNameMap[name]
			country.country = name
		}

		return country
	})
}

const countryNameMap = {
	USA: 'United States of America',
	'S. Korea': 'South Korea',
	UK: 'United Kingdom',
	UAE: 'United Arab Emirates',
	Serbia: 'Republic of Serbia',
	DRC: 'Democratic Republic of the Congo',
	Tanzania: 'United Republic of Tanzania',
	Bahamas: 'The Bahamas',
	Congo: 'Republic of the Congo',

	// ?
	Czechia: 'Czech Republic',
	Singapore: 'Singapore',
	Bahrain: 'Bahrain',
	'Hong Kong': 'Hong Kong',
	'San Marino': 'San Marino',
	Andorra: 'Andorra',
	'Faeroe Islands': 'Faeroe Islands',
	'North Macedonia': 'North Macedonia',
	Palestine: 'Palestine',
	Guadeloupe: 'Guadeloupe',
	Liechtenstein: 'Liechtenstein',
	Réunion: 'Réunion',
	Martinique: 'Martinique',
	Macao: 'Macao',
	Maldives: 'Maldives',
	Guam: 'Guam',
	'Channel Islands': 'Channel Islands',
	Monaco: 'Monaco',
	Gibraltar: 'Gibraltar',
	Mauritius: 'Mauritius',
	'French Polynesia': 'French Polynesia',
	Seychelles: 'Seychelles',
	Aruba: 'Aruba',
	Barbados: 'Barbados',
	'Cayman Islands': 'Cayman Islands',
	Curaçao: 'Curaçao',
	Mayotte: 'Mayotte',
	'St. Barth': 'St. Barth',
	'Saint Martin': 'Saint Martin',
	'U.S. Virgin Islands': 'U.S. Virgin Islands',
	'Saint Lucia': 'Saint Lucia',
	'Antigua and Barbuda': 'Antigua and Barbuda',
	CAR: 'CAR',
	'Vatican City': 'Vatican City',
	Montserrat: 'Montserrat',
	'St. Vincent Grenadines': 'St. Vincent Grenadines',
	'Sint Maarten': 'Sint Maarten',
	Eswatini: 'Eswatini',
}

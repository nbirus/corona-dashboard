import { localeString } from '@/services/FilterService'

export default [
	{
		text: 'Country',
		value: 'info',
		filter(value) {
			if (value === undefined) {
				return ''
			}
			return ` <img width="16" class="mr-1 mt-1" src="${value.flag}" alt="${value.name}"> ${value.name}`
		},
	},
	{
		text: 'Cases',
		value: 'totals.cases',
		filter(value) {
			return localeString(value)
		},
	},
	{
		text: 'Today Cases',
		value: 'totals.todayCases',
		filter(value) {
			return localeString(value)
		},
	},
	{
		text: 'Deaths',
		value: 'totals.deaths',
		filter(value) {
			return localeString(value)
		},
	},
	{
		text: 'Deaths Today',
		value: 'totals.todayDeaths',
		filter(value) {
			return localeString(value)
		},
	},
	{
		text: 'Death Rate',
		value: 'totals.deathRate',
		filter(value) {
			return `${value}%`
		},
	},
	{
		text: 'Recovered',
		value: 'totals.recovered',
		filter(value) {
			return localeString(value)
		},
	},
	{
		text: 'Critical',
		value: 'totals.critical',
		filter(value) {
			return localeString(value)
		},
	},
	{
		text: 'Active Cases',
		value: 'totals.active',
		filter(value) {
			return localeString(value)
		},
	},
	{
		text: 'Cases Per Million',
		value: 'totals.casesPerOneMillion',
		filter(value) {
			return localeString(value)
		},
	},
	{
		text: 'Deaths Per Million',
		value: 'totals.deathsPerOneMillion',
		filter(value) {
			return localeString(value)
		},
	},
]

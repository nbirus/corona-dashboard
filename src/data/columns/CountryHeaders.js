import { localeString } from '@/services/FilterService'

export default [
	{
		text: 'Country',
		value: 'info.name',
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

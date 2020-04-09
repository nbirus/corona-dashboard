import { localeString, date } from '@/services/FilterService'

export default [
	{
		text: 'province',
		value: 'province',
	},
	{
		text: 'cases',
		value: 'stats.cases',
		filter(value) {
			return localeString(value)
		},
	},
	{
		text: 'deaths',
		value: 'stats.deaths',
		filter(value) {
			return localeString(value)
		},
	},
	{
		text: 'recovered',
		value: 'stats.recovered',
		filter(value) {
			return localeString(value)
		},
	},
	{
		text: 'updatedAt',
		value: 'updatedAt',
		filter(value) {
			return date(value, 'MMMM D, hh:mm A')
		},
	},
]

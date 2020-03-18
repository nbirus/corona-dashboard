import RouterLinkCell from '@/components/table/cells/RouterLinkCell'

export default [
	{
		text: 'Name',
		value: 'name',
		component: RouterLinkCell,
		componentProps: {
			to: '/test/:id',
		},
	},
	{
		text: 'Calories',
		value: 'calories',
		filter(value) {
			return `<b>${value}</b> calories`
		},
	},
	{
		text: 'Iron',
		value: 'iron',
		hide: false,
	},
	{
		text: 'Object',
		value: 'object.test.ok',
	},
]

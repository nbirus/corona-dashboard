<template>
	<span class="cell">
		<span class="cell-highlight-value">{{ date }}</span>
		<span class="time">- {{ time }}</span>
	</span>
</template>

<script>
import { date } from '@/services/FilterService'

export default {
	name: 'date-cell',
	inheritAttrs: false,
	props: ['value'],
	data() {
		return {
			date: '',
			time: '',
		}
	},
	created() {
		const fDate = date(this.value, 'MMMM DD, YYYY | hh:mm A')
		this.date = fDate.split('|')[0]
		this.time = fDate.split('|')[1]
	},
}
</script>

<style lang="scss" scoped>
.cell {
	.time {
		transition: opacity 0.25s ease;
		opacity: 0;
	}
	&:hover .time {
		opacity: 0.5;
	}
}
</style>

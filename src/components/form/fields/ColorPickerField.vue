<template>
	<!-- eslint-disable vue/no-use-v-if-with-v-for -->
	<ul class="color-picker">
		<li
			v-for="(color, colorName) in filteredColors"
			:key="colorName"
			class="color-picker__item chart-color"
			:class="[colorName, { 'color-picker--active': colorName === $value }]"
			type="checkbox"
			tabindex="0"
			@click="$value = colorName"
			@keydown.enter.prevent="$value = colorName"
			@keydown.space.prevent="$value = colorName"
		></li>
		<li
			v-for="(color, colorName) in chartColors"
			:key="colorName"
			class="color-picker__item chart-color"
			:class="{ 'color-picker--active': colorName === $value }"
			type="checkbox"
			tabindex="0"
			@click="$value = colorName"
			@keydown.enter.prevent="$value = colorName"
			@keydown.space.prevent="$value = colorName"
		>
			<div class="from" :class="color.from"></div>
			<div class="to" :class="color.to"></div>
		</li>
	</ul>
</template>

<script>
import FieldMixin from '@/mixins/FieldMixin'

export default {
	name: 'color-picker-field',
	mixins: [FieldMixin],
	data() {
		return {
			colors: [],
			chartColors,
		}
	},
	computed: {
		filteredColors() {
			let colors = this.$h.cloneDeep(this.colors)
			delete colors.gray
			return colors
		},
	},
}
</script>

<style lang="scss" scoped>
.color-picker {
	display: flex;
	flex-wrap: wrap;
	padding: 0;
	margin: 0;

	&__item {
		display: block;
		flex: 0 0 2rem;
		height: 2rem;
		margin: 0 0.45rem 0.45rem 0;
		border-radius: 50%;
		opacity: 0.75;
		transition: transform 0.2s ease;
		cursor: pointer;

		&:hover {
			opacity: 0.9;
		}
		&:active {
			transform: scale(1.1);
		}
		&:focus {
			transform: scale(1.1);
			box-shadow: 0 1px 2px fade-out(black, 0.75);
			outline: none;
		}
	}
	&--active {
		opacity: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 1px 2px fade-out(black, 0.75);

		&:before {
			content: '';
			width: 1.65rem;
			height: 1.65rem;
			background-color: white;
			position: relative;
			border-radius: 50%;
			opacity: 0.15;
		}
		&:after {
			content: '';
			width: 0.45rem;
			height: 0.45rem;
			background-color: white;
			position: absolute;
			border-radius: 50%;
			opacity: 0.85;
		}
	}

	// special colors
	.chart-color {
		overflow: hidden;
		position: relative;
		transform: rotate(45deg);

		.from {
			position: absolute;
			left: 0;
			width: 1rem;
			height: 2rem;
		}
		.to {
			position: absolute;
			right: 0;
			width: 1rem;
			height: 2rem;
		}
	}
}
</style>

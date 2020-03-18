<template>
	<span class="spinner">
		<svg
			class="spinner-inner"
			viewBox="0 0 50 50"
			:style="{ width: radius / 2 + 'px', height: radius / 2 + 'px' }"
		>
			<circle
				class="path"
				cx="25"
				cy="25"
				r="20"
				fill="none"
				:style="{ stroke: `${color ? colorMap[color] : '#6495ed'}` }"
				:stroke-width="numberWidth"
			/>
		</svg>
	</span>
</template>

<script>
export default {
	name: 'spinner',
	props: {
		color: String,
		size: {
			type: [Number, String],
			default: 120,
		},
		width: {
			type: [Number, String],
			default: 3,
		},
	},
	computed: {
		radius() {
			return parseInt(this.size)
		},
		numberWidth() {
			return parseInt(this.width)
		},
		colorMap() {
			return this.$vuetify.theme.defaults.light
		},
	},
}
</script>

<style lang="scss">
.spinner-inner {
	animation: rotate 2s linear infinite;

	.path {
		stroke-linecap: round;
		animation: dash 1.5s ease-in-out infinite;
	}
}

@keyframes rotate {
	100% {
		transform: rotate(360deg);
	}
}
@keyframes dash {
	0% {
		stroke-dasharray: 1, 150;
		stroke-dashoffset: 0;
	}
	50% {
		stroke-dasharray: 90, 150;
		stroke-dashoffset: -35;
	}
	100% {
		stroke-dasharray: 90, 150;
		stroke-dashoffset: -124;
	}
}
</style>

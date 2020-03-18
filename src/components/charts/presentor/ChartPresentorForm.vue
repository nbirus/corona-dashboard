<template>
	<transition name="chart-aside" mode="out-in">
		<div
			class="aside"
			v-show="state$.settings"
			@click.self="$store.dispatch('presentor/toggleSettings')"
		>
			<form-builder
				v-if="$h.exists(form)"
				:id="`${id}-chart-form`"
				class="chart-aside__form"
				:form="form"
				:value="formValue"
				submit-on-change
				color="primary lighten-1"
				@submit="$store.dispatch('presentor/updateSettings', $event)"
			/>
		</div>
	</transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { camelCaseKeys } from '@/services/UtilsService'
import FormBuilder from '@/components/form/FormBuilder'

// code split chart forms
const formMap = {
	bar: () => import('@/data/forms/BarChartForm'),
	pie: () => import('@/data/forms/PieChartForm'),
}

export default {
	name: 'chart-presentor-form',
	props: ['type', 'id', 'attrs'],
	components: { FormBuilder },
	computed: {
		...mapGetters('presentor', ['state$', 'chartSettings']),
	},
	data() {
		return {
			form: {},
			formOptions: {},
			formValue: {},
		}
	},
	mounted() {
		this.init()
	},
	methods: {
		async init() {
			let formModule = await formMap[this.type]()
			this.form = formModule.default
			this.$nextTick(() => {
				// merge default form model, and props passed to the chart
				this.formValue = mergeValues(
					this.form.model,
					camelCaseKeys(this.attrs),
					this.chartSettings,
					this.$h.exists
				)
			})
		},
	},
}

function mergeValues(object, mergeObject = {}, mergeObject2 = {}, exists) {
	let mergedObject = {}

	for (let key in object) {
		let value = object[key]

		if (exists(mergeObject[key])) {
			value = mergeObject[key]
		}
		if (exists(mergeObject2[key])) {
			value = mergeObject2[key]
		}

		if (key === 'titleStyle') {
			mergedObject[key] = mergeValues(object[key], mergeObject, mergeObject2[key], exists)
		} else {
			mergedObject[key] = value
		}
	}
	return mergedObject
}
</script>

<style lang="scss" scoped>
.aside {
	position: fixed;
	top: 0px;
	bottom: 0;
	right: 0;
	overflow-y: auto;
	background-color: white;
	padding: 1rem 1rem;
	background-color: fade-out(#202020, 0.05);
	background-color: white;
	width: 300px;
	z-index: 12;
	box-shadow: 0 0 32px fade-out(black, 0.75);
	// pointer-events: none;

	&__form {
		background-color: fade-out(#202020, 0.5);
		pointer-events: auto;
	}

	&:after {
		content: '';
		left: 0;
		right: 300px;
		background-color: fade-out(#202020, 0.5);
		top: 0;
		bottom: 0;
		position: fixed;
		z-index: 9;
		pointer-events: auto;
		animation: op 0.25s ease;
		animation-delay: 0.35s;
	}
}

@keyframes op {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
</style>

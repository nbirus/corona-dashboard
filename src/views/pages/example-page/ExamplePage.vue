<template>
	<div class="page pa-7 pb-10">
		<v-row>
			<v-col cols="6">
				<expand v-model="expand">
					<v-card class="pa-5 mt-10">
						<v-btn class="mb-6" @click="expand = !expand">expand</v-btn>
						<data-table-wrapper
							class="row-pad"
							:data="data"
							:columns="ExampleColumns"
							:params="{ _keyword: keyword }"
							item-key="name"
						/>
					</v-card>
				</expand>
			</v-col>
		</v-row>

		<v-card class="pa-5 mt-10">
			<v-layout justify-space-between align-center>
				<v-flex>
					<h5 class="mb-5">Data Table Wrapper Local</h5>
				</v-flex>
				<v-flex md3>
					<v-text-field placeholder="Keyword" v-model="keyword"></v-text-field>
				</v-flex>
			</v-layout>

			<data-table-persist id="example" v-slot="_persist">
				<data-table-wrapper
					class="row-pad"
					v-bind="_persist"
					:data="data"
					:columns="ExampleColumns"
					:params="{ _keyword: keyword }"
					item-key="name"
				/>
			</data-table-persist>
		</v-card>

		<v-card class="pa-5 mt-10" v-if="false">
			<v-layout justify-space-between align-center>
				<v-flex>
					<h5 class="mb-5">Mixed Data Table Wrapper Local</h5>
				</v-flex>
				<v-flex md3>
					<v-text-field placeholder="Keyword" v-model="keyword"></v-text-field>
				</v-flex>
			</v-layout>

			<data-table-persist id="example" v-slot="_persist">
				<mixed-data-table-wrapper
					class="row-pad"
					v-bind="_persist"
					resource="example"
					:columns="ExampleColumns"
					:params="{ _keyword: keyword }"
					item-key="name"
				/>
			</data-table-persist>
		</v-card>
	</div>
</template>

<script>
import DataTableWrapper from '@/components/table/wrappers/DataTableWrapper'
import MixedDataTableWrapper from '@/components/table/wrappers/MixedDataTableWrapper'
import DataTablePersist from '@/components/table/wrappers/DataTablePersist'
import Expand from '@/components/utils/Expand'
import ExampleForm from '@/data/forms/ExampleForm'
import ExampleColumns from '@/data/columns/ExampleColumns'

export default {
	name: 'example-page',
	components: {
		Expand,
		DataTableWrapper,
		MixedDataTableWrapper,
		DataTablePersist,
	},
	data() {
		return {
			expand2: false,
			expand: false,
			ExampleForm,
			ExampleColumns,
			formValues: {},
			selected: [],
			activeFields: [],
			keyword: '',
			data: [
				{
					name: 'Frozen Yogurt',
					calories: 159,
					fat: 6.0,
					carbs: 24,
					protein: 4.0,
					iron: '1%',
				},
				{
					name: 'Ice cream sandwich',
					calories: 237,
					fat: 9.0,
					carbs: 37,
					protein: 4.3,
					iron: '1%',
				},
				{
					name: 'Eclair',
					calories: 262,
					fat: 16.0,
					carbs: 23,
					protein: 6.0,
					iron: '7%',
				},
				{
					name: 'Cupcake',
					calories: 305,
					fat: 3.7,
					carbs: 67,
					protein: 4.3,
					iron: '8%',
				},
				{
					name: 'Gingerbread',
					calories: 356,
					fat: 16.0,
					carbs: 49,
					protein: 3.9,
					iron: '16%',
				},
				{
					name: 'Eclair2',
					calories: 262,
					fat: 16.0,
					carbs: 23,
					protein: 6.0,
					iron: '7%',
				},
				{
					name: 'Cupcake2',
					calories: 305,
					fat: 3.7,
					carbs: 67,
					protein: 4.3,
					iron: '8%',
				},
				{
					name: 'Gingerbread2',
					calories: 356,
					fat: 16.0,
					carbs: 49,
					protein: 3.9,
					iron: '16%',
				},
				{
					name: 'Jelly bean2',
					calories: 375,
					fat: 0.0,
					carbs: 94,
					protein: 0.0,
					iron: '0%',
				},
				{
					name: 'Lollipop1',
					calories: 392,
					fat: 0.2,
					carbs: 98,
					protein: 0,
					iron: '2%',
				},
				{
					name: 'Honeycomb',
					calories: 408,
					fat: 3.2,
					carbs: 87,
					protein: 6.5,
					iron: '45%',
				},
				{
					name: 'Donut',
					calories: 452,
					fat: 25.0,
					carbs: 51,
					protein: 4.9,
					iron: '22%',
				},
				{
					name: 'KitKat',
					calories: 518,
					fat: 26.0,
					carbs: 65,
					protein: 7,
					iron: '6%',
				},
			],
		}
	},
	methods: {
		onChange(model) {
			// console.log('CHANGE', model)
			this.formValues = model
		},
		onSubmit(model) {
			console.log('SUBMIT', model)
		},
		submitForm() {
			this.$refs.example.submit()
		},
	},
}
</script>

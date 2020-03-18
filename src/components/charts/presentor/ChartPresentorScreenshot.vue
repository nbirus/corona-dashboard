<template>
	<v-dialog v-model="value" width="300">
		<v-card>
			<v-card-text class="pt-5 pb-0 pl-5">
				<v-form>
					<v-text-field label="Save file as..." v-model="filename" />
					<div ref="screenshot"></div>
				</v-form>
			</v-card-text>
			<v-card-actions class="pt-0">
				<v-spacer></v-spacer>
				<v-btn color="grey darken-1" text @click="value = false">Cancel</v-btn>
				<v-btn color="primary" text @click="takeScreenshot">Save</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import Screenshot from '@/utils/ScreenshotUtil'

export default {
	name: 'chart-presentor-screenshot',
	props: ['id'],
	data() {
		return {
			filename: `${this.id}-chart`,
		}
	},
	computed: {
		value: {
			get() {
				return this.$store.getters['presentor/screenshotModal$']
			},
			set(value) {
				this.$store.dispatch('presentor/setScreenshotModal', value)
			},
		},
	},
	methods: {
		async takeScreenshot() {
			this.value = false
			await Screenshot(document.getElementById(`${this.id}-chart`), {
				filename: this.filename,
			})
			this.$nextTick(() => {
				this.$store.dispatch('presentor/toggleScreenshot')
			})
		},
	},
}
</script>

<template>
	<v-dialog :value="open" width="430" persistent>
		<v-card class="pa-10 py-8">
			<v-layout align-center column>
				<v-flex class="mb-4">
					<h4 class="bold">Session about to expire!</h4>
				</v-flex>
				<v-flex class="mb-3 body-1">
					<p>
						You will be signed out in
						<b>{{ expiresIn | msToMinStr }}</b>
					</p>
				</v-flex>
				<v-flex>
					<v-btn color="warning" large depressed width="325" @click="$emit('userDidRespond')">
						<v-icon size="16" left>fa-check</v-icon>Keep me singed in
					</v-btn>
				</v-flex>
			</v-layout>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	name: 'timeout-warning',
	props: ['expiresIn', 'open'],
	data() {
		return {
			timeout: null,
		}
	},
	filters: {
		msToMinStr(ms) {
			const msToSec = ms / 1000
			const min = Math.trunc(msToSec / 60)
				.toString()
				.padStart(2, '0')
			const sec = Math.trunc(msToSec % 60)
				.toString()
				.padStart(2, '0')
			return `${min}:${sec.toString().padStart(2, '0')} minutes`
		},
	},
	watch: {
		open(open) {
			if (open) {
				this.timeout = setTimeout(() => {
					this.$emit('userDidntRespond')
				}, this.expiresIn)
			} else {
				clearTimeout(this.timeout)
			}
		},
	},
}
</script>

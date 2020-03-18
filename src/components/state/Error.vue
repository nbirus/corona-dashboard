<template>
	<v-layout column align-center justify-center class="height-100">
		<strong v-html="error.message"></strong>
		<v-btn class="mt-3" small text @click="refresh">Try again</v-btn>
	</v-layout>
</template>

<script>
export default {
	name: 'error',
	props: ['error', 'refresh'],
}
</script>

<style></style>

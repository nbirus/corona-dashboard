<template>
	<v-footer class="footerContainer-lg" :class="{ sidebar: $route.name !== 'login' }"></v-footer>
</template>

<script>
export default {
	name: 'footer-base',
}
</script>

<style scoped lang="scss">
</style>

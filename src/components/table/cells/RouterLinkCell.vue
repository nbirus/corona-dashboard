<template>
	<router-link class="cell-highlight-value link" :to="to.replace(':id', value)" v-html="value" />
</template>

<script>
export default {
	name: 'example-cell',
	inheritAttrs: false,
	props: ['value', 'to'],
}
</script>

<style lang="scss" scoped>
.context-open .cell-highlight-value {
	text-decoration: none;
}
.button-link {
	justify-content: flex-start;
	text-transform: unset;
}
.link {
	text-decoration: none !important;
}
</style>

<template>
	<v-layout class="page max page-dark" justify-center align-center column>
		<h3 class="mb-3 bold">Page Not Found</h3>
		<p class="body-1 mb-10">We're sorry, but the page you requested was not found</p>
		<v-btn color="primary" large class="no-underline" link href="javascript:history.go(-1)">
			<v-icon left>fa-arrow-left</v-icon>return to previous page
		</v-btn>
	</v-layout>
</template>

<script>
export default {
	name: 'not-found-page',
}
</script>

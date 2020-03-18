<template>
	<v-layout class="page max page-dark" justify-center column align-center>
		<h3 class="mb-3 bold">Authorization Required</h3>
		<p class="body-1 mb-10 text-center">
			We're sorry, but you do not have access to the requested page.
			<br />Please <a :href="`mailto:${$c.support}`">contact support</a> for more information.
		</p>
		<v-btn color="primary" large class="no-underline mt-2" link href="javascript:history.go(-1)">
			<v-icon left>fa-arrow-left</v-icon>return to previous page
		</v-btn>
	</v-layout>
</template>

<script>
export default {
	name: 'unauthorized-page',
}
</script>

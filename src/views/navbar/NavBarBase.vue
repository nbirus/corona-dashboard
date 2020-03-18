<template>
	<v-app-bar height="120" color="transparent" app absolute elevation="0">
		<div class="nav-bar-container">
			<router-link to="dashboard">Dashboard</router-link>
			<router-link to="news">News</router-link>
			<router-link to="map">Map</router-link>
		</div>
	</v-app-bar>
</template>

<script>
export default {
	name: 'nav-bar-base',
}
</script>

<style lang="scss">
.v-app-bar {
	padding-left: 4rem;
	padding-right: 4rem;

	.nav-bar-container {
		width: 100%;
		padding-top: 3rem;
	}
	.v-toolbar__content {
		padding: 0;
	}

	a {
		font-size: 2rem;

		&:not(:last-child) {
			margin-right: 2rem;
		}
		&.router-link-active {
			font-weight: $bold;
			text-decoration: none;
			pointer-events: none;
		}
	}
}
</style>

<template>
	<v-app-bar height="100" color="transparent" app absolute elevation="0">
		<div class="nav-bar-container">
			<router-link class="link" to="dashboard">Dashboard</router-link>
			<router-link class="link" to="news">News</router-link>
			<router-link class="link" to="map">Map</router-link>
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
		padding-top: 1rem;
	}
	.v-toolbar__content {
		padding: 0;
	}

	a.link {
		font-size: 2rem;
		font-weight: $bold;
		color: fade-out(black, 0.65) !important;
		text-decoration: none !important;

		&:hover:not(.router-link-active) {
			color: fade-out(black, 0.25) !important;
		}

		&:not(:last-child) {
			margin-right: 2rem;
		}
		&.router-link-active {
			color: fade-out(black, 0) !important;
			pointer-events: none;
		}
	}
}
</style>

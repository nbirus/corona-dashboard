<template>
	<v-app-bar height="75" app elevation="2" bottom>
		<div class="nav-bar-container">
			<router-link class="link" to="dashboard">
				<v-icon size="20" class="mb-1">fa-globe</v-icon>Dashboard
			</router-link>
			<router-link class="link" to="news">
				<v-icon size="20" class="mb-1">fa-rss-square</v-icon>News
			</router-link>
			<router-link class="link" to="map">
				<v-icon size="20" class="mb-1">fa-map</v-icon>Map
			</router-link>
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
	border-top: solid thin $border-color !important;

	.nav-bar-container {
		width: 400px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.v-toolbar__content {
		padding: 0;
	}

	a.link {
		font-size: 1rem;
		font-weight: $bold;
		color: fade-out(black, 0.65) !important;
		text-decoration: none !important;
		display: flex;
		flex-direction: column;

		i {
			color: fade-out(black, 0.65) !important;
		}

		&:hover:not(.router-link-active) {
			color: fade-out(black, 0.25) !important;
			i {
				color: fade-out(black, 0.25) !important;
			}
		}

		&:not(:last-child) {
			margin-right: 2rem;
		}
		&.router-link-active {
			i {
				color: fade-out(black, 0) !important;
			}
			color: fade-out(black, 0) !important;
			pointer-events: none;
		}
	}
}
</style>

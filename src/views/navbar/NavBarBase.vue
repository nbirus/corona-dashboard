<template>
	<v-app-bar height="75" app elevation="2" bottom>
		<div class="nav-bar-container">
			<v-btn
				class="btn-nav"
				text
				height="75"
				to="dashboard"
				:class="{ active: $route.name === 'dashboard' }"
			>
				<v-icon size="20" class="mb-1">fa-globe</v-icon>Dashboard
			</v-btn>
			<v-btn class="btn-nav" text height="75" to="news" :class="{ active: $route.name === 'news' }">
				<v-icon size="20" class="mb-1">fa-rss-square</v-icon>News
			</v-btn>
			<v-btn class="btn-nav" text height="75" to="map" :class="{ active: $route.name === 'map' }">
				<v-icon size="20" class="mb-1">fa-map</v-icon>Map
			</v-btn>
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
		width: 450px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.v-toolbar__content {
		padding: 0;
	}

	.v-btn.btn-nav {
		background-color: white !important;
		text-decoration: none !important;
		border-radius: 0;

		.v-btn__content {
			display: flex;
			flex-direction: column;
			width: 100px !important;
		}

		&.v-btn--active::before {
			opacity: 0;
		}
		&.active {
			color: var(--v-primary-base) !important;
		}
	}
}
</style>

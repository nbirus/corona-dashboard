<template>
	<v-navigation-drawer
		mini-variant-width="70"
		app
		disable-resize-watcher
		disable-route-watcher
		expand-on-hover
		permanent
	>
		<!-- <template v-slot:prepend>
			<v-list>
				<v-list-item>
					<v-list-item-avatar></v-list-item-avatar>
				</v-list-item>
			</v-list>
		</template>

		<v-divider></v-divider>-->

		<v-list nav dense>
			<v-list-item link v-for="route in routes" :key="route.to" :to="route.to">
				<v-list-item-icon>
					<v-icon v-text="route.icon"></v-icon>
				</v-list-item-icon>
				<v-list-item-title v-text="route.name"></v-list-item-title>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
export default {
	name: 'side-bar-base',
	data() {
		return {
			routes: [
				{
					name: 'Home',
					to: '/home',
					icon: 'fa-home',
				},
				{
					name: 'Example',
					to: '/example',
					icon: 'fa-cogs',
				},
			],
		}
	},
}
</script>

<style lang="scss">
.v-navigation-drawer {
	.v-list-item {
		height: 50px;
		margin-bottom: 1rem;
		text-decoration: none !important;

		&__icon {
			position: absolute;
			top: 0.3rem;
			left: 0.75rem;
		}
		&__title {
			padding-left: 3rem;
			text-decoration: none !important;
		}
	}

	&--is-mouseover {
		.v-list-item {
			padding: 0 1rem;
		}
	}
}
</style>

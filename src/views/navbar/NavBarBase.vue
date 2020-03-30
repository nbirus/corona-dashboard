<template>
	<v-app-bar color="transparent" height="250">
		<div class="nav-bar-container">
			<div class="nav__title">
				<h1>Covid-19 Dashboard</h1>
				<p>
					The data used to generate this dashboard can be found
					<a target="_blank" href="https://github.com/NovelCOVID/API">here</a>.
				</p>
			</div>
			<div class="nav__buttons">
				<v-select class="nav__select" large solo :items="CountryItems" v-model="key"></v-select>
			</div>
		</div>
	</v-app-bar>
</template>

<script>
import CountryItems from '@/assets/CountryItems.js'

export default {
	name: 'nav-bar-base',
	computed: {
		data() {
			return this.$store.getters['data/get']
		},
		key: {
			get() {
				return this.$store.getters['data/key']
			},
			set(key) {
				this.$store.dispatch('data/setKey', key)
			},
		},
	},
	data() {
		return {
			CountryItems,
		}
	},
}
</script>

<style lang="scss">
.v-app-bar {
	.nav-bar-container {
		margin: 0 auto;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: space-between;
	}
	.v-toolbar__content {
		padding-top: 3rem;
		padding-bottom: 0;
	}
}
.nav {
	&__title {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 0.25rem;

		h1 {
			font-size: 2.5rem;
		}
		p {
			font-size: 1.3rem;
			margin: 0;
			text-align: center;

			a {
				text-decoration: underline;

				&:hover {
					color: var(--v-primary-base) !important;
				}
			}
		}
	}
	&__buttons {
		padding: 1rem 0;
	}
	&__select {
		width: 250px;
		font-size: 1.2rem !important;
	}
}
#us-btn.active,
#world-btn.active {
	border-color: var(--v-primary-base) !important;
	background-color: fade-out(rgb(25, 118, 210), 0.995);
	border-left-width: 1px;
}

#us-btn {
	border-radius: 0 0.75rem 0.75rem 0;
}
#world-btn {
	border-radius: 0.75rem 0 0 0.75rem;
}
</style>

<template>
	<v-app-bar color="transparent" height="250">
		<div class="nav-bar-container">
			<div class="nav__title">
				<h1>Covid-19 Dashboard</h1>
				<p>
					The data used to generate this dashboard can be found
					<a
						target="_blank"
						href="https://github.com/NovelCOVID/API"
					>here</a>.
				</p>
			</div>
			<div class="nav__buttons">
				<v-btn-toggle v-model="dataSet" mandatory color="primary" dense>
					<v-btn
						id="world-btn"
						:class="{ active: dataSet === 'world' }"
						large
						min-width="200"
						value="world"
					>World</v-btn>
					<v-btn
						id="us-btn"
						:class="{ active: dataSet === 'us' }"
						large
						min-width="200"
						value="US"
					>United States</v-btn>
				</v-btn-toggle>
			</div>
		</div>
	</v-app-bar>
</template>

<script>
export default {
	name: 'nav-bar-base',
	computed: {
		key() {
			return this.$store.getters['data/key']
		},
	},
	data() {
		return {
			dataSet: this.key,
		}
	},
	watch: {
		dataSet(key) {
			this.$store.dispatch('data/setKey', key)
		},
	},
}
</script>

<style lang="scss">
.v-app-bar {
	padding-left: 4rem;
	padding-right: 4rem;
	border-top: solid thin $border-color !important;

	.nav-bar-container {
		margin: 0 auto;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: space-between;
	}
	.v-toolbar__content {
		padding: 0;
	}
}
.nav {
	&__title {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 0.25rem;

		p {
			font-size: 1.2rem;
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

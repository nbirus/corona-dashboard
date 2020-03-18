import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'badc-styleguide/theme/colors'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.use(Vuetify)

export default new Vuetify({
	icons: {
		iconfont: 'fa',
	},
	breakpoint: {
		thresholds: {
			xs: 600,
			sm: 900,
			md: 1200,
			lg: 1800,
		},
	},
	theme: {
		options: {
			customProperties: true,
		},
		themes: {
			light: {
				// BADC colors
				...colors,

				// project colors
				primary: colors.aqua,
				secondary: colors.purple,
				accent: colors.indigo,
				error: colors.red,
				info: colors.blue,
				success: colors.green,
				warning: colors.yellow,
				anchor: colors.blue.darken1,

				dark: '#404250',
				light: '#F6F9FA',
			},
		},
	},
})

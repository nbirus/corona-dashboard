import Vue from 'vue'
import Vuetify from 'vuetify/lib'

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
	},
})

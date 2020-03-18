import NProgress from 'nprogress'
import get from 'lodash/get'

export default {
	start(to, from, next) {
		if (to.name && get(to, 'meta.progressBar', true)) {
			NProgress.start()
		}
		next()
	},
	done() {
		NProgress.done()
	},
}

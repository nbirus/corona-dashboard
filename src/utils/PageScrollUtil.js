import goTo from 'vuetify/es5/services/goto'

export default function(to, from, savedPosition) {
	let scrollTo = 0

	if (to.hash) {
		scrollTo = to.hash
	} else if (savedPosition) {
		scrollTo = savedPosition.y
	}

	return goTo(scrollTo)
}

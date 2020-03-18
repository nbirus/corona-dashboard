import get from 'lodash/get'
const projectTitle = process.env.VUE_APP_PROJECT_TITLE

/**
 * Update the page title based on the current route.
 * Set a page title route the `meta.title` property in the router.
 * If the page has a paramater in the route, use `:some-param` to extract it.
 */
export default (to, from, next) => {
	// get route title
	let routeTitle = get(to, 'meta.title', '')

	// check for dynamic match
	if (routeTitle.includes(':')) {
		let param = routeTitle.split(':')[1]
		routeTitle = routeTitle.replace(`:${param}`, to.params[param])
	}

	// set document title if it exists
	document.title = routeTitle ? `${routeTitle} - ${projectTitle}` : projectTitle

	next()
}

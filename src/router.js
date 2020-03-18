import Vue from 'vue'
import Router from 'vue-router'
import PageTitleUtil from '@/utils/PageTitleUtil'
import PageProgressUtil from '@/utils/PageProgressUtil'
import PageScrollUtil from '@/utils/PageScrollUtil'
import SetFavicon from '@/utils/SetFavicon'

// use router
Vue.use(Router)

// set favicon
SetFavicon()

// project routes
const projectRoutes = [
	{
		path: '/dashboard',
		name: 'dashboard',
		component: () =>
			import(
				/* webpackChunkName: "DashboardPage" */ './views/pages/dashboard-page/DashboardPage.vue'
			),
		meta: {
			title: 'Dashboard',
			progressBar: true,
		},
	},
]

// special routes and redirects
const specialRoutes = [
	{
		path: '*',
		redirect: '/not-found',
	},
	{
		path: '/',
		redirect: '/dashboard',
	},
	{
		path: '/not-found',
		name: 'not-found',
		component: () =>
			import(/* webpackChunkName: "NotFoundPage" */ '@/views/error/NotFoundPage.vue'),
		meta: {
			title: 'Not Found',
		},
	},
]

// create router
const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	scrollBehavior: PageScrollUtil,
	routes: [...specialRoutes, ...projectRoutes],
})

// update page title according to current route
router.beforeEach(PageTitleUtil)

// page load progress bar
router.beforeResolve(PageProgressUtil.start)
router.afterEach(PageProgressUtil.done)

export default router

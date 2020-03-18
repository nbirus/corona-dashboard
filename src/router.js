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
	{
		path: '/news',
		name: 'news',
		component: () =>
			import(/* webpackChunkName: "NewsPage" */ './views/pages/news-page/NewsPage.vue'),
		meta: {
			title: 'News',
			progressBar: true,
		},
	},
	{
		path: '/map',
		name: 'map',
		component: () => import(/* webpackChunkName: "MapPage" */ './views/pages/map-page/MapPage.vue'),
		meta: {
			title: 'Map',
			progressBar: true,
		},
	},
]

// special routes and redirects
const specialRoutes = [
	{
		path: '*',
		redirect: '/dashboard',
	},
	{
		path: '/',
		redirect: '/dashboard',
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

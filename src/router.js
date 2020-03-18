import Vue from 'vue'
import Router from 'vue-router'
import PageTitleUtil from '@/utils/PageTitleUtil'
import PageProgressUtil from '@/utils/PageProgressUtil'
import PageRoleGaurdUtil from '@/utils/PageRoleGaurdUtil'
import PageScrollUtil from '@/utils/PageScrollUtil'
import { getRoleHome } from '@/services/RoleService'
import SetFavicon from '@/utils/SetFavicon'

import OktaSM from 'okta-sm'
import authConfig from '@/auth'

Vue.use(Router)
Vue.use(OktaSM, authConfig)
Vue.use({
	install(Vue) {
		Vue.prototype.$smEvents = OktaSM.eventTypes
	},
})

// set favicon
SetFavicon()

// project routes
const projectRoutes = [
	{
		path: '/home',
		name: 'home',
		component: () =>
			import(/* webpackChunkName: "HomePage" */ './views/pages/home-page/HomePage.vue'),
		meta: {
			title: 'Home',
			requiresAuth: true,
			progressBar: true,
		},
	},
	{
		path: '/example',
		name: 'example',
		component: () =>
			import(/* webpackChunkName: "ExamplePage" */ './views/pages/example-page/ExamplePage.vue'),
		meta: {
			title: 'Example',
			requiresAuth: true,
			progressBar: true, // optional

			section: 'example', // define which section this route falls under
			allowedRoles: ['DEVELOPER', 'OTHER_ROLE'], // define which roles are allowed to access this route
		},
	},
	{
		path: '/doc',
		name: 'Documentation',
		component: () =>
			import(/* webpackChunkName: "SwaggerPage" */ './views/pages/swagger-page/SwaggerPage.vue'),
		meta: {
			title: 'API Documentation',
			requiresAuth: true,
		},
	},
	{
		path: '/documentation/',
		beforeEnter(to, from, next) {
			if (to.path === '/documentation') next('/')
			else next()
		},
	},
	{
		path: '/external',
		name: 'external-link',
		beforeEnter: () => window.open('http://example.com/', '_blank'),
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
		beforeEnter(to, from, next) {
			next(getRoleHome())
		},
	},
	{
		path: '/not-found',
		name: 'not-found',
		component: () =>
			import(/* webpackChunkName: "NotFoundPage" */ '@/views/error/NotFoundPage.vue'),
		meta: {
			title: 'Not Found',
			requiresAuth: true,
		},
	},
	{
		path: '/unauthorized',
		name: 'unauthorized',
		component: () =>
			import(/* webpackChunkName: "UnauthorizedPage" */ '@/views/error/UnauthorizedPage.vue'),
		meta: {
			title: 'Unauthorized',
		},
	},
]

// authentication routes
const authRoutes = [
	{
		path: '/login',
		name: 'login',
		component: () =>
			import(/* webpackChunkName: "LoginPage" */ '@/views/pages/login-page/LoginPage.vue'),
		meta: {
			title: 'Login',
		},
	},
	{
		path: '/logout',
		name: 'logout',
		async beforeEnter(to, from, next) {
			if (await router.app.$sm.auth.isAuthenticated()) {
				// destroy session
				router.app.$sm.auth.logout()
				router.app.$store.dispatch('auth/logout')

				// display error message
				if (to.query.message) {
					router.app.$store.dispatch('snackbar/open', {
						message: to.query.message,
						color: 'error',
						timeout: 1000000,
					})
				}
			}

			next('/login')
		},
	},
]

// create router
const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	scrollBehavior: PageScrollUtil,
	routes: [...specialRoutes, ...authRoutes, ...projectRoutes],
})

// protect authenticated routes (must have meta tag `requiresAuth` set to true)
router.beforeEach(async (to, from, next) => {
	if (
		to.matched.some(record => record.meta.requiresAuth) &&
		!(await router.app.$sm.auth.isAuthenticated())
	) {
		router.app.$store.dispatch('auth/setPreAuth', to.path)
		next('/logout')
	} else {
		next()
	}
})

// does user have access to this page
router.beforeEach(PageRoleGaurdUtil)

// update page title according to current route
router.beforeEach(PageTitleUtil)

// page load progress bar
router.beforeResolve(PageProgressUtil.start)
router.afterEach(PageProgressUtil.done)

export default router

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import '@/global'
import '@/helpers'
import '@/filters'
import '@/styles/index.scss'

// Removed Uncaught error(in Promise)
import VueRouter from 'vue-router'
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return routerPush.call(this, location).catch(error => error)
}

Vue.config.productionTip = false

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App),
}).$mount('#app')

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'

// router setup
import { router } from './routes/index'

// store

import { store } from './store'

// Plugins
import GlobalComponents from './globalComponents'
import GlobalDirectives from './globalDirectives'

// MaterialDashboard plugin
import MaterialDashboard from './material-dashboard'

// configure router

Vue.use(VueRouter)
Vue.use(MaterialDashboard)
Vue.use(GlobalComponents)
Vue.use(GlobalDirectives)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
})

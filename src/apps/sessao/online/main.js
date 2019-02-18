import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue'

import VuexStore from './store'

import axios from 'axios'

import { sync } from 'vuex-router-sync'
import { routes } from './router-config'
import { loadProgressBar } from 'axios-progress-bar'
import 'axios-progress-bar/dist/nprogress.css'

import App from './App'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
import VueNativeSock from 'vue-native-websocket'

Vue.use(Vuex)
Vue.use(Router)
Vue.use(BootstrapVue)
Vue.use(VueNativeSock, 'ws://' + window.location.host + '/ws/time-refresh/', {
  reconnection: true, // (Boolean) whether to reconnect automatically (false)
  //reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
  //reconnectionDelay: 3000, // (Number) how long to initially wait before attempting a new (1000)
})



loadProgressBar()

Vue.config.productionTip = false

const store = new Vuex.Store(VuexStore)
const router = new Router({
  routes,
  mode: 'history'
})
sync(store, router)

const app = new Vue({ // eslint-disable-line
  router,
  store,
  el: '#app-frontend-base-content',
  components: { App },
  template: '<App/>'
})

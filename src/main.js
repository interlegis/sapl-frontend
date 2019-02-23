/*
- App SaplFrontend - que será transformada em PWA.
- Já possui comunicacão com o backend via websocket e contará
com refresh online da tela do usuário.
- atualmente invocada sobre o Sapl de layout tradicional via link /online
*/

import Vue from 'vue'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'
import VueNativeSock from 'vue-native-websocket'
import Router from 'vue-router'

import VuexStore from './store'

import axios from 'axios'

import { sync } from 'vuex-router-sync'
import { routes } from './routers'
import { loadProgressBar } from 'axios-progress-bar'
import 'axios-progress-bar/dist/nprogress.css'

import App from './App'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

Vue.use(Vuex)
Vue.use(Router)
Vue.use(BootstrapVue)

Vue.use(VueNativeSock, 'ws://' + window.location.host + '/ws/time-refresh/', {
  reconnection: true // (Boolean) whether to reconnect automatically (false)
  // reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
  // reconnectionDelay: 3000, // (Number) how long to initially wait before attempting a new (1000)
})

loadProgressBar()

Vue.mixin({
  methods: {
    ...Vuex.mapActions([
      'sendMessage'
    ])
  },
})

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

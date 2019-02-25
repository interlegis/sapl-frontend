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
import { loadProgressBar } from 'axios-progress-bar'
import 'axios-progress-bar/dist/nprogress.css'

import { routes } from './routers'
import { EventBus } from '@/event-bus'

import App from './App'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

Vue.use(Vuex)
Vue.use(Router)
Vue.use(BootstrapVue)

Vue.use(VueNativeSock, 'ws://' + window.location.host + '/ws/time-refresh/', {
  /*
  ws/time-refresh recebe uma notificacão sempre que um model do Sapl
  é alterado. Um JSON é enviado pelo servidor no formato:
  {
    action: 'post_save' | 'post_delete',
    id: 9999, // 9999 - pk do model alterado
    app: 'app_name', // de que app é esse id
    model; 'model_name', // de que model é esse id
  }
  */
  reconnection: true // (Boolean) whether to reconnect automatically (false)
  // reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
  // reconnectionDelay: 3000, // (Number) how long to initially wait before attempting a new (1000)
})

loadProgressBar()


Vue.mixin({

  computed: {
    ...Vuex.mapGetters([
      'getModel',
    ]),
  },
  methods: {
    ...Vuex.mapActions([
      'sendMessage',
      'removeFromState',
      'insertInState'
    ]),
    stringToDate: function (_date,_format,_delimiter) {
      var formatLowerCase=_format.toLowerCase();
      var formatItems=formatLowerCase.split(_delimiter);
      var dateItems=_date.split(_delimiter);
      var monthIndex=formatItems.indexOf("mm");
      var dayIndex=formatItems.indexOf("dd");
      var yearIndex=formatItems.indexOf("yyyy");
      var month=parseInt(dateItems[monthIndex]);
      month-=1;
      var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
      return formatedDate;
    },
    on_ws_message (data) {
      let _this = this

      if (!_this.hasOwnProperty('app') || !_this.hasOwnProperty('model'))
        return

      if (Array.isArray(_this.app) && Array.isArray(_this.model)) {
        if (_.indexOf(_this.app, data.message.app) !== -1 &&
            _.indexOf(_this.model, data.message.model) !== -1) {
          _this.fetch()
        }
      }
      else {
        if (data.message.app === _this.app && data.message.model === _this.model) {
          _this.fetch()
        }
      }
    }
  },
  created: function () {
    /*
      Observador para o WebSocket...
      O Componente que se interesse por monitorar notificacões vindas
      do servidor de que um model possui alteracão, basta implementar
      o método on_ws_message.
    */
    let _this = this
    EventBus.$on('ws-message', _this.on_ws_message )
  }
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

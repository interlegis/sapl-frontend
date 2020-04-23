import Vue from 'vue'
import draggable from 'vuedraggable'
import { ListGroupPlugin } from 'bootstrap-vue'
import axios from 'axios'
import './sessao.css'
import VueCountdown from '@chenfengyuan/vue-countdown'
import AsyncComputed from 'vue-async-computed'

Vue.use(ListGroupPlugin)
Vue.use(AsyncComputed)
Vue.component(VueCountdown.name, VueCountdown)

var moment = require('moment')

const lista_discurso_app = new Vue({ // eslint-disable-line
  delimiters: ['[[', ']]'],
  el: '#lista-discurso',
  data: {
    lista_selecionada: '',
    parlamentares_selecionados: [],
    selecionado_add: false,
    selecionado_painel: false,
    orador: -1,
    cronometros_lista: [],
    counting: []
  },
  asyncComputed: {
    tipo_listas: {
      async get () {
        return axios.get('/api/sessao/tipolistadiscurso/?page_size=200').then(response =>
          response.data.results
        )
      },
      default: []
    },
    parlamentares: {
      async get () {
        const sessao_pk = window.location.href.split('/')[4]
        const url = '/api/sessao/sessaoplenaria/' + sessao_pk + '/parlamentares_presentes/?page_size=200'
        return axios.get(url).then((response) =>
          response.data.results.map(function (p) {
            return { id: p.id, nome: p.nome_parlamentar }
          })
        )
      },
      default: []
    }

  },
  computed: {
  },
  watch: {
    lista_selecionada: async function (newValue, oldValue) {
      const url = '/api/painel/cronometro/?cronometrolista__tipo_lista_id=' + this.lista_selecionada.id
      this.cronometros_lista = await axios.get(url).then(response =>
        response.data.results
      )

      const sessao_pk = window.location.href.split('/')[4]
      axios.get('/sistema/get-orador-lista/' + sessao_pk + '/' +
                      this.lista_selecionada.id).then(response => {
        this.orador = response.data.orador[0]
        this.parlamentares_selecionados = response.data.parlamentares.map(function (p) {
          return { id: p[0], nome: p[1] }
        })
      }
      )
    },
    cronometros_lista: function (newValue, oldValue) {
      const tmp = []
      newValue.forEach(function (cronometro) {
        const duracao_original = moment.duration(cronometro.duracao_cronometro)
        let duracao_atual
        if (cronometro.status === 'S') { // stop
          tmp.push(false)

          if (cronometro.last_stop_duration) { duracao_atual = moment.duration(cronometro.last_stop_duration) } else { duracao_atual = moment.duration(cronometro.duracao_cronometro) }
          duracao_atual = duracao_atual._milliseconds
        } else if (cronometro.status === 'R') { // reset
          tmp.push(false)

          duracao_atual = moment.duration(cronometro.duracao_cronometro)
          duracao_atual = duracao_atual._milliseconds
        } else if (cronometro.status === 'I') { // iniciar
          tmp.push(true)

          const ultima_alteracao_status = moment(cronometro.ultima_alteracao_status)
          const now = moment(moment.now())
          const dif = now.diff(ultima_alteracao_status)
          duracao_atual = dif < duracao_original._milliseconds ? duracao_original._milliseconds - dif : duracao_original._milliseconds
        }
        const duration = {
          _original: duracao_original._milliseconds,
          _atual: duracao_atual
        }
        cronometro.duracao_cronometro = duration
      })
      this.counting = tmp
    },
    selecionado_painel: function (newValue, oldValue) {
      if (newValue === true) {
        this.cronometros_lista.forEach(function (cronometro) {
          // Recalcula o tempo do cronômetro quando alterna entre as abas
          // Adicionar Parlamentar e Painel da Lista de Discurso
          if (cronometro.status === 'I') { // iniciar
            const duracao_original = cronometro.duracao_cronometro._original
            const ultima_alteracao_status = moment(cronometro.ultima_alteracao_status)
            const now = moment(moment.now())
            const dif = now.diff(ultima_alteracao_status)
            const duracao_atual = dif < duracao_original ? duracao_original - dif : duracao_original
            const duration = {
              _original: duracao_original,
              _atual: duracao_atual
            }
            cronometro.duracao_cronometro = duration
          }
        })
      }
    }
  },
  methods: {
    saveParlamentarLista: function saveParlamentarLista () {
      const lista_ids_parls = []
      for (const p of this.parlamentares_selecionados) {
        lista_ids_parls.push(p.id)
      }
      const url = window.location.href
      const sessao_pk = url.split('/')[4]
      $.get('/sistema/salva-listadiscurso-parlamentares/',
        {
          parlamentares_selecionados: lista_ids_parls,
          lista_selecionada: this.lista_selecionada.id,
          sessao_pk: sessao_pk
        }, function (data, status) {
          if (status === 'success') {
            /* eslint-disable no-console */
            console.log('Salvo.')
            /* eslint-enable no-console */
          }
        })
    },
    setOrador: function setOrador (selected_index) {
      const parl_selec_id = this.parlamentares_selecionados[selected_index].id
      const url = window.location.href
      const sessao_pk = url.split('/')[4]
      if (this.orador !== parl_selec_id) {
        this.orador = parl_selec_id
      } else {
        this.orador = -1
      }
      $.get('/sistema/salva-orador-listadiscurso/',
        {
          orador_pk: this.orador,
          tipo_lista_pk: this.lista_selecionada.id,
          sessao_pk: sessao_pk
        }, function (data, status) {
          if (status === 'success') {
            /* eslint-disable no-console */
            console.log('Orador Salvo.')
            /* eslint-enable no-console */
          }
        })
    },
    startCountdown: function (index) {
      this.$refs.countdown[index].start()
      Vue.set(this.counting, index, true)
      $.get('/painel/cronometro',
        {
          tipo: 'cronometro_' + this.cronometros_lista[index].id,
          action: 'start',
          last_time: '0'
        }
      )
    },
    stopCountdown: function (index) {
      this.$refs.countdown[index]._data.counting = false
      this.cronometros_lista[index].duracao_cronometro._atual = this.$refs.countdown[index]._data.totalMilliseconds
      Vue.set(this.counting, index, false)
      const cron_text = document.getElementById('cronometro_' + this.cronometros_lista[index].id).value
      $.get('/painel/cronometro',
        {
          tipo: 'cronometro_' + this.cronometros_lista[index].id,
          action: 'stop',
          last_time: cron_text
        }
      )
    },
    resetCountdown: function (index) {
      // this.$refs.countdown[index]._data.totalMilliseconds = this.cronometros_lista[index].duracao_cronometro._original;
      this.$refs.countdown[index]._data.counting = false
      this.cronometros_lista[index].duracao_cronometro._atual = this.cronometros_lista[index].duracao_cronometro._original
      Vue.set(this.counting, index, false)
      $.get('/painel/cronometro',
        {
          tipo: 'cronometro_' + this.cronometros_lista[index].id,
          action: 'reset',
          last_time: '0'
        }
      )
    },
    handleCountdownEnd: function (index) {
      Vue.set(this.counting, index, false)
      $.get('/painel/cronometro',
        {
          tipo: 'cronometro_' + this.cronometros_lista[index].id,
          action: 'stop',
          last_time: this.$refs.countdown[index]._data.totalMilliseconds
        }
      )
    },
    transform: function transform (props) {
      Object.entries(props).forEach(([key, value]) => {
        // Adds leading zero
        const digits = value < 10 ? `0${value}` : value
        props[key] = digits
      })
      return props
    },
    abrir_painel: function abrir_painel () {
      const local_url = window.location.href
      const sessao_pk = local_url.split('/')[4]
      const url = '/painel-discurso/' + sessao_pk + '/' + this.lista_selecionada.id
      window.open(url, 'Comprovante', 'width=800, height=800, scrollbars=yes')
      return false
    }
  },
  components: {
    draggable
  }
})

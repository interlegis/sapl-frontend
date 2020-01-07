import './scss/comissoes.scss'
import Vue from 'vue'
import { FormSelectPlugin } from 'bootstrap-vue'
import axios from 'axios'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

Vue.use(FormSelectPlugin)

new Vue({
  delimiters: ['[[', ']]'],
  el: '#app3',
  data () {
    return {
        periodo_list: [],
        comissao_id: '',
        parlamentares: [],
        composicao_id: '',
    }
  },

  methods: {
    getParlamentares (event) {
      if (this.comissao_id) {
        axios.get('/api/comissoes/participacao/?composicao=' + this.composicao_id)
          .then(response => {
            this.parlamentares = response.data.results
          })
          .then(response => {
            this.parlamentares.map((parlamentar) => {
                console.log(parlamentar)
                axios.get('/api/parlamentares/parlamentar/' + parlamentar.parlamentar)
                .then(response => {
                    parlamentar.nome = response.data.__str__
                    // console.log(response.data)
                })
                axios.get('/api/comissoes/cargocomissao/' + parlamentar.cargo)
                .then(response => {
                    parlamentar.cargo = response.data.nome
                })
            })
          })
          .catch(error => {
            console.error('Ocorreu um erro ao obter os dados de parlamentares:' + error)
          })
      }
    },

  },   

  mounted () {
    // Identifica id da comissao
    this.comissao_id = window.location.pathname.split('/')[2]

    // Pega periodos da comissao
    axios.get('/api/comissoes/composicao/?comissao=' + this.comissao_id)
      .then(response => {
        this.periodo_list = response.data.results
        this.composicao_id = response.data.results[0].id
        console.log(this.composicao_id)
        this.getParlamentares()
      })
      .catch(err => {
        console.error('Ocorreu um erro ao obter os períodos da comissao: ' + err)
      })
  }
})

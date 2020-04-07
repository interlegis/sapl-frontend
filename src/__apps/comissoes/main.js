import './scss/comissoes.scss'
import Vue from 'vue'
import { FormSelectPlugin } from 'bootstrap-vue'
import axios from 'axios'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

Vue.use(FormSelectPlugin)

new Vue({
  delimiters: ['[[', ']]'],
  el: '#composicao_list',
  data () {
    return {
        periodo_list: [],
        parlamentares: [],
        comissao_id: '',
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
          .then(() => {
            const parlamentaresMap = this.parlamentares.map((parlamentar) => {
                axios.get('/api/parlamentares/parlamentar/' + parlamentar.parlamentar)
                .then(response => {
                    parlamentar.nome = response.data.__str__
                })
                .then(() => { 
                    axios.get('/api/comissoes/cargocomissao/' + parlamentar.cargo)
                    .then(response => {
                        parlamentar.cargo = response.data.nome
                    })
                    .then(() => {
                        var options = { year: 'numeric', month: 'long', day: 'numeric' };
                        if (parlamentar.data_designacao) {
                            var data_designacao = new Date(parlamentar.data_designacao + ' EDT').toLocaleDateString("pt-BR", options)
                            parlamentar.data_designacao = data_designacao
                        }
                        if (parlamentar.data_desligamento) {
                            var data_desligamento = new Date(parlamentar.data_desligamento + ' EDT').toLocaleDateString("pt-BR", options)
                            parlamentar.data_desligamento = data_desligamento
                        }
                        if (parlamentar.titular) {
                            parlamentar.titular = 'Sim'
                        } else {
                            parlamentar.titular = 'Não'
                        }

                    })
                })
            })
            Promise.all(parlamentaresMap)
          })
          .catch(error => {
            console.error('Ocorreu um erro ao obter os dados de parlamentares:' + error)
          })
      }
    },

  },   

  mounted () {
    // Identifica id da comissao pela url
    this.comissao_id = window.location.pathname.split('/')[2]

    // Requisita periodos da comissao
    axios.get('/api/comissoes/composicao/?comissao=' + this.comissao_id)
      .then(response => {
        this.periodo_list = response.data.results
        this.composicao_id = response.data.results[0].id
        this.getParlamentares()
      })
      .catch(err => {
        console.error('Ocorreu um erro ao obter os períodos da comissao: ' + err)
      })
  }
})

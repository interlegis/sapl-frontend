import './scss/parlamentar.scss'
import Vue from 'vue'
import { FormSelectPlugin } from 'bootstrap-vue'
import axios from 'axios'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

Vue.use(FormSelectPlugin)

new Vue({
  delimiters: ['[[', ']]'],
  el: '#app2',
  data () {
    return {
      nome_pesquisa: '',
      is_pesquisa: false,
      legislatura_selecionada: '',
      legislaturas: [],
      parlamentares: [],
      filter_ativo: '',
    }
  },

  watch: {
    nome_pesquisa: function (val) {
      this.debouncepesquisaParlamentar()
    }
  },

  created () {
    this.debouncepesquisaParlamentar = _.debounce(this.pesquisaParlamentar, 500)
  },

  methods: {
    getParlamentares (event) {
      if (this.legislatura_selecionada) {
        axios.get('/api/parlamentares/parlamentar/' + this.legislatura_selecionada + '/parlamentares_by_legislatura/')
          .then(response => {
            this.parlamentares = response.data
          })
          .catch(error => {
            console.error('Ocorreu um erro ao obter os dados de parlamentares:' + error)
          })
      }
    },

    pesquisaParlamentar (event) {
      axios.get('/api/parlamentares/parlamentar/search_parlamentares/', {
        params: { 'nome_parlamentar': this.nome_pesquisa }
      })
        .then(response => {
          this.parlamentares = response.data
        })
        .catch(error => {
          console.error('Erro ao procurar parlamentar:' + error)
        })
    },

    pesquisaChange (event) {
      this.is_pesquisa = !this.is_pesquisa
      this.filter_ativo = false
      if (this.is_pesquisa) {
        this.parlamentares = []
      } else {
        this.getParlamentares()
      }
    }
  },

  mounted () {
    axios.get('/api/parlamentares/legislatura/')
      .then(response => {
        this.legislaturas = response.data.results
        this.legislatura_selecionada = response.data.results[0].id
      })
      .then(response => {
        this.getParlamentares()
      })
      .catch(err => {
        console.error('Ocorreu um erro ao obter os dados de legislação: ' + err)
      })
  }
})

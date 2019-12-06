import './scss/parlamentar.scss'
import Vue from 'vue'
import Vuex from 'vuex'
import { FormSelectPlugin } from 'bootstrap-vue'
import axios from 'axios'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

Vue.use(FormSelectPlugin)

var legislaturas = []

new Vue({
    delimiters: ['[[', ']]'],
    el: '#app2',
    data() {
        return{
          nome_pesquisa: "",
          is_pesquisa: false,
          legislatura_selecionada:"",
          legislaturas: [],
          parlamentares: [],
        }
        
    },
    
    watch: {
      nome_pesquisa : function (val) {
        this.debouncepesquisaParlamentar()
      }
    },

    created() {
      this.debouncepesquisaParlamentar = _.debounce(this.pesquisaParlamentar, 300)
    },

    methods: {
      getParlamentares(event) {
        console.log("asd")
        if (this.legislatura_selecionada){
          axios.get('/api/parlamentares/parlamentar/' + this.legislatura_selecionada + '/parlamentares_by_legislatura/')
          .then(response => {
            console.log(response)
            this.parlamentares = response.data
          })
          .catch(err => {
            // Do something for an error here
            console.error("Ocorreu um erro ao pegar os dados de parlamentares")
          })
        }
      },

      pesquisaParlamentar(event){
        var data = {'nome_parlamentar':this.nome_pesquisa};
        
        axios({
          method: 'post',
          url: '/api/parlamentares/parlamentar/search_parlamentares/',
          data: data,
          config: { headers: {'Content-Type': 'application/json'}}
          })
          .then((response) => {
            console.log(response.data)  
            this.parlamentares = response.data
          })
          .catch(function (response) {
              console.error("Erro ao procurar parlamentar:" + response);
          });
      },

      pesquisaChange(event){
        this.is_pesquisa=!this.is_pesquisa;
        if (this.is_pesquisa){
          this.parlamentares = []
        }
        else{
          this.getParlamentares()    
        }
      }
    },

    mounted (){
      axios.get('/api/parlamentares/legislatura/')
        .then(response => {
          console.log(response.data.results)
          this.legislaturas = response.data.results
          this.legislatura_selecionada =  response.data.results[0].id
        })
        .then(response => {
          this.getParlamentares()
          console.log(this.parlamentares)
        })
        .catch(err => {
          // Do something for an error here
          console.error("Ocorreu um erro ao pegar os dados de legislação: " + err)
        })
    }
  }) 


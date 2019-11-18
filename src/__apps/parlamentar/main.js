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
      this.debouncepesquisaParlamentar = _.debounce(this.pesquisaParlamentar, 200)
    },

    methods: {
      getParlamentares(event) {
        console.log("asd")
        if (this.legislatura_selecionada){
          axios.get('/parlamentar/get_parlamentare_by_legislaturas_json/'+this.legislatura_selecionada)
          .then(response => {
            console.log(response.data['parlamentares'][0])
            this.parlamentares = response.data['parlamentares']
          })
          .catch(err => {
            // Do something for an error here
            console.log(err)
            console.error("Ocorreu um erro ao pegar os dados de parlamentares")
          })
        }
      },

      pesquisaParlamentar(event){
        var bodyFormData = new FormData();
        bodyFormData.set('nome', this.nome_pesquisa);
        
        axios({
          method: 'post',
          url: '/parlamentar/search_parlamentare_json/',
          data: bodyFormData,
          config: { headers: {'Content-Type': 'multipart/form-data' }}
          })
          .then((response) => {
              this.parlamentares = response.data['parlamentares']
          })
          .catch(function (response) {
              console.log(response);
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
      axios.get('/parlamentar/get-all-legislaturas_json/')
        .then(response => {
          console.log(response)
          this.legislaturas = response.data.legislaturas
          this.legislatura_selecionada =  response.data.legislaturas[0][0]
        })
        .then(response => {
          this.getParlamentares()
        })
        .catch(err => {
          // Do something for an error here
          console.log(err)
          console.error("Ocorreu um erro ao pegar os dados de legislação")
        })
    }
  }) 


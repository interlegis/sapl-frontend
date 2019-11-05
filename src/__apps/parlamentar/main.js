import './scss/parlamentar.scss'
import Vue from 'vue'
import Vuex from 'vuex'
import { FormSelectPlugin } from 'bootstrap-vue'


Vue.use(FormSelectPlugin)

var legislaturas = []

new Vue({
    delimiters: ['[[', ']]'],
    el: '#app2',
    data() {
        return{
          legislaturas: [],
          options: [
            {text:"asd",value:1},
          ],
          legislatura_selecionada:"asdasd"
        }
    },

    mounted (){
      fetch('/parlamentar/get-all-legislaturas_json/')
        .then(response => {
          return response.json()
        })
        .then(data => {
           // Work with JSON data here
           this.legislaturas = data.legislaturas
        })
        .catch(err => {
          // Do something for an error here
        })
    }
  }) 


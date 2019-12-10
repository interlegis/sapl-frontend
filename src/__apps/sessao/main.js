import Vue from 'vue'
import draggable from 'vuedraggable'
import { ListGroupPlugin } from 'bootstrap-vue'
import axios from "axios";
import './sessao.css'
import VueCountdown from '@chenfengyuan/vue-countdown';
import AsyncComputed from 'vue-async-computed';

Vue.use(ListGroupPlugin);
Vue.use(AsyncComputed);
Vue.component(VueCountdown.name, VueCountdown);

var moment = require('moment');

var lista_discurso_app = new Vue({ 
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
            async get() { 
                return axios.get('/api/sessao/tipolistadiscurso/?page_size=200').then( response =>
                    response.data.results
                );
            },
            default: []
        },
        parlamentares:{
            async get(){
                let sessao_pk = window.location.href.split('/')[4];
                let url = '/api/sessao/sessaoplenaria/'+sessao_pk+'/parlamentares_presentes/?page_size=200';
                return axios.get(url).then( (response) =>
                    response.data.results.map(function (p){
                        return {"id": p.id, "nome":p.nome_parlamentar};
                    })
                );
            },
            default: []
        },
        
    },
    computed: {
    },
    watch: {
        lista_selecionada: async function (newValue, oldValue) {

            let url = '/api/painel/cronometro/?cronometrolista__tipo_lista_id=' + this.lista_selecionada.id;
            this.cronometros_lista = await axios.get(url).then( response => 
                response.data.results
            );
                
            let sessao_pk = window.location.href.split('/')[4];
            axios.get('/sistema/get-orador-lista/' + sessao_pk + '/' 
                      + this.lista_selecionada.id).then( response =>
                {
                    this.orador=response.data.orador[0];
                    this.parlamentares_selecionados = response.data.parlamentares.map(function (p){
                        return {'id':p[0], 'nome': p[1]};
                    });
                }
            );
        },
        cronometros_lista: function(newValue, oldValue){
            let tmp = [];
            newValue.forEach(function(cronometro) {
                let duracao_original = moment.duration(cronometro.duracao_cronometro);
                let duracao_atual;
                if(cronometro.status == "S"){ // stop
                    tmp.push(false);

                    if(cronometro.last_stop_duration)
                        duracao_atual = moment.duration(cronometro.last_stop_duration);
                    else
                        duracao_atual = moment.duration(cronometro.duracao_cronometro);
                    duracao_atual = duracao_atual._milliseconds;
                }
                else if(cronometro.status == "R"){ // reset
                    tmp.push(false);

                    duracao_atual = moment.duration(cronometro.duracao_cronometro);
                    duracao_atual = duracao_atual._milliseconds;
                }
                else if(cronometro.status == "I"){ // iniciar
                    tmp.push(true);

                    let ultima_alteracao_status = moment(cronometro.ultima_alteracao_status);
                    let now = moment(moment.now());
                    let dif = now.diff(ultima_alteracao_status);
                    duracao_atual = dif < duracao_original._milliseconds? duracao_original._milliseconds - dif : duracao_original._milliseconds;
                }
                let duration = {
                        _original: duracao_original._milliseconds,
                        _atual: duracao_atual
                }
                cronometro.duracao_cronometro = duration;
                
            });
            this.counting = tmp;
        },
        selecionado_painel: function(newValue, oldValue){
            if(newValue==true){
                this.cronometros_lista.forEach(function(cronometro) {
                    // Recalcula o tempo do cronômetro quando alterna entre as abas
                    // Adicionar Parlamentar e Painel da Lista de Discurso
                    if(cronometro.status == "I"){ // iniciar
                        let duracao_original = cronometro.duracao_cronometro._original;
                        let ultima_alteracao_status = moment(cronometro.ultima_alteracao_status);
                        let now = moment(moment.now());
                        let dif = now.diff(ultima_alteracao_status);
                        let duracao_atual = dif < duracao_original? duracao_original - dif : duracao_original;
                        let duration = {
                            _original: duracao_original,
                            _atual: duracao_atual
                        }
                        cronometro.duracao_cronometro = duration;
                    }
                });
            }
        },
    },
    methods: {
        saveParlamentarLista: function saveParlamentarLista(){
            let lista_ids_parls = [];
            for(let p of this.parlamentares_selecionados){
                lista_ids_parls.push(p.id);
            }
            let url = window.location.href;
            let sessao_pk = url.split('/')[4];
            $.get("/sistema/salva-listadiscurso-parlamentares/",
            { 
                parlamentares_selecionados: lista_ids_parls,
                lista_selecionada: this.lista_selecionada.id,
                sessao_pk: sessao_pk,
            }, function(data, status) {
                if(status == "success"){
                    console.log("Salvo.");
                }
            });
        },
        setOrador: function setOrador(selected_index){
            let parl_selec_id = this.parlamentares_selecionados[selected_index].id;
            let url = window.location.href;
            let sessao_pk = url.split('/')[4];
            if(this.orador != parl_selec_id){
                this.orador = parl_selec_id;
            } else {
                this.orador=-1; 
            }
            $.get("/sistema/salva-orador-listadiscurso/",
            { 
                orador_pk: this.orador,
                tipo_lista_pk: this.lista_selecionada.id,
                sessao_pk: sessao_pk,
            }, function(data, status) {
                if(status == "success"){
                    console.log("Orador Salvo.");
                }
            });
        },
        startCountdown: function (index) {
            this.$refs.countdown[index].start();
            Vue.set(this.counting, index, true);
            $.get('/painel/cronometro', 
                { 
                    tipo: 'cronometro_' + this.cronometros_lista[index].id, 
                    action: 'start', 
                    last_time: '0' 
                } 
            );
        },
        stopCountdown: function(index){
            this.$refs.countdown[index]._data.counting = false;
            this.cronometros_lista[index].duracao_cronometro._atual = this.$refs.countdown[index]._data.totalMilliseconds;
            Vue.set(this.counting, index, false);
            let cron_text = document.getElementById('cronometro_'+this.cronometros_lista[index].id).value;
            $.get('/painel/cronometro', 
                { 
                    tipo: 'cronometro_' + this.cronometros_lista[index].id, 
                    action: 'stop', 
                    last_time: cron_text
                } 
            );
        },
        resetCountdown: function(index){
            // this.$refs.countdown[index]._data.totalMilliseconds = this.cronometros_lista[index].duracao_cronometro._original;
            this.$refs.countdown[index]._data.counting = false;
            this.cronometros_lista[index].duracao_cronometro._atual = this.cronometros_lista[index].duracao_cronometro._original
            Vue.set(this.counting, index, false);
            $.get('/painel/cronometro', 
                { 
                    tipo: 'cronometro_' + this.cronometros_lista[index].id, 
                    action: 'reset', 
                    last_time: '0' 
                } 
            );
        },
        handleCountdownEnd: function (index) {
            Vue.set(this.counting, index, false);
            $.get('/painel/cronometro', 
                {
                    tipo: 'cronometro_' + this.cronometros_lista[index].id, 
                    action: 'stop', 
                    last_time: this.$refs.countdown[index]._data.totalMilliseconds
                } 
            );
        },
        transform: function transform(props) {
            Object.entries(props).forEach(([key, value]) => {
                // Adds leading zero
                const digits = value < 10 ? `0${value}` : value;
                props[key] = digits;
            });
            return props;
        },
        abrir_painel: function abrir_painel(){
            let local_url = window.location.href;
            let sessao_pk = local_url.split('/')[4];
            let url = "/painel-discurso/" + sessao_pk + "/" + this.lista_selecionada.id
            window.open(url,'Comprovante','width=800, height=800, scrollbars=yes');
            return false;
        }
     },
    components: {
        draggable
    },
});

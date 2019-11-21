import Vue from 'vue'
import axios from "axios";

var mesa_diretora_app = new Vue({
    delimiters: ['[[', ']]'],
    el: "#mesa-diretora",
    data: {
        legislaturas: [],
        legislatura_selecionada: '',
        sessoes: [],
        sessao_selecionada: '',
        parlamentares_mesa: [],
        parlamentares_selecionados: [],
    },
    created: function() {
        axios.get('/mesa-diretora/dados').then(response => {
            this.legislaturas = response.data.legislaturas
            if (this.legislaturas !== undefined && this.legislaturas.length > 0)
                this.legislatura_selecionada = this.legislaturas[0].id
        });
    },
    watch: {
        legislatura_selecionada: function() {
            if (this.legislatura_selecionada !== undefined) {
                var legislatura = this.legislaturas.filter(x => x.id === this.legislatura_selecionada)

                if (legislatura !== undefined && legislatura.length > 0) {
                    console.log(legislatura)
                    this.sessoes = legislatura[0].sessoes
                    if (this.sessoes !== undefined && this.sessoes.length > 0) {
                        this.sessao_selecionada = this.sessoes[0].id
                    }

                }
            }
        },
        sessao_selecionada: function() {
            var mesa = this.legislaturas
                           .find( x => x.id === this.legislatura_selecionada )
                           .sessoes
                           .find( x => x.id === this.sessao_selecionada )

            console.log(mesa)

            this.parlamentares_mesa = mesa.parlamentares_mesa
        },
    },
    methods: {
        excluir: function(event) {
            var parlamentares_mesa = this.parlamentares_mesa
            console.log(this.parlamentares_selecionados)

            // Remove todos os parlamentares selecionados
            var nova_lista = this.parlamentares_mesa.filter( p => this.parlamentares_selecionados.findIndex( o => o.id === p.mesa_cargo_id ) === -1);

            this.parlamentares_mesa = nova_lista
            console.log(nova_lista);
        }
    },

});
<template>
  <router-link :class="'sessao-plenaria-item-list'" :to="{ name: 'sessao_plenaria_online_link', params: {id: sessao.id} }" @click.native="sendStore">
    <h6 class="tit">
      {{titulo}}
    </h6>
    <small>
      <span class="sub">{{subtitulo}}</span> – <span class="dat-text">{{date_text}}</span>
    </small>
  </router-link>
</template>
<script>
import Resources from '@/resources'
import { EventBus } from '@/event-bus'
export default {
  name: 'sessao-plenaria-item-list',
  props: ['sessao'],
  data () {
    return {
      utils: Resources.Utils,
      app: ['sessao', 'parlamentares'],
      model: ['sessaoplenaria', 'sessaolegislativa', 'tiposessaoplenaria', 'legislatura'],

      data_inicio: new Date(),
      sessao_legislativa: { numero: '' },
      tipo: { nome: '' },
      legislatura: { numero: '' },

      metadata: {
        sessao: { app: 'sessao', model: 'sessaoplenaria', id: this.sessao.id },
        sessao_legislativa: { app: 'parlamentares', model: 'sessaolegislativa', id: this.sessao.sessao_legislativa },
        legislatura: { app: 'parlamentares', model: 'legislatura', id: this.sessao.legislatura },
        tipo: { app: 'sessao', model: 'tiposessaoplenaria', id: this.sessao.tipo }
      }
    }
  },
  computed: {
    titulo: function () {
      let sessao = this.sessao
      let tipo = this.tipo
      let data_inicio = this.data_inicio
      return `${sessao.numero}ª ${tipo.nome} da 
              ${data_inicio.getDate() > 15 ? 2 : 1}ª Quizena do Mês de 
              ${this.month_text(data_inicio.getMonth())} de 
              ${data_inicio.getFullYear()}
              `
    },
    subtitulo: function () {
      return `${this.sessao_legislativa.numero}ª Sessão Legislativa da 
              ${this.legislatura.numero}ª Legislatura`
    },
    date_text: function () {
      return `${this.data_inicio.getDate()} de 
              ${this.month_text(this.data_inicio.getMonth())} de
              ${this.data_inicio.getFullYear()} - ${this.sessao.hora_inicio}`
    }
  },
  methods: {
    sendStore () {
      this.insertInState({
        app: 'sessao',
        model: 'sessaoplenaria',
        id: this.sessao.id,
        value: this.sessao
      })
    },
    month_text (month_num) {
      let month = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
      ]
      return month[month_num]
    },
    fetch () {
      let _this = this
      _.mapKeys(_this.metadata, function (value, key) {
        let meta = _this.metadata[key]
        meta.component = _this
        let sl = _this.getModel(meta)
        if (sl === null) {
          _this
            .insertInState(meta)
            .then((response) => {
              _this[key] = _this.getModel(meta)[meta.id]
            })
        } else {
          if (sl[meta.id] === undefined) {
            _this
              .$nextTick()
              .then(() => {
                setTimeout(function () {
                  _this.fetch()
                }, 100)
              })
          } else {
            _this[key] = sl[meta.id]
          }
        }
      })
    }
  },
  mounted: function () {
    this.data_inicio = this.stringToDate(this.sessao.data_inicio, 'yyyy-mm-dd', '-')
    this.metadata.sessao_legislativa.id = this.sessao.sessao_legislativa
    this.metadata.tipo.id = this.sessao.tipo
    this.metadata.legislatura.id = this.sessao.legislatura

    this.fetch()
  },
  created: function () {
    let _this = this
    EventBus.$on('ws-message', function (data) {
      if (_.indexOf(_this.app, data.message.app) !== -1 &&
          _.indexOf(_this.model, data.message.model) !== -1) {
        _this.fetch()
      }
    })
  }
}
</script>
<style lang="scss">
.sessao-plenaria-item-list {
    //background-color: rgba($color: #f5f5f5, $alpha: 0.9);
    //text-align: center;
    display: block;
    background-image: url("~@/assets/img/bg.png");
    border-bottom: 1px solid #d5d5d5;
    padding: 11px;
    line-height: 1.1;
    cursor: pointer;

    &:nth-child(odd) {
     // background-color: rgba($color: #e0e0e0, $alpha: 0.9);
    }

    &:hover {
      background-color: rgba($color: #f5f5f5, $alpha: 0.9);
      text-decoration: none;
    }
    .sub, .dat-text {
      color: #777;
    }
    h6 {
      color: #007;
      margin-bottom: 0px;
    }
}
</style>

<template>
  <div class="sessao-plenaria-item-list">
    <h6 class="tit">
      {{titulo}}
    </h6>
    <small>
      <span class="sub">{{subtitulo}}</span> – <span class="dat-text">{{date_text}}</span>
    </small>
  </div>
</template>
<script>
import Resources from '@/resources'
export default {
  name: 'sessao-plenaria',
  props: ['sessao'],
  data () {
    return {
      utils: Resources.Utils,

      data_inicio: new Date(),
      sessao_legislativa: { numero: '' },
      tipo: { nome: '' },
      legislatura: { numero: '' },

      metadata: {
        sessao_legislativa: { app: 'parlamentares', model: 'sessaolegislativa', id: this.sessao.sessao_legislativa },
        legislatura: { app: 'parlamentares', model: 'legislatura', id: this.sessao.legislatura },
        tipo: { app: 'sessao', model: 'tiposessaoplenaria', id: this.sessao.tipo }
      }
    }
  },
  watch: {
    sessao: function (nv, ov) {
      this.data_inicio = this.stringToDate(nv.data_inicio, 'yyyy-mm-dd', '-')
      this.metadata.sessao_legislativa.id = nv.sessao_legislativa
      this.metadata.tipo.id = nv.tipo
      this.fetch()
    }
  },
  computed: {
    titulo: function () {
      return `${this.sessao.numero}ª ${this.tipo.nome} da 
              ${this.data_inicio.getDate() > 15 ? 2 : 1}ª Quizena do Mês de 
              ${this.month_text(this.data_inicio.getMonth())} de 
              ${this.data_inicio.getFullYear()}
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
              _this[key] = _this.getModel(meta)
            })
        } else {
          _this[key] = sl
        }
      })
    }
  }
}
</script>
<style lang="scss">
.sessao-plenaria-item-list {
    //background-color: rgba($color: #f5f5f5, $alpha: 0.9);
    //text-align: center;
    background-image: url("~@/assets/img/bg.png");
    border-bottom: 1px solid #d5d5d5;
    padding: 15px;
    line-height: 1.2;
    cursor: pointer;

    &:nth-child(odd) {
     // background-color: rgba($color: #e0e0e0, $alpha: 0.9);
    }

    &:hover {
      background-color: rgba($color: #f5f5f5, $alpha: 0.9);
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

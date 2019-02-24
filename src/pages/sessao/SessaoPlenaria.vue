<template>
  <div class="sessao-plenaria">
    <h4 class="tit">
      {{titulo}}
    </h4>
    <div class="sub">
    {{subtitulo}}
    </div>
    <div class="dat-text">
      {{date_text}}
    </div>
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
              ${this.data_inicio.getFullYear()}.
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
.sessao-plenaria {
    //background-color: rgba($color: #f5f5f5, $alpha: 0.9);
    text-align: center;
    background-image: url("~@/assets/img/bg.png");
    padding: 15px;
    cursor: pointer;
    &:hover {
      background-color: rgba($color: #f5f5f5, $alpha: 0.9);
    }
}
</style>

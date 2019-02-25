<template>
  <div class="sessao-plenaria-online">
    <div  v-if="sessao" >
    <sessao-plenaria-item-list :sessao="sessao"></sessao-plenaria-item-list>

    </div>
  </div>
</template>
<script>
import SessaoPlenariaItemList from './SessaoPlenariaItemList'
import Resources from '@/resources'
export default {
  name: 'sessao-plenaria-online',
  components: {
    SessaoPlenariaItemList
  },
  data () {
    return {
      utils: Resources.Utils,
      sessao: null
    }
  },
  mounted: function () {
    let _this = this
    let id = _this.$route.params.id
    let meta = {
      app: 'sessao',
      model: 'sessaoplenaria',
      id: id
    }

    let sessao = _this.getModel(meta)
    if (sessao === null || !sessao.hasOwnProperty(id)) {
      _this
        .insertInState(meta)
        .then(() => {
          sessao = _this.getModel(meta)
          this.sessao = sessao[id]
        })
    } else {
      this.sessao = sessao[id]
    }
  },
  methods: {

  },
  created: function () {

  }
}
</script>

<style lang="scss">
.sessao-plenaria-online {
  .sessao-plenaria-item-list {
    padding: 10px;
  }

}
</style>

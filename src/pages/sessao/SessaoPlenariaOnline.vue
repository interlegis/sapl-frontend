<template>
  <div class="sessao-plenaria-online">
    <sessao-plenaria-item-list v-for="(item, key) in sessao" :key="key" :sessao="item"></sessao-plenaria-item-list>
  </div>
</template>
<script>
import SessaoPlenariaItemList from './SessaoPlenariaItemList'
export default {
  name: 'sessao-plenaria-online',
  components: {
    SessaoPlenariaItemList
  },
  data () {
    return {
      sessao: []
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
          this.sessao.push(sessao[id])
        })
    } else {
      this.sessao.push(sessao[id])
    }
  }
}
</script>

<style lang="scss">

</style>

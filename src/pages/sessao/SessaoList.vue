<template>
  <div class="sessaoplenaria-list">
    <form-sessao-list></form-sessao-list>
    <div class="inner-list">

    </div>
  </div>
</template>

<script>
import FormSessaoList from './FormSessaoList'
import Resources from '@/resources'
import { EventBus } from '@/event-bus'
export default {
  name: 'sessao-list',
  components: {
    FormSessaoList
  },
  data () {
    return {
      utils: Resources.Utils,
      app: 'sessao',
      model: 'sessaoplenaria',
      page: 1,
      ordering: '-data_inicio',
      total_pages: 1,
      sessoes: []
    }
  },
  methods: {
    fetch () {
      let _this = this
      _this.utils.getModelOrderedList(_this.app, _this.model, _this.ordering, _this.page)
        .then((response) => {
          _this.sessoes = response.data.results
          _this.total_pages = response.data.pagination.total_pages
        })
        .catch((response) => _this.sendMessage(
          { alert: 'danger', message: 'Não foi possível recuperar a lista...', time: 5 }))
    }
  },
  created: function () {
    let _this = this
    _this.fetch()
    EventBus.$on('ws-message', function (data) {
      if (data.message.app === _this.app && data.message.model === _this.model) {
        _this.fetch()
      }
    })
  }
}
</script>

<style lang="scss">
.sessaoplenaria-list {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 40px auto;

}
</style>

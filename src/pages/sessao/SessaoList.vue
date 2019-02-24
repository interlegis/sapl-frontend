<template>
  <div class="sessaoplenaria-list">
    <form-sessao-list :pagination="pagination" v-on:nextPage="nextPage" v-on:previousPage="previousPage" v-on:currentPage="currentPage"></form-sessao-list>
    <div class="inner-list">
      <sessao-plenaria :sessao="item" v-for="(item, key) in sessoes" :key="key"></sessao-plenaria>
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/event-bus'
import Resources from '@/resources'
import FormSessaoList from './FormSessaoList'
import SessaoPlenaria from './SessaoPlenaria'
export default {
  name: 'sessao-list',
  components: {
    FormSessaoList,
    SessaoPlenaria
  },
  data () {
    return {
      utils: Resources.Utils,
      app: 'sessao',
      model: 'sessaoplenaria',
      ordering: '-data_inicio',
      sessoes: [],
      pagination: {}
    }
  },
  methods: {
    currentPage (value) {
      this.fetch(value)
    },
    nextPage () {
      return this.pagination.next_page !== null ? this.fetch(this.pagination.next_page) : null
    },
    previousPage () {
      return this.pagination.previous_page !== null ? this.fetch(this.pagination.previous_page) : null
    },
    fetch (page) {
      let _this = this
      _this.utils.getModelOrderedList(_this.app, _this.model, _this.ordering, page)
        .then((response) => {
          _this.sessoes = response.data.results
          _this.pagination = response.data.pagination
        })
        .catch((response) => _this.sendMessage(
          { alert: 'danger', message: 'Não foi possível recuperar a lista...', time: 5 }))
    }
  },
  created: function () {
    let _this = this
    _this.fetch(1)
    EventBus.$on('ws-message', function (data) {
      if (data.message.app === _this.app && data.message.model === _this.model) {
        _this.fetch(_this.pagination.page)
      }
    })
  }
}
</script>

<style lang="scss">
.sessaoplenaria-list {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
  grid-row-gap: 15px;
  .inner-list {
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 1px;
  }
}

</style>

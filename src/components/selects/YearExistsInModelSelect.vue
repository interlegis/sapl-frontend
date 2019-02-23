<template>
  <div>
    <b-form-select v-model="selected" :options="options" size="sm"/>
  </div>
</template>

<script>

import Resources from '@/resources'
import { EventBus } from '@/event-bus'

export default {
  name: 'year-exists-in-model-select',
  props: ['app', 'model', 'label'],
  data () {
    return {
      utils: Resources.Utils,

      selected: null,
      options: [
        { value: null, text: this.label }
      ]
    }
  },
  methods: {
    fetch () {
      this.utils.getYearsChoiceList(this.app, this.model)
        .then((response) => {
          this.options = response.data
          this.options.unshift({ value: null, text: this.label })
        })
        .catch((response) => this.sendMessage(
          { alert: 'danger', message: 'Não foi possível recuperar a lista de anos', time: 5 }))
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

</style>

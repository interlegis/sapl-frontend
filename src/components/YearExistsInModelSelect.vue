<template>
  <div>
    <b-form-select v-model="selected" :options="options" size="sm"/>
  </div>
</template>

<script>

import Resources from '@/resources'

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
  mounted: function () {
    this.utils.getYearsChoiceList(this.app, this.model)
      .then((response) => {
        this.options = response.data
        this.options.unshift({ value: null, text: this.label })
      })
      .catch((response) => this.sendMessage(
        { alert: 'danger', message: 'Não foi possível recuperar a lista de anos', time: 5 }))
  }
}
</script>

<style lang="scss">

</style>

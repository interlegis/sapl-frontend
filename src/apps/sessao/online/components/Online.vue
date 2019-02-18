<template>
  <div class="app-sessao-online">
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'online',
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
    ...mapActions([
      'sendMessage'
    ])
  },
  mounted: function () {
    document.querySelector('body').classList.add('body-sessao-online')

    this.sendMessage({ alert: 'success', message: 'ok ok ok 10', time: 10 })
    this.sendMessage({ alert: 'danger', message: 'ok ok ok 20', time: 20 })
    this.sendMessage({ alert: 'danger', message: 'ok ok ok 30', time: 30 })
  }
}
</script>

<style lang="sass">

  .body-sessao-online
    overflow: hidden

  .app-sessao-online
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    background-color: rgba(#f9f9f9, 0.95)
    z-index: 1000
    display: grid
    grid-template-columns: 50px 50px 50px 50px
    grid-template-rows: auto

</style>

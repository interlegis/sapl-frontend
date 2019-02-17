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
    this.sendMessage({ alert: 'alert-success', message: 'ok ok ok 1' })
    this.sendMessage({ alert: 'alert-danger', message: 'ok ok ok 2' })
    this.sendMessage({ alert: 'alert-danger', message: 'ok ok ok 3' })
  }
}
</script>

<style lang="stylus">
.app-sessao-online
  position fixed
  top 0
  right 0
  bottom 0
  left 0
  background-color rgba(#f9f9f9, 0.95)
  z-index 1000

</style>

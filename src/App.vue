<template>
  <div id="app-frontend-base-content">
    <message></message>
    <router-view></router-view>
  </div>
</template>

<script>
import Message from '@/components/utils/message/Message'
import { mapActions } from 'vuex'
export default {
  name: 'app',
  components: {
    Message
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions([
      'sendMessage'
    ])
  },
  mounted: function () {
    this.sendMessage({ alert: 'success', message: 'ok ok ok 10', time: 5 })
    this.sendMessage({ alert: 'danger', message: 'ok ok ok 20', time: 10 })

    this.$options.sockets.onmessage = (event) => {
      this.sendMessage({ alert: 'info', message: event.data, time: 10 })
    }
  }
}
</script>

<style lang="scss">

</style>

<template>
  <div id="app-frontend-base-content">
    <message></message>
    <router-view></router-view>
  </div>
</template>

<script>
import Message from '@/components/utils/message/Message'
import { mapActions } from 'vuex'
import { EventBus } from '@/event-bus'
export default {
  name: 'app',
  components: {
    Message
  },
  methods: {
    ...mapActions([
      'wsQueueDataReceive'
    ])
  },
  mounted: function () {
    this.sendMessage({ alert: 'info', message: 'Base Atualizada', time: 3 })
    this.$options.sockets.onmessage = (event) => {
      this.sendMessage({ alert: 'info', message: 'Base Atualizada', time: 3 })
      EventBus.$emit('ws-message', JSON.parse(event.data))
      // this.wsQueueDataReceive(JSON.parse(event.data))
    }
  }
}
</script>

<style lang="scss">

</style>

<template>
  <div id="app-frontend-base-content">
    <message></message>
    <router-view></router-view>
  </div>
</template>

<script>
import Message from '@/components/utils/message/Message'
import { EventBus } from '@/event-bus'
export default {
  name: 'app',
  components: {
    Message
  },
  mounted: function () {
    this.$options.sockets.onmessage = (event) => {
      let data = JSON.parse(event.data)

      this.sendMessage({ alert: 'info', message: 'Base Atualizada', time: 3 })
      this.removeFromState(data)

      EventBus.$emit('ws-message', data)
    }
  }
}
</script>

<style lang="scss">

</style>

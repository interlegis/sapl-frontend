<template>
  <div id="app-frontend-base-content">
    <message></message>
    <router-view></router-view>
  </div>
</template>

<script>
import Message from '@/commons/components/message/Message'
export default {
  name: 'app',
  components: {
    Message
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">

</style>

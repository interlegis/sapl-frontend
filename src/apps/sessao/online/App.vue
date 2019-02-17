<template>
  <div id="app">
    <message v-bind:messages="getMessages"></message>
    <router-view></router-view>
  </div>
</template>

<script>
import Message from '@/commons/components/message/Message'
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  components: {
    Message
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      getMessages: 'getMessages'
    })
  }
}
</script>

<style lang="scss">

</style>

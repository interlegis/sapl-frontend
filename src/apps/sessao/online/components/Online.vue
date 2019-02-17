<template>
  <div>
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
    ]),
  },
  mounted: function () {
      this.sendMessage({ alert: 'alert-success', message: 'ok ok ok', time: 120000 })
  }
}
</script>

<style lang="scss">

</style>

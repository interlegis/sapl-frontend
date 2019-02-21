<template>
  <base-layout>

    <template slot="brand">
      <brand></brand>
    </template>

    <template slot="sideleft">
      <side-left></side-left>
    </template>

    <template slot="sideright">
      <side-right></side-right>
    </template>

  </base-layout>
</template>

<script>
import SideRight from './SideRight'
import SideLeft from './SideLeft'
import Brand from './Brand'
import BaseLayout from '@/commons/components/layouts/BaseLayout'
import { mapActions } from 'vuex'
export default {
  name: 'online',
  components: {
    BaseLayout,
    SideRight,
    SideLeft,
    Brand
  },
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
    this.sendMessage({ alert: 'success', message: 'ok ok ok 10', time: 5 })
    this.sendMessage({ alert: 'danger', message: 'ok ok ok 20', time: 10 })

    this.$options.sockets.onmessage = (event) => {
      this.sendMessage({ alert: 'info', message: event.data, time: 10 })
    }
  }
}
</script>

<style lang="sass">

</style>

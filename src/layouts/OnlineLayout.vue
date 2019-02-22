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

    <template slot="main">
      <router-view></router-view>
    </template>

  </base-layout>
</template>

<script>
import SideRight from './fragments/SideRight'
import SideLeft from './fragments/SideLeft'
import Brand from './fragments/Brand'
import BaseLayout from './fragments/BaseLayout'
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
  }
}
</script>

<style lang="sass">

</style>

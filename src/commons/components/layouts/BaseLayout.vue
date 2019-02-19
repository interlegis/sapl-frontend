<template>
  <div class="base-layout">
  </div>
</template>

<script>
export default {
  name: 'base-layout',
  data () {
    return {
    }
  },
  mounted: function () {
    document.querySelector('body').classList.add('body-base-layout')
  }
}
</script>

<style lang="scss">
@import '~bootstrap/scss/bootstrap';

  .body-base-layout {
    overflow: hidden;
  }

  .base-layout {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(#f9f9f9, 0.95);
    z-index: $zindex-fixed;
    display: grid;
    grid-template-columns: 50px 50px 50px 50px;
    grid-template-rows: auto;
  }

</style>

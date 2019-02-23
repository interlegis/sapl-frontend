<template>
  <div class="w-100 d-flex inner-brand">
    <img src='@/assets/img/brasao_transp.gif'/>
    <h5 class="title-brand">
      Câmara Municipal de Jataí - GO<br>
      <small>SAPL - Sistema de Apoio ao Processo Legislativo</small>
    </h5>
  </div>
</template>

<script>
export default {
  name: 'brand',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
.inner-brand {
  height: 100%;
  align-items: center;
  img {
    width: auto;
    height: 100%;
  }
  .title-brand {
    display: inline-block;
    padding-left: 1rem;
    line-height: 1;
    margin: 0;
  }
}
</style>

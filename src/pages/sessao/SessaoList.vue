<template>
  <div class="sessaoplenaria-list">
    <form-sessao-list></form-sessao-list>
    <div class="inner-list">

    </div>
  </div>
</template>

<script>
import FormSessaoList from './FormSessaoList'
export default {
  name: 'sessao-list',
  components: {
    FormSessaoList
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
.sessaoplenaria-list {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 40px auto;

}
</style>

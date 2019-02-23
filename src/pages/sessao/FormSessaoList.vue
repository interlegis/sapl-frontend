<template>
  <div>
    <b-row>
      <b-col cols="3">
        <year-exists-in-model-select class="form-opacity" app="sessao" model="sessaoplenaria" label="Filtre por Ano"></year-exists-in-model-select>
      </b-col>
      <b-col cols="3">
        <month-select class="form-opacity"></month-select>
      </b-col>
      <b-col cols="3">
        <model-select class="form-opacity" app="sessao" model="tiposessaoplenaria" label="Filtre por Tipo de Sessão" choice="nome" ordering="nome"></model-select>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import YearExistsInModelSelect from '@/components/selects/YearExistsInModelSelect'
import MonthSelect from '@/components/selects/MonthSelect'
import ModelSelect from '@/components/selects/ModelSelect'
export default {
  name: 'sessao-list',
  components: {
    YearExistsInModelSelect,
    MonthSelect,
    ModelSelect
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
.form-opacity {
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
}
</style>

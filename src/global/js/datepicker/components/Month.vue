<template>
  <div :class="['teste3', show ? 'show': '']">
 teste
  </div>
</template>


<script>

export default {
  name: "month",
  props: ['input_id', 'value'],
  data() {
    return {
      input: null,
      show: false,
      data: this.value === '' ? new Date() : new Date()

    }
  },
  mounted: function () {
    let _this = this;
    _this.input = this.$el.previousElementSibling

    document.addEventListener("click", function(event){
      if (_this.input !== event.target)
        _this.show = false
    })

    _this.input.addEventListener("close_datainput", function(event) {
      _this.show = false
    })

    _this.input.addEventListener("click", function(event) {
      let dateinputs = document.getElementsByClassName('dateinput')
      _.each(dateinputs, function (input, idx) {
        if (input !== _this.input) {
          let event = new Event('close_datainput');
          input.dispatchEvent(event)
        }
      })

      _this.show = !_this.show
    })
  }
}
</script>
<style lang="sass">
.teste3
  z-index: 1
  position: absolute  
  background-color: white
  display: none
  min-width: 360px
  padding: 3px
  border: 1px solid #ddd
  margin-top: -7px
  margin-left: 5px;
  border-radius: 5px

  &.show
    display: flex

  .vuecal__cell
    padding: 5px 0
    &.today 
      background-color: #aaa

</style>


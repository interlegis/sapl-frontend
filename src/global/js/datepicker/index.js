/* TODO: da mesma forma que jquery-ui/datepicker e outras soluções injetadas em
pequenas partes do front-end não funcionarão corretamente em uma solução que use VueJs,
esta também não funcionará bem com outra app Vue. De acordo com a documentação do Vue,
não é uma boa prática manipular o DOM que o Vue esteja gerenciando. Caso seja construído
outra app Vue que possua objetos com a classe .dateinput, tanto o jquery-ui/datepicker
que está sendo desativo em detrimento desta solução aqui, quanto esta solução aqui
que não usa jquery ou o jquery-ui/datepicker, poderá não funcionar como o esperado.
*/
import Vue from 'vue'
import Month from './components/Month'

Vue.component('Month', Month)

let dateinput = document.querySelectorAll('.dateinput')
let vueDI = []
_.each(dateinput, function (input, index) {
  input.setAttribute('autocomplete', 'off')

  let parent = input.parentElement

  input.id = input.id === "" ? 'dateinput_' + index : input.id
  parent.id = parent.id === "" ? 'container__' + input.id : parent.id

  let app = document.createElement("month")
  app.setAttribute('input_id', input.id)
  app.setAttribute('value', input.value)
  input.parentNode.insertBefore(app, input.nextSibling)

  vueDI.push([
    parent.id,
    new Vue({
      el: '#' + parent.id,
      components: {
        Month,
      },
    })
  ])
})
vueDI = _.fromPairs(vueDI)

export default vueDI
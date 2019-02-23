import axios from 'axios'
const basePath = '/api'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export default {
  Utils: {
    getYearsChoiceList: (app, model) => axios({
      url: `${basePath}/${app}/${model}/years`,
      method: 'GET'
    }),
  }
}
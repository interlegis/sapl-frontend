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
    getModelOrderedList: (app, model, ordering, page=1) => axios({
      url: `${basePath}/${app}/${model}/?o=${ordering}&page=${page}`,
      method: 'GET'
    }),
    getModelList: (app, model, page=1) => axios({
      url: `${basePath}/${app}/${model}/?page=${page}`,
      method: 'GET'
    }),
  }
}
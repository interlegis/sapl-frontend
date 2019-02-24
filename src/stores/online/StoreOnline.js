import {
  REMOVE_FROM_STATE,
  INSERT_IN_STATE
} from './mutation-types'

import Resources from '@/resources'

const mutations = {
  [REMOVE_FROM_STATE] (state, data) { 
    if (!state.cache.hasOwnProperty(data.app)) {
      return
    }    
    if (!state.cache[data.app].hasOwnProperty(data.model)) {
      return
    }  
    if (!state.cache[data.app][data.model][data.id]) {
      return
    }
    delete state.cache[data.app][data.model][data.id]

  },
  [INSERT_IN_STATE] (state, data) {
    if (!state.cache.hasOwnProperty(data.app)) {
      state.cache[data.app] = {}
    }    
    if (!state.cache[data.app].hasOwnProperty(data.model)) {
      state.cache[data.app][data.model] = {}

    }
    state.cache[data.app][data.model][data.value.id] = data.value
  }
}

const state = {
  cache: {}
}

const getters = {
  getModel: (state) => (metadata) => {

    if (!state.cache.hasOwnProperty(metadata.app)) {
      return null
    }    
    if (!state.cache[metadata.app].hasOwnProperty(metadata.model)) {
      return null 
    }    
    if (!state.cache[metadata.app][metadata.model].hasOwnProperty(metadata.id)) {
      return null
    }
    return state.cache[metadata.app][metadata.model][metadata.id]
  }
}

const actions = {
  removeFromState: ({ commit }, data) => commit(REMOVE_FROM_STATE, data),
  insertInState: ({ commit }, metadata) => {
    if (metadata.hasOwnProperty('value')) {
      commit(INSERT_IN_STATE, metadata)
      return
    }
    let utils = Resources.Utils
    return utils
            .getModel(metadata.app, metadata.model, metadata.id)
            .then(response => {
              commit(INSERT_IN_STATE, {
                app: metadata.app,
                model: metadata.model,
                value: response.data
              })
            })
            .catch((response) => metadata.component.sendMessage(
              { alert: 'danger', message: 'Não foi possível fetch...', time: 5 }))
  }
}
export default {
  state,
  mutations,
  getters,
  actions
}

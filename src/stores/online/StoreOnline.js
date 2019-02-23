import {
  QUEUE_DATA_WS,
  SHIFT_VALUE
} from './mutation-types'

const mutations = {
  [QUEUE_DATA_WS] (state, data) {
    state.wsqueue.push(data)
  },
  [SHIFT_VALUE] (state) { 
    state.wsqueue.shift()
  }
}

const state = {
  wsqueue: []
}

const getters = {
  nextForProcessing: ({commit}, state) => {
    if (state.messages !== undefined && state.wsqueue.length > 0) {
      let el = state.wsqueue[0]
      commit(SHIFT_VALUE)
      return el
    }
    return null
  }
}

const actions = {
  wsQueueDataReceive: ({ commit }, data) => commit(QUEUE_DATA_WS, data)
}
export default {
  state,
  mutations,
  getters,
  actions
}

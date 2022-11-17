
const state = {
  keepAliveList: [],
  queueList: []
}

const mutations = {
  updateKeepAlive(state, to) {
    for (const m of to.matched) {
      if (m.meta.keepAlive && !state.keepAliveList.includes(m.name)) {
        state.keepAliveList.push(m.name)
      }
    }
  },
  removeKeepAlive(state, name) {
    const i = this.keepAliveList.indexOf(name)
    if (i !== -1) {
      state.keepAliveList.splice(i, 1)
    }
  },
  updateQueueList(state, to) {
    for (let i = 0; i < state.queueList.length; i++) {
      const item = state.queueList[i]
      if (item.name === to.name) {
        state.queueList.splice(i, state.queueList.length - i)
        break
      }
    }
    state.queueList.push({
      name: to.name,
      query: to.query,
      params: to.params,
      title: to.meta.title
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations
}

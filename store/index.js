export const state = () => ({
  signedIn: false,
  testValue: 'initial',
  userName: ''
})

export const mutations = {
  setUserName(state, payload) {
    state.userName = payload
  },
  setSignedIn(state, payload) {
    console.log('🚀 ~ file: index.js ~ line 7 ~ setSignedIn ~ payload', payload)
    state.signedIn = payload
  },
  testCommit(state, payload) {
    state.testValue = payload
  }
}

export const actions = {
  /**
   * 1. Check if `access_token` exists via `this.$cookies.access_token`
   * 2. If it does, then get the user from `this.$cookies.userName` and set the
   *    user in the State
   *
   */
  nuxtClientInit({ commit }, { req }) {
    if (this.$cookies.get('access_token')) {
      console.log('GOT ACCESS TOKEN')

      commit('setSignedIn', true)
      commit('setUserName', this.$cookies.get('userName'))
    }
  }
}

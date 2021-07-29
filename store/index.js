export const state = () => ({
  signedIn: false,
  testValue: 'initial'
})

export const mutations = {
  tester(state) {
    state.testValue = 'UPDATED'
  },
  setSignedIn(state, payload) {
    console.log('🚀 ~ file: index.js ~ line 7 ~ setSignedIn ~ payload', payload)
    state.signedIn = payload
  }
}

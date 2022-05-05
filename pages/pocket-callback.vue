<template>
  <div>
    <h1>Callback Page</h1>
    <button @click="$store.commit('setSignedIn', true)">Set State</button>
  </div>
</template>

<script>
/* eslint-disable camelcase */
const consumer_key = '92797-bd626bd523c3a7ab5ad3822b'

export default {
  async middleware({ app, store, $cookies, redirect, $axios }) {
    // if (process.server) {
    const code = $cookies.get('code')

    const { data } = await $axios.post('/papi/oauth/authorize', {
      consumer_key,
      code
    })

    await $cookies.set('userName', data.username)
    console.log('THE ACCESS TOKEN ->', data.access_token)
    await $cookies.set('access_token', data.access_token)
    localStorage.setItem('access_token', data.access_token)
    // }
    store.commit('setSignedIn', true)
    store.commit('testCommit', 'WORKED FROM CALLBACK')
    store.commit('setUserName', $cookies.get('userName'))

    return redirect('/dashboard')
  }
  // data: () => ({
  //   responseData: {}
  // })

  // async mounted() {
  //   console.log('GET ACCESS TOKEN HERE')
  //   const code = localStorage.getItem('code')
  //   const { data } = await this.$axios.post('/papi/oauth/authorize', {
  //     consumer_key,
  //     code
  //   })

  //   this.responseData = data
  // }
}
</script>

<style></style>

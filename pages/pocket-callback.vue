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
  async middleware({ app, store, redirect, $axios }) {
    if (process.server) {
      console.log('MIDDLEWARE -> GET ACCESS TOKEN HERE')

      const { $cookies } = app

      // if ($cookies.get('access_token')) return

      const code = $cookies.get('code')

      const { data } = await $axios.post('/papi/oauth/authorize', {
        consumer_key,
        code
      })

      store.commit('setSignedIn', true)
      store.commit('tester')

      console.log(
        '🚀 ~ file: pocket-callback.vue ~ line 26 ~ middleware ~ data',
        data
      )

      $cookies.set('access_token', data.access_token, {
        expires: new Date(2024, 11)
      })

      // redirect('/dashboard')
    }
    // return redirect('/dashboard')
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

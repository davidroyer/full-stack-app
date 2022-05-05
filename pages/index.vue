<template>
  <div class="container">
    <button
      v-if="!$store.state.signedIn"
      class="button--grey"
      @click="runAuthFlow"
    >
      Run Auth Flow
    </button>
    <nuxt-link v-else class="button--grey" to="/dashboard">
      Go To Dashboard
    </nuxt-link>
  </div>
</template>

<script>
export default {
  methods: {
    async runAuthFlow() {
      const { redirect_uri, consumer_key } = this.$config

      const { data } = await this.$axios.post('/papi/oauth/request', {
        consumer_key,
        redirect_uri
      })

      localStorage.setItem('code', data.code)
      this.$cookies.set('code', data.code, {
        expires: new Date(2024, 11)
      })

      const pocketRedirectUrl = `https://getpocket.com/auth/authorize?request_token=${data.code}&redirect_uri=${redirect_uri}`

      // // window.open(pocketRedirectUrl)
      console.log('runAuthFlow -> data', data)

      window.location = pocketRedirectUrl
    }
  }
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

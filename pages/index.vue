<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">full-stack-app</h1>

      <div>
        <strong>Rendered By:</strong>
        <span>{{ renderedBy }}</span>
      </div>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >
          Documentation
        </a>
        <button class="button--grey" @click="testMyApi">Test My API</button>
        <button class="button--grey" @click="testApi">Test API</button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable camelcase */

const redirect_uri = 'http://localhost:3000/pocket-callback'
const consumer_key = '92797-bd626bd523c3a7ab5ad3822b'

export default {
  asyncData({ $axios }) {
    let renderedBy
    if (process.server) renderedBy = 'Server'
    else renderedBy = 'Client'

    // const { data } = await $axios.post(
    //   'https://getpocket.com/v3/oauth/authorize',
    //   {
    //     consumer_key,
    //     redirect_uri
    //   }
    // )

    // console.log('Pocket -> data', data)
    return { renderedBy }
  },

  methods: {
    async testMyApi() {
      const response = await this.$axios.get('/api/pocket')
      console.log('testMyApi -> response', response)
    },

    async testApi() {
      const { data } = await this.$axios.post('/papi/oauth/request', {
        consumer_key,
        redirect_uri
      })

      console.log('testApi -> data', data)
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

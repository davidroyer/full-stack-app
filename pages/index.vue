<template>
  <div class="container">
    <client-only>
      <VueEditor v-model="content" />
    </client-only>

    <hr />
    <!-- eslint-disable-next-line vue/no-v-html -->
    <section v-html="content" />
    <div>
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
/* eslint-disable no-unused-vars */
// import { VueEditor } from 'vue2-editor'
const redirect_uri = 'http://localhost:3000/pocket-callback'
const consumer_key = '92797-bd626bd523c3a7ab5ad3822b'

export default {
  // components: { VueEditor },
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

  data: () => ({
    content: ''
  }),

  methods: {
    async testMyApi() {
      const response = await this.$axios.get('/api/pocket')
      console.log('testMyApi -> response', response)
    },

    async testApi() {
      const { redirect_uri } = this.$config

      console.log(
        '🚀 ~ file: index.vue ~ line 57 ~ testApi ~ redirect_uri',
        redirect_uri
      )

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
      console.log('testApi -> data', data)

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

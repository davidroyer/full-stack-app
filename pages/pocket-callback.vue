<template>
  <div>
    <h1>Callback Page</h1>
    <pre>
      {{ responseData }}
    </pre>
  </div>
</template>

<script>
/* eslint-disable camelcase */
const consumer_key = '92797-bd626bd523c3a7ab5ad3822b'

export default {
  data: () => ({
    responseData: {}
  }),

  async mounted() {
    console.log('GET ACCESS TOKEN HERE')
    const code = localStorage.getItem('code')
    const { data } = await this.$axios.post('/papi/oauth/authorize', {
      consumer_key,
      code
    })

    this.responseData = data
  }
}
</script>

<style></style>

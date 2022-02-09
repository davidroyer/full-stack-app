<template>
  <div class="mt-10">
    <h1>Dashboard Page</h1>
    <button class="button--grey mb-6" @click="getItems">Get Items</button>
    <div
      v-for="item in items"
      :key="item.item_id"
      class="mb-4 px-4 py-2 border-gray-300 border-2 max-w-lg min-w-min"
    >
      <h3 v-text="item.resolved_title" />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: []
  }),

  methods: {
    async getItems() {
      console.log('env.consumerKey', process.env.CONSUMER_KEY)

      const consumer_key = '92797-bd626bd523c3a7ab5ad3822b'
      const access_token = this.$cookies.get('access_token')

      const { data } = await this.$axios.post('/papi/get', {
        consumer_key,
        access_token,
        count: '100',
        detailType: 'complete',
        enable_cors: 1,
        forcetaglist: 1,
        taglist: 1
        // "since": 1597714160
      })
      console.log('getItems ~ data', data)

      this.items = Object.values(data.list)
    }
  }
}
</script>

<style></style>

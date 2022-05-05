<template>
  <div class="mt-10">
    <div class="flex justify-between">
      <h1>Dashboard Page</h1>
    </div>

    <button class="button--grey mb-6" @click="getItems">Get Items</button>
    <button class="button--grey mb-6" @click="tagUpdate">Tag Update</button>

    <div class="pl-1 pb-2 pt-3 font-bold">Select A Tag</div>
    <VueTypeaheadBootstrap
      v-model="queryByTag"
      :max-matches="1400"
      show-on-focus
      :data="tags || []"
      @hit="handleSelectedTag"
    />

    <hr class="my-20 border-blue-400 border-2" />
    <h2
      v-if="selectedTag"
      class="font-bold uppercase mb-2 text-2xl text-gray-600"
      v-text="selectedTag"
    />
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
import VueTypeaheadBootstrap from 'vue-typeahead-bootstrap'

const consumer_key = '92797-bd626bd523c3a7ab5ad3822b'

export default {
  components: {
    VueTypeaheadBootstrap
  },
  async asyncData({ store, $cookies, $axios }) {
    const access_token = $cookies.get('access_token')

    store.commit('setUserName', $cookies.get('userName'))

    /**
     * GET FULL LIST OF TAGS
     */
    const { data } = await $axios.post('/papi/get', {
      consumer_key,
      access_token,
      count: '1',
      detailType: 'simple',
      taglist: 1
    })

    const { tags } = data

    return {
      access_token: $cookies.get('access_token') || null,
      tags
    }
  },

  data: () => ({
    items: [],
    userInfo: {},
    queryByTag: '',
    selectedTag: null
  }),

  watch: {
    async selectedTag(newTag) {
      console.log('handleSelectedTag ~ Run query with ->', newTag)
      // await Promise.resolve()
      await this.getItems(newTag)
    }
  },
  methods: {
    handleSelectedTag(tag) {
      console.log('handleSelectedTag ~ tag', tag)
      this.selectedTag = tag
    },
    /**
     * Get a list of items
     */
    async getItems(tag) {
      console.log('getItems ~ tag', tag)
      console.log('env.consumerKey', process.env)

      const access_token = this.$cookies.get('access_token')

      const { data } = await this.$axios.post('/papi/get', {
        consumer_key,
        access_token,
        tag,
        count: '100',
        detailType: 'complete'
      })
      console.log('getItems ~ data', data)

      this.items = Object.values(data.list)
    },

    async tagUpdate() {
      // const action = 'tag_rename'
      const access_token = this.$cookies.get('access_token')

      const response = await this.$axios.post('/papi/send', {
        consumer_key,
        access_token,
        actions: [
          {
            action: 'tag_rename',
            old_tag: 'testtag1b',
            new_tag: 'testtag1'
          }
        ]
      })

      console.log('tagUpdate ~ response', response)
    },

    async getUser() {
      const { data } = await this.$axios.post('/papi/getuser', {
        enable_cors: 1,
        consumer_key,
        access_token: this.access_token
      })

      console.log('getUser ~ data', data)
      this.userInfo = data.user
    }
  }
}
</script>

<style lang="postcss"></style>

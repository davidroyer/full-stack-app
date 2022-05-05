const isDev = process.env.NODE_ENV !== 'production'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'pocketeer-app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  mode: 'spa',
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  publicRuntimeConfig: {
    consumer_key: '92797-bd626bd523c3a7ab5ad3822b',
    redirect_uri: isDev
      ? 'http://localhost:3000/pocket-callback'
      : 'https://pocketeer.netlify.app/pocket-callback'
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  // plugins: ['@/plugins/vue2-editor.client.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    'cookie-universal-nuxt'
  ],

  plugins: ['@/plugins/client-init.js'],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    // 'vue2-editor/nuxt',
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'bootstrap-vue/nuxt'
  ],
  bootstrapVue: {
    // Install the `IconsPlugin` plugin (in addition to `BootstrapVue` plugin)
    icons: true
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
    headers: {
      'X-Accept': 'application/json'
    }
  },

  proxy: {
    '/papi/': {
      target: 'https://getpocket.com/v3/',
      pathRewrite: { '^/papi/': '' }
      // changeOrigin: true
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [({ isServer }) => 'vue-typeahead-bootstrap']
  },

  serverMiddleware: {
    '/api': '@/api'
  },

  router: {
    middleware: 'route-controller'
  },

  loadingIndicator: {
    name: 'circle',
    color: '#007bff'
  }
}

import colors from 'vuetify/es5/util/colors'

export default {
  head: {
    titleTemplate: '%s',
    title: 'My Hospital App',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'My Hospital App' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;500&family=Open+Sans:wght@300&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://unpkg.com/ag-grid-community/dist/styles/ag-grid.css',
      },
      {
        rel: 'stylesheet',
        href: 'https://unpkg.com/ag-grid-community/dist/styles/ag-theme-alpine.css',
      },
    ],
  },

  server: {
    port: 3001,
  },

  css: ['~/assets/css/global.scss'],

  plugins: [{ src: '~/plugins/vue-apexchart.js', ssr: false }, { src: '~/plugins/persistedState.client.js' }],

  router: {
    middleware: ['login'],
  },

  components: true,

  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/stylelint-module', '@nuxtjs/vuetify'],

  modules: ['@nuxtjs/axios', '@nuxtjs/pwa', '@nuxtjs/auth-next', '@nuxtjs/toast'],

  axios: {
    baseURL: 'http://localhost:8000/api',
  },

  auth: {
    redirect: {
      login: '/login',
      home: '/reports',
      logout: '/login',
    },

    tokenType: 'Bearer',

    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/api/login',
            method: 'post',
          },
          logout: {
            url: '/api/logout',
            method: 'post',
          },
          user: false,
        },
        user: {
          autoFetch: false,
        },
      },
    },
  },

  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  vuetify: {
    customVariables: ['~/assets/css/variables.scss'],
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        light: {
          primary: colors.pink.darken4,
          secondary: colors.grey.lighten1,
          accent: colors.shades.black,
          error: colors.red.accent3,
        },
      },
    },
  },

  build: {
    // TODO: Need to change these on prod
    // analyze: true,
    // devtools: true,
    vendor: ['vue-apexchart'],
  },
}

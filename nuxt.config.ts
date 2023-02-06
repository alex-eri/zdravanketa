// https://v3.nuxtjs.org/api/configuration/nuxt.config

// import vuetify from 'vite-plugin-vuetify'


// export default defineNuxtConfig({
//   css: ['vuetify/lib/styles/main.sass', '@mdi/css/materialdesignicons.min.css'],
//   build: {
//     transpile: ['vuetify'],
//   },
//   vite: {
//     define: {
//       'process.env.DEBUG': false,
//     },
//   },
// })

import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  css: ['vuetify/styles'],
  vite: {
    ssr: {
      noExternal: ['vuetify'],
    },
  },
  nitro: {

    preset: 'digital-ocean',

  },
  hooks: {
    'vite:extendConfig': (config, { isClient, isServer }) => {
      config?.plugins?.push(vuetify());
    }
  },
})
import '@mdi/font/css/materialdesignicons.css'

import { defineNuxtPlugin } from '#app'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin(app => {
  const vuetify = createVuetify({ ssr: true })

  app.vueApp.use(vuetify)
})
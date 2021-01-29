import { Context } from '@nuxt/types'
import Vue from 'vue'
import Vuetify, { VContainer, VRow, VCol } from 'vuetify/lib'

Vue.use(Vuetify, {
  components: {
    VContainer, VRow, VCol
  }
})

// @ts-expect-error
const config: UserVuetifyPreset = <%= serialize(options) %> ;

export default (ctx: Context & { $vuetify: any }) => {
  const vuetify = new Vuetify(config)
  ctx.app.vuetify = vuetify
  ctx.$vuetify = vuetify.framework
  const overrides = require.context('~/assets', false, /^\.\/overrides\.scss$/)
  overrides.keys().forEach(overrides)
}

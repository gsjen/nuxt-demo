import { Context } from '@nuxt/types'
import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

// @ts-expect-error
const config: UserVuetifyPreset = <%= serialize(options) %> ;

export default (ctx: Context & { $vuetify: any }) => {
  const vuetify = new Vuetify(config)
  // vuetify.framework.icons.values = {}
  ctx.app.vuetify = vuetify
  ctx.$vuetify = vuetify.framework
  const overrides = require.context('~/assets', false, /^\.\/overrides\.scss$/)
  overrides.keys().forEach(overrides)
}

import { Context } from '@nuxt/types'
import Vue from 'vue'
//@ts-expect-error
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default (ctx: Context) => {
  const vuetify = new Vuetify(ctx.$config.vuetify)
  ctx.app.vuetify = vuetify;
  (ctx as any).$vuetify = vuetify.framework;
  const overrides = require.context('~/assets', false, /^\.\/overrides\.scss$/)
  overrides.keys().forEach(overrides)
}

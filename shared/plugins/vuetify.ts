import { Context } from '@nuxt/types'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default (ctx: Context) => {
  const vuetify = new Vuetify({
    icons: {
      iconfont: 'mdiSvg'
    }
  })
  ctx.app.vuetify = vuetify;
  (ctx as any).$vuetify = vuetify.framework;
}

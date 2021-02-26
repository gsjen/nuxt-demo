import { Context } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'

declare module 'vue/types/vue' {
  interface Vue {
    $media: (path: string, shared?: boolean) => string
  }
}

export default (ctx: Context, inject: Inject) => {
  inject('media', (path: string, shared: boolean) => {
    if (shared) {
      return ctx.isDev ? '/media' + path : `${ctx.env.mediaUrl}${path}`
    }
    return ctx.isDev ? path : `${ctx.env.mediaUrl}/${ctx.env.sitePath}${path}`
  })
}

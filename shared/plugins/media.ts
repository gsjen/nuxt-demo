import { Context } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'

export default (ctx: Context, inject: Inject) => {
  inject('media', (path: string) => {
    return ctx.isDev ? path : `${ctx.env.siteName}/${path}`
  })
}

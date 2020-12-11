import WebFont from 'webfontloader'
import { Context } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'

// @ts-expect-error
const options: WebFont.Config = <%= serialize(options) %> ;

const webfontloader = {
  loading: new Promise((resolve, reject) => {
    options.active = resolve
    options.inactive = reject
    WebFont.load(options)
  })
}

export default (_ctx: Context, inject: Inject) => {
  inject('webfontloader', webfontloader)
}

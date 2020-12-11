import { resolve } from 'path'

export default function () {
  const options = this.options.webfontloader
  if (!options || !Object.keys(options).length) {
    return
  }

  this.addPlugin({
    src: resolve(__dirname, '../plugins/webfontloader.template.ts'),
    filename: 'webfontloader.ts',
    mode: 'client',
    options,
  })
}

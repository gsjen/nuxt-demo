import { resolve } from 'path'

export default function () {
  this.addPlugin({
    src: resolve(__dirname, '../plugins/vuetify.template.ts'),
    filename: 'vuetify.ts',
    options: this.options.vuetify,
  })
}

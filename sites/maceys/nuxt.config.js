const _ = require('lodash')
const base = require('../../nuxt.config.base.js')

module.exports = _.defaultsDeep({
  // srcDir: './sites/maceys',
  // generate: {
  //   dir: './sites/maceys/dist'
  // },
}, base)

const defu = require('defu')
const path = require('path')
const fs = require('fs')
const _ = require('lodash')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

const siteName = _.last(path.parse(process.cwd()).dir.split(path.sep))

const config = {
  target: 'static',

  env: {
    siteName: siteName,
  },

  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  plugins: ['~/../../shared/plugins/media.ts'],
  components: true,

  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxt/content',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  build: {
    transpile: ['vuetify/lib'],
    extend(config, { loaders: { sass, scss } }) {
      config.resolve.alias['shared'] = path.resolve(__dirname, 'shared')
      config.plugins.push(new VuetifyLoaderPlugin())
      sass.additionalData = '@import "~/assets/variables.scss"'
      scss.additionalData = '@import "~/assets/variables.scss";'
    },
    extractCSS: process.env.NODE_ENV === 'production',
  },

  hooks: {
    build: {
      done(builder) {
        if (
          // process.env.GITHUB_REF &&
          // process.env.GITHUB_REF !== 'refs/heads/master'
          true
        ) {
          const robotsPath = path.join(
            builder.nuxt.options.buildDir,
            'robots.txt'
          )
          fs.writeFileSync(robotsPath, 'User-agent: * Disallow: /')
        }
      },
    },
  },

  generate: {
    fallback: '404.html',
  },

  static: {
    cacheDir: path.resolve(
      process.cwd(),
      '../../node_modules/.cache/nuxt/' + siteName
    ),
  },
}

module.exports = {
  merge: (overrides) => defu(overrides, config, getfontConfig(overrides)),
}

function getfontConfig(overrides) {
  const fonts = overrides.fonts || ['Roboto:wght@100;300;400;500;700;900']
  if (fonts.length === 0) {
    return {}
  }

  let href = 'https://fonts.googleapis.com/css2?'
  for (let font of fonts) {
    href += `family=${font}&`
  }
  href += 'display=swap'

  return {
    head: {
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
        },
        {
          rel: 'dns-prefetch',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'stylesheet',
          href,
        },
      ],
    },
  }
}

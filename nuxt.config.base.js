const defu = require('defu')
const path = require('path')
const fs = require('fs-extra')
const _ = require('lodash')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const serveStatic = require('serve-static')

const sitePath = _.last(process.cwd().split(path.sep))

const config = {
  target: 'static',

  env: {
    sitePath: sitePath,
    mediaUrl: 'https://afswebsites-media.netlify.app',
  },

  head: {
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  plugins: ['~/../_shared/plugins/media.ts'],
  components: [
    '~/components',
    {
      path: '~/components/global',
      global: true,
    },
    {
      path: path.join(__dirname, 'sites/_shared/components'),
      level: 1,
    },
    {
      path: path.join(__dirname, 'sites/_shared/components/global'),
      global: true,
      level: 1,
    },
  ],

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
  axios: {
    baseURL: 'http://localhost:5000/',
  },

  content: {
    dir: '../../content',
    markdown: {
      prism: {
        theme: false,
      },
    },
  },

  dir: {
    static: `../../content/${sitePath}/media`,
  },

  build: {
    transpile: ['vuetify/lib'],
    extend(config, { loaders: { sass, scss } }) {
      config.resolve.alias['shared'] = path.resolve(__dirname, 'sites/_shared')

      config.plugins.push(new VuetifyLoaderPlugin())

      sass.additionalData = '@import "~/assets/variables.scss"'
      scss.additionalData = '@import "~/assets/variables.scss";'

      const jsRule = _.find(config.module.rules, { test: /\.m?jsx?$/i })
      const _exclude = jsRule.exclude
      jsRule.exclude = (file) =>
        _exclude(file) ||
        path.dirname(file) ===
          path.resolve(__dirname, 'sites/_shared/assets/icons')
    },
    extractCSS: process.env.NODE_ENV === 'production',
    // analyze, uncomment to analyze build
  },

  hooks: {
    generate: {
      distRemoved(generator) {
        // prevent static files being copied since we're doing it ourselves
        generator.staticRoutes = ''
      },
      async distCopied(generator) {
        const staticRoutes = path.resolve(
          generator.options.srcDir,
          generator.options.dir.static
        )

        await fs.copy(staticRoutes, generator.distPath, {
          filter: (file) => !/\.(png|jpg|jpeg|pdf)$/i.test(file),
        })
      },
      done(generator) {
        if (
          // process.env.GITHUB_REF &&
          // process.env.GITHUB_REF !== 'refs/heads/master'
          true
        ) {
          fs.writeFileSync(
            path.join(generator.distPath, 'robots.txt'),
            'User-agent: * Disallow: /'
          )
        }
      },
    },
  },

  serverMiddleware: [
    {
      path: '/media',
      handler: serveStatic(path.join(__dirname, 'content/_shared/media')),
    },
  ],

  generate: {
    fallback: '404.html',
  },

  static: {
    cacheDir: path.join(__dirname, 'node_modules/.cache/nuxt/' + sitePath),
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

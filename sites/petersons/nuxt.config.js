const base = require('../../nuxt.config.base.js')

module.exports = base.merge({
  vuetify: {
    icons: {
      iconfont: 'mdiSvg',
    },
    theme: {
      themes: {
        light: {
          primary: '#f7921a', // orange
          secondary: '#83ba39', // green
          tertiary: '#4d422a', // brown
          accent: {
            base: '#f5f0dc', // light tan
            darken1: '#fadc97', // tan
          },
        },
      },
      options: {
        customProperties: true,
      },
    },
  },
  fonts: [
    'Cairo:wght@200;300;400;600;700;900',
    'Playfair+Display:ital,wght@1,700',
  ],
  modules: ['~/../_shared/modules/vuetify.js'],
  loading: false,
  plugins: [{ src: '~/../_shared/plugins/dateFilter.ts', mode: 'client' }],
})

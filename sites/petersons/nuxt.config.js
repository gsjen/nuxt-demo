const base = require('../../nuxt.config.base.js')

module.exports = base.merge({
  vuetify: {
    icons: {
      iconfont: 'mdiSvg',
      values: {
        prev:
          'M13.293 6.293L7.586 12 13.293 17.707 14.707 16.293 10.414 12 14.707 7.707z', //bx-chevron-left
        next:
          'M10.707 17.707L16.414 12 10.707 6.293 9.293 7.707 13.586 12 9.293 16.293z', // bx-chevron-right
      },
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
  modules: ['~/../_shared/modules/vuetify.js'],
  loading: false,
  plugins: [{ src: '~/../_shared/plugins/dateFilter.ts' }],

  content: {
    markdown: {
      rehypePlugins: [
        [
          'rehype-add-classes',
          {
            h1: 'text-h1',
            h2: 'text-h2',
            h3: 'text-h3',
            h4: 'text-h4',
            h5: 'text-h5',
            h6: 'text-h6',
            p: 'text-body-2',
          },
        ],
      ],
    },
  },
})

const base = require('../../nuxt.config.base.js')

module.exports = base.merge({
  publicRuntimeConfig: {
    vuetify: {
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
  },
  head: {
    link: [
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;600;700;900&display=swap',
      },
    ],
  },
  // webfontloader: {
  //   google: {
  //     families: [
  //       'Cairo:200,300,400,600,700,900',
  //       ////'Playfair+Display:ital,wght@1,700&display=swap',
  //     ],
  //   },
  //   classes: false,
  // },
  plugins: ['~/../../shared/plugins/vuetify.ts'],
})

<template>
  <v-app :class="{ '--show-banner': showBanner }">
    <AppBanner :banner="banner" v-model="showBanner"></AppBanner>

    <AppSystemBar></AppSystemBar>

    <AppBar @show-drawer="showDrawer = true"></AppBar>

    <AppNavDrawer v-model="showDrawer"></AppNavDrawer>

    <AppView></AppView>

    <AppFooter></AppFooter>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  components: {
    AppBanner: () => import('../components/AppBanner.vue'),
    AppSystemBar: () => import('../components/AppSystemBar.vue'),
    AppBar: () => import('../components/AppBar.vue'),
    AppView: () => import('../components/AppView.vue'),
    AppFooter: () => import('../components/AppFooter.vue'),
  },
  data: () => ({
    banner: null,
    showBanner: false,
    showDrawer: false,
  }),

  head: {
    titleTemplate: (title) =>
      ((title && title + ' - ') || '') + "Peterson's Fresh Market",
  },

  async fetch() {
    const now = this.$nuxt.context.isDev
      ? new Date().valueOf()
      : new Date().toJSON()
    try {
      this.banner =
        (
          await this.$content('petersons/posts/banners')
            .where({
              startDate: {
                $lte: now,
              },
              endDate: {
                $gte: now,
              },
            })
            .sortBy('startDate')
            .limit(1)
            .fetch()
        )[0] || null
    } catch {
      this.banner =
        (
          await this.$content('_shared/posts/banners')
            .where({
              startDate: {
                $lte: now,
              },
              endDate: {
                $gte: now,
              },
            })
            .sortBy('startDate')
            .limit(1)
            .fetch()
        )[0] || null
    }

    this.showBanner = !!this.banner
  },
  fetchOnServer: false,
})
</script>

<style lang="scss">
@import '~vuetify/src/styles/styles.sass';
@import 'assets/variables.scss';

#app {
  &.--show-banner {
    #app-system-bar {
      top: $app-banner-height;
    }
    #app-bar {
      top: $app-banner-height;
    }
  }
}

@media #{map-get($display-breakpoints, 'md-and-down')} {
  #app {
    &.--show-banner {
      #app-system-bar {
        top: $app-banner-mobile-height;
      }
      #app-bar {
        top: $app-banner-mobile-height;
      }
    }
  }
}
</style>

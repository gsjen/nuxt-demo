<template>
  <v-app :class="{ '--show-banner': showBanner }">
    <app-banner :banner="banner" v-model="showBanner"></app-banner>

    <app-system-bar></app-system-bar>

    <app-bar @show-drawer="showDrawer = true"></app-bar>

    <app-nav-drawer v-model="showDrawer"></app-nav-drawer>

    <app-view></app-view>

    <app-footer></app-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'main-layout',

  components: {
    AppBanner: () => import('../components/AppBanner.vue'),
    AppSystemBar: () => import('../components/AppSystemBar.vue'),
    AppBar: () => import('../components/AppBar.vue'),
    AppView: () => import('../components/AppView.vue'),
    AppFooter: () => import('../components/AppFooter.vue'),
  },

  head: {
    titleTemplate: (title) =>
      ((title && title + ' - ') || '') + "Peterson's Fresh Market",
  },

  data() {
    return {
      banner: null,
      showBanner: false,
      showDrawer: false,
    }
  },

  async fetch() {
    const now = process.server ? new Date().valueOf() : new Date().toJSON()
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

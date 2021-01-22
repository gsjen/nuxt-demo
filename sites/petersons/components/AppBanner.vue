<template>
  <v-banner
    id="app-banner"
    :color="post && post.color"
    :dark="post && post.dark"
    sticky
    single-line
    class="text-lg-center"
    :value="value"
  >
    <nuxt-content :document="post"></nuxt-content>
    <template v-slot:actions>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn @click="close" icon v-on="on" v-bind="attrs">
            <v-icon aria-hidden="false" aria-label="Close" role="img"
              >$close</v-icon
            >
          </v-btn>
        </template>
        Close
      </v-tooltip>
    </template>
  </v-banner>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: () => ({
    post: null,
    value: false,
  }),
  methods: {
    close() {
      this.$emit('input', (this.value = false))
    },
  },
  async fetch() {
    try {
      this.post =
        (
          await this.$content('petersons/posts/banners')
            .where({
              startDate: {
                $lte: new Date().valueOf(),
              },
              endDate: {
                $gte: new Date().valueOf(),
              },
            })
            .sortBy('startDate')
            .limit(1)
            .fetch()
        )[0] || null
    } catch {
      this.post =
        (
          await this.$content('_shared/posts/banners')
            .where({
              startDate: {
                $lte: new Date().valueOf(),
              },
              endDate: {
                $gte: new Date().valueOf(),
              },
            })
            .sortBy('startDate')
            .limit(1)
            .fetch()
        )[0] || null
    }

    this.$emit('input', (this.value = !!this.post))
  },
  fetchOnServer: false,
})
</script>

<style lang="scss">
@import '~vuetify/src/styles/styles.sass';
@import '~vuetify/src/components/VMain/_variables.scss';
@import 'assets/variables.scss';

#app-banner {
  top: 0 !important;
  z-index: 5 !important;
  height: $app-banner-height;

  &.expand-transition-enter-active,
  &.expand-transition-leave-active {
    transition: $main-transition !important;
  }

  .v-banner__wrapper {
    height: 100%;
  }

  .v-banner__text {
    margin-left: 20px;

    .v-btn__content {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      max-width: 100%;
      white-space: normal;
      line-height: 20px;
    }
  }

  .v-banner__actions {
    margin-left: 0;
    max-width: 36px;
  }
}

@media #{map-get($display-breakpoints, 'md-and-down')} {
  #app-banner {
    height: $app-banner-mobile-height;

    .v-banner__text {
      margin-left: 0;
    }
  }
}
</style>

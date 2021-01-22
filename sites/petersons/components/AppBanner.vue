<template>
  <v-banner
    id="app-banner"
    :color="banner && banner.color"
    :dark="banner && banner.dark"
    sticky
    single-line
    class="text-lg-center"
    :value="value"
  >
    <nuxt-content :document="banner"></nuxt-content>
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
import Vue, { PropType } from 'vue'
import { IContentDocument } from '@nuxt/content/types/content'

export default Vue.extend({
  props: {
    banner: null as PropType<IContentDocument>,
    value: Boolean,
  },
  methods: {
    close() {
      this.$emit('input', false)
    },
  },
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

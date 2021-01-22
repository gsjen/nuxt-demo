<template>
  <v-app-bar id="app-bar" app absolute prominent flat color="accent darken-1">
    <v-container fill-height>
      <nuxt-link to="/">
        <img
          :src="$media('/logo.png?nf_resize=fit&w=285')"
          :srcset="
            $media('/logo.png?nf_resize=fit&w=285') +
            ' 285w,' +
            $media('/logo.png?nf_resize=fit&w=220') +
            ' 220w'
          "
          sizes="(max-width: 960px) 220px, 285px"
          alt="Peterson's"
          aria-label="Peterson's"
        />
      </nuxt-link>
      <v-spacer></v-spacer>
      <nav-btn
        large
        color="tertiary"
        class="white--text mr-6 hidden-xs-only"
        to="/weekly-ad"
        nuxt
      >
        Weekly Ad
      </nav-btn>
      <nav-btn large color="secondary" class="hidden-xs-only">
        Shop Online
      </nav-btn>
      <nav-btn
        large
        color="tertiary"
        min-width="unset"
        class="white--text ml-6 px-3 hidden-md-and-up"
        @click="$emit('show-drawer')"
      >
        <svg-icon :icon="menuIcon"></svg-icon>
      </nav-btn>
    </v-container>

    <template v-slot:extension>
      <v-container py-0 align-self-start hidden-sm-and-down>
        <nav-bar></nav-bar>
      </v-container>
    </template>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
import { bxMenu } from 'shared/assets/icons/box-icons'
import SvgIcon from 'shared/components/SvgIcon.vue'

export default Vue.extend({
  components: { SvgIcon },
  data: () => ({
    menuIcon: bxMenu,
  }),
  head: {
    link: [
      {
        rel: 'preload',
        as: 'image',
        media: '(max-width: 960px) and (max-resolution: 72dpi)',
        href: 'http://localhost:3000/logo.png?nf_resize=fit&w=220',
      },
      {
        rel: 'preload',
        as: 'image',
        media: '(min-width: 961px)',
        href: 'http://localhost:3000/logo.png?nf_resize=fit&w=285',
      },
    ],
  },
})
</script>

<style lang="scss">
@import '~vuetify/src/styles/styles.sass';

#app-bar {
  transition-property: all;
  border-top: 3px solid var(--v-primary-base) !important;
  z-index: 4;
  height: auto !important;
  margin-top: 40px !important;

  > .v-toolbar__content {
    height: 90px !important;
    > .container {
      margin-top: -3px;

      img {
        position: absolute;
        top: -32px;
        max-width: 285px;
        height: 109px;
      }
    }
  }

  > .v-toolbar__extension {
    height: auto !important;
    margin-top: -3px;
  }
}

@media #{map-get($display-breakpoints, 'sm-and-down')} {
  #app-bar {
    > .v-toolbar__content > .container img {
      top: -26px;
      max-width: 220px;
      height: 85px;
    }
  }
}

@media #{map-get($display-breakpoints, 'xs-only')} {
  #app-bar {
    margin-top: 30px !important;
    > .v-toolbar__content {
      height: 70px !important;
    }
  }
}
</style>

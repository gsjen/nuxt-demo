<template>
  <v-app-bar
    id="app-bar"
    app
    absolute
    prominent
    flat
    color="accent darken-1"
    :height="$vuetify.breakpoint.xs ? 70 : 90"
    :extension-height="navBarHeight"
  >
    <v-container fill-height>
      <nuxt-link to="/">
        <v-img
          :src="$media(`images/logo.png?nf_resize=fit&w=${imageSize}`)"
          contain
          :max-width="imageSize"
        ></v-img>
      </nuxt-link>
      <v-spacer></v-spacer>
      <NavBtn
        large
        color="tertiary"
        class="white--text mr-6 hidden-xs-only"
        to="/weekly-ad"
        nuxt
      >
        Weekly Ad
      </NavBtn>
      <NavBtn large color="secondary" class="hidden-xs-only">
        Shop Online
      </NavBtn>
      <NavBtn
        large
        color="tertiary"
        min-width="unset"
        class="white--text ml-6 px-3 hidden-md-and-up"
        @click="$emit('show-drawer')"
      >
        <svg-icon :icon="menuIcon"></svg-icon>
      </NavBtn>
    </v-container>

    <template slot="extension">
      <v-container py-0 align-self-start hidden-sm-and-down>
        <NavBar :height="navBarHeight"></NavBar>
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
  computed: {
    navBarHeight() {
      if (this.$vuetify.breakpoint.lgAndUp) {
        return 44
      } else if (this.$vuetify.breakpoint.mdAndUp) {
        return 36
      }
      return 0
    },
    imageSize() {
      return this.$vuetify.breakpoint.smAndDown ? 220 : 285
    },
  },
})
</script>

<style lang="scss">
@import '~vuetify/src/styles/styles.sass';

#app-bar {
  border-top: 3px solid var(--v-primary-base) !important;
  z-index: 4;

  > .v-toolbar__content > .container {
    margin-top: -3px;
    .v-image {
      position: absolute;
      top: -32px;
    }
  }

  > .v-toolbar__extension {
    top: -3px;
  }
}

@media #{map-get($display-breakpoints, 'sm-and-down')} {
  #app-bar {
    > .v-toolbar__content > .container .v-image {
      top: -26px;
    }
  }
}
</style>

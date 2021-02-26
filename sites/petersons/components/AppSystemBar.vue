<template>
  <v-system-bar id="app-system-bar" app absolute dark color="tertiary">
    <v-container d-sm-flex hidden-xs-only>
      <v-spacer></v-spacer>
      <nav-btn text class="white--text">
        <svg-icon :icon="userIcon"></svg-icon>
        Log In
      </nav-btn>
      <nav-btn text class="white--text">
        <svg-icon :icon="registerIcon"></svg-icon>
        Register
      </nav-btn>
    </v-container>
  </v-system-bar>
</template>

<script lang="ts">
import Vue from 'vue'
import SvgIcon from 'shared/components/SvgIcon.vue'
import { bxUser, bxLockAlt } from 'shared/assets/icons/box-icons'

export default Vue.extend({
  components: { SvgIcon },

  data() {
    return {
      userIcon: bxUser,
      registerIcon: bxLockAlt,
    }
  },
})
</script>

<style lang="scss">
@import '~vuetify/src/styles/styles.sass';
@import '~vuetify/src/components/VMain/_variables.scss';

#app-system-bar {
  transition: $main-transition;
  height: 40px !important;
}

@media #{map-get($display-breakpoints, 'xs-only')} {
  #app-system-bar {
    height: 30px !important;
  }
}
</style>

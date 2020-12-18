<template>
  <v-system-bar
    app
    absolute
    dark
    color="tertiary"
    :height="$vuetify.breakpoint.xs ? 30 : 40"
  >
    <v-container d-sm-flex hidden-xs-only>
      <v-spacer></v-spacer>
      <NavBtn text class="white--text">
        <svg-icon :icon="userIcon"></svg-icon>
        Log In
      </NavBtn>
      <NavBtn text class="white--text">
        <svg-icon :icon="registerIcon"></svg-icon>
        Register
      </NavBtn>
    </v-container>
  </v-system-bar>
</template>

<script lang="ts">
import SvgIcon from 'shared/components/SvgIcon.vue'
import { bxUser, bxLockAlt } from 'shared/assets/icons/box-icons'

export default {
  components: { SvgIcon },
  data: () => ({
    userIcon: bxUser,
    registerIcon: bxLockAlt,
  }),
}
</script>

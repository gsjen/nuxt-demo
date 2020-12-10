<template>
  <v-btn
    class="nav-btn"
    :class="{ 'nav-btn--menu': menu }"
    v-bind="$attrs"
    v-on="$listeners"
    :ripple="false"
    tile
    text
  >
    <slot></slot>
  </v-btn>
</template>

<script lang="ts">
export default {
  props: {
    menu: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss">
.nav-btn {
  &:hover {
    color: var(--v-primary-base) !important;
  }

  &.theme--dark:hover::before {
    opacity: 0;
  }

  .v-icon {
    color: inherit !important;
    transition: none;
  }

  &.nav-btn--menu:hover::before {
    opacity: 1;
    color: var(--v-accent-base);
  }
}
</style>

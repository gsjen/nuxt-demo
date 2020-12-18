<template>
  <v-btn
    class="nav-btn"
    :class="{ 'nav-btn--menu': menu }"
    v-bind="$attrs"
    v-on="$listeners"
    :ripple="false"
    tile
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
  &.v-btn--text:hover {
    color: var(--v-primary-base) !important;
  }

  &:not(:hover)::before {
    opacity: 0 !important;
  }

  &.v-btn--text:hover::before {
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

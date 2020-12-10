<template>
  <v-main id="app-view">
    <v-container flex-column align-stretch fill-height py-0>
      <nuxt></nuxt>
    </v-container>
  </v-main>
</template>

<script lang="ts">
export default {}
</script>

<style lang="scss">
#app-view {
  > .v-main__wrap > .container {
    background-color: var(--v-accent-base);
    background-clip: content-box;
  }
}
</style>

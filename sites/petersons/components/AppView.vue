<template>
  <v-main id="app-view">
    <v-container flex-column align-stretch flex-nowrap fill-height py-0>
      <nuxt></nuxt>
    </v-container>
  </v-main>
</template>

<script lang="ts">
export default {}
</script>

<style lang="scss">
@import '~vuetify/src/styles/styles.sass';

#app-view {
  padding-top: 174px !important;

  > .v-main__wrap > .container {
    background-color: var(--v-accent-base);
    background-clip: content-box;
  }
}

@media #{map-get($display-breakpoints, 'md-and-down')} {
  #app-view {
    padding-top: 166px !important;
  }
}

@media #{map-get($display-breakpoints, 'sm-and-down')} {
  #app-view {
    padding-top: 130px !important;

    > .v-main__wrap > .container {
      padding-left: 0;
      padding-right: 0;
    }
  }
}

@media #{map-get($display-breakpoints, 'xs-only')} {
  #app-view {
    padding-top: 100px !important;
  }
}
</style>

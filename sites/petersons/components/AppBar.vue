<template>
  <v-app-bar
    app
    absolute
    prominent
    flat
    color="accent darken-1"
    height="90"
    extension-height="44"
    id="app-bar"
  >
    <v-container fill-height>
      <nuxt-link to="/">
        <v-img
          src="/images/logo.png?nf_resize=fit&w=285"
          contain
          max-width="285"
        ></v-img>
      </nuxt-link>
      <v-spacer></v-spacer>
      <v-btn
        large
        color="tertiary"
        class="white--text mr-6"
        to="/weekly-ad"
        nuxt
      >
        Weekly Ad
      </v-btn>
      <v-btn large color="secondary"> Shop Online </v-btn>
    </v-container>

    <template slot="extension">
      <v-container py-0 align-self-start>
        <NavBar height="44"></NavBar>
      </v-container>
    </template>
  </v-app-bar>
</template>

<script lang="ts">
export default {}
</script>

<style lang="scss">
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
</style>

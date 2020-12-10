<template>
  <v-footer id="app-footer" app padless absolute color="accent darken-1">
    <v-container class="py-0">
      <v-toolbar flat dense color="transparent">
        <span class="text-caption font-weight-medium pr-3"
          >Copyright 2020. Design and Maintenance by Associated Food
          Stores.</span
        >
        <v-divider vertical inset></v-divider>
        <NavBtn text small>Administration</NavBtn>
        <v-divider vertical inset></v-divider>
        <NavBtn text small to="/contact-us" nuxt>Contact Us</NavBtn>
        <v-divider vertical inset></v-divider>
        <NavBtn text small>Recalls</NavBtn>
        <v-divider vertical inset></v-divider>
        <NavBtn text small>Employee Awards</NavBtn>
      </v-toolbar>
    </v-container>
  </v-footer>
</template>

<script lang="ts">
export default {}
</script>

<style lang="scss">
#app-footer {
  .v-toolbar__content {
    justify-content: center;
    .text-caption {
      margin-top: 1px;
    }
  }
}
</style>

<template>
  <v-app>
    <AppSystemBar></AppSystemBar>

    <AppBar></AppBar>

    <AppView></AppView>

    <AppFooter></AppFooter>
  </v-app>
</template>

<script lang="ts">
export default {
  components: {
    AppSystemBar: () => import('../components/AppSystemBar.vue'),
    AppBar: () => import('../components/AppBar.vue'),
    AppView: () => import('../components/AppView.vue'),
    AppFooter: () => import('../components/AppFooter.vue'),
  },
}
</script>

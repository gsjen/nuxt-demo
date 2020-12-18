<template>
  <v-app>
    <AppSystemBar></AppSystemBar>

    <AppBar @show-drawer="showDrawer = true"></AppBar>

    <AppNavDrawer v-model="showDrawer"></AppNavDrawer>

    <AppView></AppView>

    <AppFooter></AppFooter>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  components: {
    AppSystemBar: () => import('../components/AppSystemBar.vue'),
    AppBar: () => import('../components/AppBar.vue'),
    AppView: () => import('../components/AppView.vue'),
    AppFooter: () => import('../components/AppFooter.vue'),
  },

  data: () => ({
    showDrawer: false,
  }),

  head: {
    titleTemplate: (title) =>
      ((title && title + ' - ') || '') + "Peterson's Fresh Market",
  },
})
</script>

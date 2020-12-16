<template>
  <v-app>
    <AppSystemBar></AppSystemBar>

    <AppBar></AppBar>

    <AppView></AppView>

    <AppFooter></AppFooter>
    <client-only>
      <v-overlay color="tertiary" opacity="1" :value="loadingFont"></v-overlay>
    </client-only>
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
    loadingFont: false,
  }),

  async created() {
    // if (!process.server) {
    //   this.loadingFont = true
    //   await (this as any).$webfontloader.loading
    //   this.loadingFont = false
    // }
  },
})
</script>

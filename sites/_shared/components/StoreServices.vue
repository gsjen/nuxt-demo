<template>
  <v-card v-if="!$fetchState.pending" color="transparent">
    <v-card-title class="text-h3 mb-n2">
      <slot name="icon"></slot>
      Store Services</v-card-title
    >
    <nuxt-content :document="services"></nuxt-content>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data: () => ({
    services: null,
  }),

  fetchKey: 'storeServices',

  async fetch() {
    this.services = await this.$content(
      this.$nuxt.context.env.sitePath + '/store-services'
    ).fetch()
  },
})
</script>

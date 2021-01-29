<template>
  <v-container fluid>
    <v-row>
      <v-col sm="12" md="8">
        <section class="department">
          <nuxt-child></nuxt-child>
        </section>
      </v-col>
      <v-col sm="12" md="4">
        <v-row>
          <v-col>
            <store-information> </store-information>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <store-services></store-services>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss">
.department {
  h2 {
    color: var(--v-primary-base);
  }
}
</style>

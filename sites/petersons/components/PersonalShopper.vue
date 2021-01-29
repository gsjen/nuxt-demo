<template>
  <v-card color="transparent">
    <v-card-title class="text-h3"> Personal Shopper</v-card-title>
    <v-img
      :src="$media('/personalShopperLogo.png')"
      contain
      :max-height="200"
    ></v-img>
    <v-card-text class="text-center">
      <v-btn large color="secondary" to="/personal-shopper"
        >Delivery or Pickup</v-btn
      >
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

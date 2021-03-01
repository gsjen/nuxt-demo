<template>
  <iframe
    class="google-maps"
    title="Google Maps"
    :width="width"
    :height="height"
    :src="src"
  >
  </iframe>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    width: [String, Number],
    height: [String, Number],
    address: String,
    zoom: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    src() {
      return `https://maps.google.com/maps?width=${this.width}&height=${this.height}&q=${this.address}&z=${this.zoom}&output=embed`
    },
  },
})
</script>

<style lang="scss">
.google-maps {
  border: none;
}
</style>

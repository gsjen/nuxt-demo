<template>
  <v-img
    :src="$media(url, shared)"
    v-bind="$attrs"
    :max-width="maxWidth"
    :max-height="maxHeight"
    contain
  ></v-img>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    src: String,
    maxWidth: [String, Number],
    maxHeight: [String, Number],
    shared: Boolean,
  },
  computed: {
    url() {
      let url = this.src
      if (this.maxWidth) {
        url += '?nf_resize=fit&w=' + parseFloat(this.maxWidth as string)
        if (this.maxHeight) {
          url += '&h=' + parseFloat(this.maxHeight as string)
        }
      } else if (this.maxHeight) {
        url += '?nf_resize=fit&h=' + parseFloat(this.maxHeight as string)
      }
      return url
    },
  },
})
</script>

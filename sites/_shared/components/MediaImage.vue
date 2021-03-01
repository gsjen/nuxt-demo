<template>
  <v-img
    :src="$media(url, shared)"
    v-bind="$attrs"
    v-on="$listeners"
    :contain="!cover"
  ></v-img>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.extend({
  props: {
    src: String,
    shared: Boolean,
    cover: Boolean,
    resize: Object as PropType<{ width?: Number; height?: Number }>,
  },

  computed: {
    url(): string {
      let url = this.src
      if (!this.resize) {
        return url
      }

      if (this.resize.width) {
        url += '?nf_resize=fit&w=' + this.resize.width
        if (this.resize.height) {
          url += '&h=' + this.resize.height
        }
      } else if (this.resize.height) {
        url += '?nf_resize=fit&h=' + this.resize.height
      }
      return url
    },
  },
})
</script>

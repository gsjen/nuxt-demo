<template>
  <v-img
    :src="$media(url, shared)"
    v-bind="$attrs"
    v-on="$listeners"
    :width="width"
    :height="height"
    :max-width="maxWidth"
    :max-height="maxHeight"
    :contain="!cover"
    ref="img"
  ></v-img>
</template>

<script lang="ts">
import Vue from 'vue'
import endsWith from 'lodash/endsWith'

export default Vue.extend({
  props: {
    src: String,
    width: [String, Number],
    height: [String, Number],
    maxWidth: [String, Number],
    maxHeight: [String, Number],
    shared: Boolean,
    cover: Boolean,
  },

  computed: {
    url(): string {
      let url = this.src
      const width = this.getDimension(this.width || this.maxWidth)
      const height = this.getDimension(this.height || this.maxHeight)
      if (width) {
        url += '?nf_resize=fit&w=' + width
        if (height) {
          url += '&h=' + height
        }
      } else if (height) {
        url += '?nf_resize=fit&h=' + height
      }
      return url
    },
  },

  methods: {
    getDimension(value: string | number) {
      if (typeof value === 'number') {
        return value
      }
      if (typeof value === 'string' && endsWith(value, 'px')) {
        return parseFloat(value)
      }
      return null
    },
  },
})
</script>

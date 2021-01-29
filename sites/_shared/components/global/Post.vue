<template>
  <component v-if="component" :is="component" :post="post"></component>
  <article v-else class="post" :class="classes">
    <nuxt-content :document="post"></nuxt-content>
  </article>
</template>

<script lang="ts">
import Vue from 'vue'
import { IContentDocument } from '@nuxt/content/types/content'

export default Vue.extend({
  props: {
    category: String,
    slug: String,
    shared: Boolean,
    component: String,
  },

  data() {
    return {
      post: null as IContentDocument,
    }
  },

  computed: {
    classes(): string[] {
      return [this.category, this.$attrs['class']]
    },
  },

  async fetch() {
    let query = `${
      this.shared ? '_shared' : this.$nuxt.context.env['sitePath']
    }/posts/`
    if (this.category) {
      query += `${this.category}/${this.slug}`
    } else {
      query += `${this.slug}`
    }

    this.post = (await this.$content(query).fetch()) as IContentDocument
  },
})
</script>

import Vue from 'vue'
import { IContentDocument } from '@nuxt/content/types/content'

export default Vue.extend({
  props: {
    category: String,
    slug: String,
    shared: Boolean,
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

  fetchKey(getKey: (id: string) => number): string {
    return `${this.category}/${this.slug}/${getKey('post')}`
  },

  async fetch() {
    let path = `${
      this.shared ? '_shared' : this.$nuxt.context.env['sitePath']
    }/posts/`
    if (this.category) {
      path += `${this.category}/${this.slug}`
    } else {
      path += `${this.slug}`
    }

    let query = this.$content(path)
    if (this.shared) {
      query.where({ stores: { $in: [this.$nuxt.context.env['sitePath']] } })
    }

    this.post = (await query.fetch()) as IContentDocument
  },
})

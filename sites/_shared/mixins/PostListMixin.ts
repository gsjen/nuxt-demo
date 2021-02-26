import Vue, { PropType } from 'vue'
import assign from 'lodash/assign'
import { IContentDocument } from '@nuxt/content/types/content'
import take from 'lodash/take'
import orderBy from 'lodash/orderBy'
import last from 'lodash/last'

export default Vue.extend({
  props: {
    category: String,
    classes: Array as PropType<String[]>,
    component: String,
    where: Object,
    limit: [Number, String],
    sort: Object as PropType<{ field: string; direction: 'asc' | 'desc' }>,
  },

  data() {
    return {
      posts: [] as any[],
    }
  },

  async fetch() {
    const storePosts = (await this.getQuery().fetch()) as IContentDocument[]
    const sharedPosts = (await this.getQuery(
      true
    ).fetch()) as IContentDocument[]
    this.posts = storePosts.concat(sharedPosts)
    if (this.sort) {
      this.posts = orderBy(this.posts, [this.sort.field], [this.sort.direction])
    }
    if (this.limit) {
      this.posts = take(this.posts, +this.limit)
    }
  },

  methods: {
    getQuery(shared = false) {
      const path = shared ? '_shared' : this.$nuxt.context.env['sitePath']
      const options = { deep: !this.category }
      const query = this.$content(path, 'posts', this.category, options)
      let where = {
        searchable: { $ne: false },
      }
      assign(where, this.where)
      query.where(where)
      if (this.sort) {
        query.sortBy(this.sort.field, this.sort.direction)
      }
      if (this.limit) {
        query.limit(this.limit)
      }
      return query
    },

    getCategory(post: IContentDocument) {
      return last(post.dir.split('/'))
    },
  },
})

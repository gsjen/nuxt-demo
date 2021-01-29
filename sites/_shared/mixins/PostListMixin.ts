import Vue, { PropType } from 'vue'

export default Vue.extend({
  props: {
    type: String,
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

  methods: {
    getQuery(shared = false) {
      const path = shared ? '_shared': this.$nuxt.context.env['sitePath']
      const query = this.$content(path, 'posts', this.type)
      if (this.where) {
        query.where(this.where)
      }
      if (this.sort) {
        query.sortBy(this.sort.field, this.sort.direction)
      }
      if (this.limit) {
        query.limit(this.limit)
      }
      return query
    },
  },
})


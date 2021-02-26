<script lang="ts">
import { CreateElement } from 'Vue'
import PostMixin from '../../mixins/PostMixin'
import mixins from 'vue-typed-mixins'

export default mixins(PostMixin).extend({
  render(h: CreateElement) {
    if (!this.post) {
      return
    }
    if (this.$scopedSlots.default) {
      return this.$scopedSlots.default({
        post: this.post,
      })[0]
    }
    return h(
      'article',
      {
        staticClass: 'post',
      },
      [
        h('nuxt-content', {
          attrs: {
            document: this.post,
          },
        }),
      ]
    )
  },
})
</script>

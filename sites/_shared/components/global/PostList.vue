<template>
  <v-container :tag="tag">
    <v-row v-for="(rowPosts, row) in posts" :key="row">
      <v-col v-for="(post, col) in rowPosts" :key="col">
        <article :key="post.slug" class="post" :class="classes || type">
          <nuxt-content :document="post"></nuxt-content>
        </article>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import PostListMixin from '../../mixins/PostListMixin'
import chunk from 'lodash/chunk'

export default mixins(PostListMixin).extend({
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    columns: {
      type: Number,
      default: 1,
    },
  },

  async fetch() {
    try {
      this.posts = (await this.getQuery().fetch()) as any[]
    } catch {
      this.posts = (await this.getQuery(true).fetch()) as any[]
    }

    this.posts = chunk(this.posts as [], this.columns)
  },
})
</script>

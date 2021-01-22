<template>
  <component
    v-if="+limit === 1 && component"
    :is="component"
    :post="posts[0]"
  ></component>
  <article v-else-if="+limit === 1" class="post" :class="classes || type">
    <nuxt-content :document="posts[0]"></nuxt-content>
  </article>
  <v-slide-group v-else-if="slider">
    <v-slide-item v-for="post in posts" :key="post.slug">
      <component v-if="component" :is="component" :post="post"></component>
      <article v-else class="post" :class="classes || type">
        <nuxt-content :document="post"></nuxt-content>
      </article>
    </v-slide-item>
  </v-slide-group>
  <v-container v-else tag="section">
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
import Vue, { PropType } from 'vue'
import chunk from 'lodash/chunk'

export default Vue.extend({
  props: {
    type: String,
    slider: Boolean,
    classes: Array as PropType<String[]>,
    columns: {
      type: Number,
      default: 1,
    },
    component: String,
    where: Object,
    limit: [Number, String],
    sort: Object,
  },
  data: () => ({
    posts: [] as any[],
  }),
  methods: {
    getQuery(path: string) {
      const query = this.$content(`${path}/posts/${this.type}`)
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
  async fetch() {
    try {
      this.posts = (await this.getQuery(
        this.$nuxt.context.env['sitePath']
      ).fetch()) as any[]
    } catch {
      this.posts = (await this.getQuery('_shared').fetch()) as any[]
    }

    if (+this.limit !== 1 && !this.slider) {
      this.posts = chunk(this.posts as [], this.columns)
    }
  },
})
</script>

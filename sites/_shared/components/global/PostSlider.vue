<template>
  <v-slide-group>
    <v-slide-item v-for="post in posts" :key="post.slug">
      <component v-if="component" :is="component" :post="post"></component>
      <article v-else class="post" :class="classes || type">
        <nuxt-content :document="post"></nuxt-content>
      </article>
    </v-slide-item>
  </v-slide-group>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import PostListMixin from '../../mixins/PostListMixin'

export default mixins(PostListMixin).extend({
  async fetch() {
    try {
      this.posts = (await this.getQuery().fetch()) as any[]
    } catch {
      this.posts = (await this.getQuery(true).fetch()) as any[]
    }
  },
})
</script>

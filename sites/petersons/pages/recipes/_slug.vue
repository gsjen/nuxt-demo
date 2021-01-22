<template>
  <v-container fluid>
    <h1>{{ post.title }}</h1>
    <span class="caption">{{ post.date | date('short') }}</span>
    <article class="recipe">
      <nuxt-content :document="post" />
    </article>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data: null as { post: any },
  async asyncData({ $content, params }) {
    try {
      return {
        post: await $content('petersons/posts/recipes/' + params.slug)
          .limit(1)
          .fetch(),
      }
    } catch {
      return {
        post: await $content('_shared/posts/recipes/' + params.slug)
          .limit(1)
          .fetch(),
      }
    }
  },
})
</script>

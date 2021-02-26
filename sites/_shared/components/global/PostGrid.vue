<template>
  <v-row>
    <v-col v-for="post in posts" :key="post.slug" v-bind="$attrs">
      <slot v-bind:post="post">
        <article class="post" :class="classes || getCategory(post)">
          <nuxt-content :document="post"></nuxt-content>
        </article>
      </slot>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import PostListMixin from '../../mixins/PostListMixin'

export default mixins(PostListMixin).extend({})
</script>

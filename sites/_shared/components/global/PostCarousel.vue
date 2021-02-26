<template>
  <v-hover v-slot="{ hover }">
    <v-carousel
      class="post-carousel"
      show-arrows-on-hover
      hide-delimiters
      :cycle="false"
      :show-arrows="posts.length > 1"
      v-bind="$attrs"
      :height="height"
    >
      <v-carousel-item v-for="post in posts" :key="post.slug">
        <v-card class="d-flex flex-column fill-height">
          <media-image
            :src="post.coverImage"
            :shared="!!post.stores"
            :max-height="height - textHeight"
            cover
            :class="{ 'v-image--stretch': post.stretchImage }"
          ></media-image>
          <div
            class="d-flex flex-no-wrap justify-space-between mt-auto"
            :style="{ height: textHeight }"
          >
            <v-card-title>
              <div>{{ post.title }}</div>
              <v-card-subtitle class="text-line-clamp-2 pa-0">{{
                post.description
              }}</v-card-subtitle>
            </v-card-title>
            <v-card-actions class="pr-4">
              <v-spacer></v-spacer>
              <v-btn nuxt :to="post.link">Read More</v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </v-carousel-item>
    </v-carousel>
  </v-hover>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import PostListMixin from '../../mixins/PostListMixin'

export default mixins(PostListMixin).extend({
  props: {
    height: [String, Number],
    textHeight: [String, Number],
    where: {
      type: Object,
      default: () => ({
        featured: true,
      }),
    },
  },
})
</script>

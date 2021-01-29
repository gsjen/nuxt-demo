<template>
  <v-container fluid class="post-index">
    <h1 class="text-h1">Posts</h1>
    <v-row>
      <v-col cols="2">
        <h2 class="text-h2">Categories</h2>
        <v-divider></v-divider>
        <h2 class="text-h2">Tags</h2>
      </v-col>
      <v-col cols="10">
        <v-data-iterator
          :items="posts"
          item-key="path"
          hide-default-footer
          :page.sync="page"
          :items-per-page="postsPerPage"
        >
          <template v-slot:default="{ items }">
            <v-row>
              <v-col cols="12" v-for="item in items" :key="item.path">
                <v-card class="post-index__item">
                  <v-img
                    v-if="item.coverImage"
                    :src="
                      $media(
                        item.coverImage + '?nf_resize=fit&w=150',
                        !!item.stores
                      )
                    "
                    class="float-left ma-4"
                    width="150"
                    aspect-ratio="1"
                  ></v-img>
                  <v-card-title class="text-h3 primary--text">{{
                    item.title
                  }}</v-card-title>
                  <v-card-subtitle class="caption">{{
                    item.createdAt | date('long')
                  }}</v-card-subtitle>
                  <v-card-text>
                    <template v-if="item.excerpt">{{ item.excerpt }}</template>
                    <nuxt-content v-else :document="item"></nuxt-content>
                  </v-card-text>
                  <v-card-actions class="justify-end pb-4 pr-4">
                    <v-btn color="tertiary" class="white--text"
                      >Read More</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
        <v-pagination
          v-model="page"
          :length="pageLength"
          class="mt-4"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { IContentDocument } from '@nuxt/content/types/content'
import Vue from 'vue'
import startCase from 'lodash/startCase'

export default Vue.extend({
  data: () => ({
    posts: null,
    postsPerPage: 5,
    page: 1,
  }),

  computed: {
    pageLength() {
      return Math.ceil(this.posts.length / this.postsPerPage)
    },
  },

  async asyncData({ $content }) {
    const searchableCategories = ['events', 'recipes']

    const result = await Promise.all([
      $content('_shared', 'posts', { deep: true })
        .where({ extension: '.md', stores: { $contains: 'petersons' } })
        .fetch(),
      $content('petersons', 'posts', { deep: true })
        .where({ extension: '.md' })
        .fetch(),
    ])
    let posts = (result[0] as IContentDocument[])
      .concat(result[1] as IContentDocument[])
      .filter((p) => searchableCategories.includes(p.path.split('/')[3]))
      .sort((p1, p2) => p1.createdAt.valueOf() - p2.createdAt.valueOf())

    return {
      posts,
      categories: searchableCategories.map((c) => ({
        label: startCase(c),
        value: c,
      })),
    }
  },

  head: {
    title: 'Posts',
  },
})
</script>

<style lang="scss">
.post-index {
  .post-index__item {
    > .v-card__title {
      display: block; // fixes float
    }

    > .v-card__text > .nuxt-content {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      overflow: hidden;

      *:not(p) {
        display: none;
      }
    }
  }
}
</style>

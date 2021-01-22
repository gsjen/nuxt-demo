<template>
  <v-container pt-6 pb-0 px-6>
    <v-row>
      <v-col cols="8">
        <section>
          <post-carousel></post-carousel>
        </section>
        <section class="py-3">
          <h1 class="primary--text text-h4">Latest News &amp; Events</h1>
          <v-row>
            <v-col>
              <v-skeleton-loader
                boilerplate
                type="list-item-avatar-three-line, actions"
              ></v-skeleton-loader>
            </v-col>
            <v-col>
              <v-skeleton-loader
                boilerplate
                type="list-item-avatar-three-line, actions"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-skeleton-loader
                boilerplate
                type="list-item-avatar-three-line, actions"
              ></v-skeleton-loader>
            </v-col>
            <v-col>
              <v-skeleton-loader
                boilerplate
                type="list-item-avatar-three-line, actions"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
        </section>
        <v-divider></v-divider>
        <section class="py-3">
          <v-row>
            <v-col>
              <v-skeleton-loader
                boilerplate
                type="card, actions"
              ></v-skeleton-loader>
            </v-col>
            <v-col>
              <v-skeleton-loader
                boilerplate
                type="card, actions"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
        </section>
        <v-divider></v-divider>
        <section class="pt-3">
          <h1 class="primary--text text-h4">Our Heritage</h1>
          <v-row>
            <v-col>
              <v-skeleton-loader
                boilerplate
                type="image, list-item-three-line"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
        </section>
      </v-col>

      <v-col cols="4">
        <v-row>
          <v-col>
            <v-skeleton-loader
              boilerplate
              type="table-heading, image, list-item-three-line@4"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-skeleton-loader
              boilerplate
              type="table-heading, image, list-item-three-line@4"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import PostCarousel from 'shared/components/PostCarousel.vue'
export default {
  components: { PostCarousel },
  head: {
    title: '',
  },
}
</script>

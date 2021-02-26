<template>
  <v-container fluid pt-6 px-6>
    <v-row>
      <v-col sm="12" md="8">
        <section>
          <post-carousel height="450" text-height="108"></post-carousel>
        </section>
        <section class="py-3">
          <h1 class="text-h1">Latest News &amp; Events</h1>
          <post-grid
            :sort="{ field: 'date', direction: 'desc' }"
            limit="4"
            xs="12"
            sm="6"
          >
            <template v-slot="{ post }">
              <v-card color="transparent" class="v-card--dense">
                <media-image
                  v-if="post.coverImage"
                  :src="post.coverImage"
                  :shared="!!post.stores"
                  :height="200"
                  cover
                ></media-image>
                <v-card-title class="text-h3 primary--text">{{
                  post.title
                }}</v-card-title>
                <v-card-subtitle class="caption">{{
                  post.date | date('short')
                }}</v-card-subtitle>
                <v-card-text>
                  <p class="text-line-clamp-2">
                    {{ post.description }}
                  </p></v-card-text
                >
                <v-card-actions>
                  <v-btn
                    color="tertiary"
                    class="white--text"
                    nuxt
                    :to="post.path"
                    >Read More</v-btn
                  >
                </v-card-actions>
              </v-card>
            </template>
          </post-grid>
        </section>
        <v-divider class="my-3"></v-divider>
        <section class="py-3">
          <v-row>
            <v-col>
              <post category="departments" slug="meat" v-slot="{ post }">
                <v-card class="v-card--dense" color="transparent">
                  <media-image
                    v-if="post.coverImage"
                    :src="post.coverImage"
                    :height="180"
                    position="center left"
                  ></media-image>
                  <v-card-title class="text-h2">{{ post.title }}</v-card-title>
                  <v-card-text>
                    <nuxt-content
                      :document="post"
                      class="text-line-clamp-3"
                    ></nuxt-content>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      color="tertiary"
                      class="white--text"
                      nuxt
                      to="/departments/meat"
                      >Learn More</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </post>
            </v-col>
            <v-col>
              <post category="departments" slug="produce" v-slot="{ post }">
                <v-card class="v-card--dense" color="transparent">
                  <media-image
                    v-if="post.coverImage"
                    :src="post.coverImage"
                    :height="180"
                    position="center left"
                  ></media-image>
                  <v-card-title class="text-h2">{{ post.title }}</v-card-title>
                  <v-card-text>
                    <nuxt-content
                      :document="post"
                      class="text-line-clamp-3"
                    ></nuxt-content>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      color="tertiary"
                      class="white--text"
                      nuxt
                      to="/departments/produce"
                      >Learn More</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </post>
            </v-col>
          </v-row>
        </section>
        <v-divider class="my-3"></v-divider>
        <section>
          <post category="corporate" slug="our-heritage"></post>
        </section>
      </v-col>

      <v-col sm="12" md="4">
        <v-divider class="my-3 d-md-none"></v-divider>
        <v-row>
          <v-col class="pt-md-0">
            <personal-shopper class="v-card--dense"></personal-shopper>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <store-information class="v-card--dense"></store-information>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <post category="corporate" slug="store-services" v-slot="{ post }">
              <v-card color="transparent" class="v-card--dense">
                <v-card-title class="text-h2">{{ post.title }}</v-card-title>
                <v-card-text class="body-1"
                  ><nuxt-content :document="post"></nuxt-content
                ></v-card-text>
              </v-card>
            </post>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import StoreInformation from 'shared/components/StoreInformation.vue'

export default Vue.extend({
  components: { StoreInformation },
  head: {
    title: '',
  },
})
</script>

<template>
  <v-container fluid pt-6 px-6>
    <v-row>
      <v-col sm="12" md="8">
        <section>
          <post-carousel></post-carousel>
        </section>
        <section class="py-3">
          <h1 class="text-h1">Latest News &amp; Events</h1>
          <post-list limit="4"></post-list>
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
          <post category="corporate" slug="our-heritage"></post>
        </section>
      </v-col>

      <v-col sm="12" md="4">
        <v-row>
          <v-col>
            <personal-shopper></personal-shopper>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <store-information> </store-information>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <store-services></store-services>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import StoreInformation from 'shared/components/StoreInformation.vue'
import StoreServices from 'shared/components/StoreServices.vue'

export default Vue.extend({
  components: { StoreInformation, StoreServices },
  head: {
    title: '',
  },
})
</script>

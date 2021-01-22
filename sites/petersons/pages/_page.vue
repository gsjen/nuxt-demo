<template>
  <v-container fluid>
    <article class="page" :class="page.slug">
      <nuxt-content :document="page" />
    </article>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: null as { page: any },
  async asyncData({ $content, params }) {
    try {
      return {
        page: await $content('petersons/pages/' + params.page)
          .limit(1)
          .fetch(),
      }
    } catch {
      return {
        page: await $content('_shared/pages/' + params.page)
          .limit(1)
          .fetch(),
      }
    }
  },
  head() {
    return {
      title: this.page.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.page.description,
        },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: this.page.title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.page.description,
        },
        // Twitter Card
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.page.title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.page.description,
        },
      ],
    }
  },
})
</script>

<style lang="scss">
@import '~vuetify/src/styles/styles.sass';
.page {
  > .nuxt-content,
  > .nuxt-content-container > .nuxt-content {
    > h1 {
      font-size: map-deep-get($headings, 'h4', 'size') !important;
      font-weight: map-deep-get($headings, 'h4', 'weight');
      line-height: map-deep-get($headings, 'h4', 'line-height');
      letter-spacing: map-deep-get(
        $headings,
        'h4',
        'letter-spacing'
      ) !important;
      font-family: map-deep-get($headings, 'h4', 'font-family') !important;
      color: var(--v-primary-base) !important;
      caret-color: var(--v-primary-base) !important;
    }
  }
}
</style>

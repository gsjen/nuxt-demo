<template>
  <nuxt-content :document="page"></nuxt-content>
</template>

<script lang="ts">
import { IContentDocument } from '@nuxt/content/types/content'
import PageMixin from 'shared/mixins/PageMixin'
import mixins from 'vue-typed-mixins'

export default mixins(PageMixin).extend({
  async asyncData({ $content, params }) {
    let page: IContentDocument | IContentDocument[]
    try {
      page = await $content(
        'petersons',
        'posts',
        params.category,
        params.slug
      ).fetch()
    } catch {
      page = await $content(
        '_shared',
        'posts',
        params.category,
        params.slug
      ).fetch()
    }

    return { page }
  },
})
</script>

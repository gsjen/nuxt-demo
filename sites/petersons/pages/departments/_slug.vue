<template>
  <nuxt-content :document="page"></nuxt-content>
</template>

<script lang="ts">
import PageMixin from 'shared/mixins/PageMixin'
import mixins from 'vue-typed-mixins'

export default mixins(PageMixin).extend({
  async asyncData({ $content, params }) {
    return {
      page: await $content(
        'petersons/pages/departments/' + params.slug
      ).fetch(),
    }
  },
})
</script>

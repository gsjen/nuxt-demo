<template>
  <nuxt-content :document="page"></nuxt-content>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import PageMixin from 'shared/mixins/PageMixin'

export default mixins(PageMixin).extend({
  async asyncData({ $content }) {
    return {
      page: await $content('petersons/pages/departments/index').fetch(),
    }
  },
})
</script>

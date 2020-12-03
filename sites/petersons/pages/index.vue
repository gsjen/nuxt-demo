<template>
  <div>
    <v-icon large color="green darken-2" @click.native="onIconClick()">{{
      mdiDomain
    }}</v-icon>
    <h1 v-html="helloMessage"></h1>
  </div>
</template>

<script lang="ts">
import { mdiDomain } from '@mdi/js'

export default {
  components: {},
  head: {
    title: 'Petersons',
  },
  data: () => ({
    mdiDomain: mdiDomain,
    get helloMessage() {
      return 'Hello world!'
    },
    onIconClick() {
      console.log('icon clicked')
    },
  }),
}
</script>

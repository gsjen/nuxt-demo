<template>
  <v-navigation-drawer
    app
    fixed
    temporary
    bottom
    v-bind="$attrs"
    v-on="$listeners"
    color="tertiary"
    dark
  >
    <v-list>
      <template v-for="(item, i) in menu">
        <v-list-group v-if="item.children" :key="i" no-action color="white">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{ item.label }}</v-list-item-title>
            </v-list-item-content>
          </template>
          <template v-slot:appendIcon>
            <v-icon>{{ menuIcon }}</v-icon>
          </template>
          <v-list-item
            v-for="(child, i) in item.children"
            :key="i"
            v-bind="child.props"
          >
            <v-list-item-content>
              <v-list-item-title>{{ child.label }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item v-else :key="i">
          <v-list-item-content>
            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiMenuDown } from '@mdi/js'

export default Vue.extend({
  data: () => ({
    menu: [] as any[],
    menuIcon: mdiMenuDown,
  }),

  async fetch() {
    const result = await this.$content('petersons/menus/main-menu').fetch()
    this.menu = (result as any).menu
  },
})
</script>

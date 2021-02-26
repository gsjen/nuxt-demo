<template>
  <v-toolbar class="nav-bar" dense flat dark color="primary">
    <template v-for="(item, i) in menu">
      <v-menu v-if="item.children" v-bind="menuProps" :key="i">
        <template v-slot:activator="{ on, attrs }">
          <nav-btn menu text v-bind="merge({}, attrs, item.props)" v-on="on">
            {{ item.label }}
            <v-icon>{{ menuIcon }}</v-icon>
          </nav-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(child, i) in item.children"
            :key="i"
            v-bind="child.props"
          >
            <v-list-item-title>{{ child.label }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <nav-btn v-else :key="i" menu text v-bind="item.props">{{
        item.label
      }}</nav-btn>
    </template>
  </v-toolbar>
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiMenuDown } from '@mdi/js'
import merge from 'lodash/merge'

export default Vue.extend({
  name: 'nav-bar',

  data() {
    return {
      menu: [] as any[],
      menuIcon: mdiMenuDown,
      menuProps: {
        eager: true,
        openOnHover: true,
        offsetY: true,
        attach: '#app-bar > .v-toolbar__extension .v-toolbar__content',
        transition: 'slide-y-transition',
        zIndex: -1,
      },
    }
  },

  async fetch() {
    const result = await this.$content('petersons/menus/main-menu').fetch()
    this.menu = (result as any).menu
  },

  methods: {
    merge: merge,
  },
})
</script>

<style lang="scss">
@import '~vuetify/src/styles/styles.sass';
@import '~vuetify/src/components/VBtn/_variables.scss';

.nav-bar {
  height: 44px !important;

  // workaround for https://github.com/vuetifyjs/vuetify/issues/12161
  .v-menu:not(:empty) {
    display: block;
  }

  .v-btn {
    background-color: var(--v-primary-base);
  }

  .v-list .v-list-item--link:hover {
    color: var(--v-secondary-base) !important;
  }
}

@media #{map-get($display-breakpoints, 'md-and-down')} {
  .nav-bar {
    height: 36px !important;
  }
}

@media #{map-get($display-breakpoints, 'lg-and-up')} {
  .nav-bar {
    > .v-toolbar__content {
      .nav-btn {
        height: #{map-get($btn-sizes, 'large')}px;
        min-width: #{round(map-get($btn-sizes, 'large') * 1.777777777777778)}px;
        padding: 0 #{map-get($btn-sizes, 'large') / 2.25}px;
        font-size: map-get($btn-font-sizes, 'large');
      }
    }
  }
}
</style>

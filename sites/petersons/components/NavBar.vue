<template>
  <v-toolbar class="nav-bar" dense flat dark color="primary" :height="height">
    <template v-for="(item, i) in menu">
      <v-menu v-if="item.children" v-bind="menuProps" :key="i">
        <template v-slot:activator="{ on, attrs }">
          <NavBtn menu large v-bind="merge({}, attrs, item.props)" v-on="on">
            {{ item.label }}
            <v-icon>{{ menuIcon }}</v-icon>
          </NavBtn>
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
      <NavBtn v-else :key="i" menu large v-bind="item.props">{{
        item.label
      }}</NavBtn>
    </template>
  </v-toolbar>
</template>

<script lang="ts">
import { mdiMenuDown } from '@mdi/js'
import { merge } from 'lodash'

export default {
  props: {
    height: String,
  },
  data: () => ({
    menu: [
      {
        label: 'Savings',
        children: [
          {
            label: 'Weekly Ad',
            props: {
              to: '/weekly-ad',
              nuxt: true,
            },
          },
          {
            label: 'Ways to Save',
          },
          {
            label: 'Save Time. Shop Online.',
          },
          {
            label: 'Exclusive Brands',
          },
        ],
      },
      {
        label: 'Shop Online',
        props: {
          to: '/personal-shopper',
          nuxt: true,
        },
      },
      {
        label: 'Plus',
        props: {
          to: '/plus',
          nuxt: true,
        },
      },
      {
        label: 'Digital Coupons',
        props: {
          to: '/coupons',
          nuxt: true,
        },
      },
      {
        label: 'Departments',
        props: {
          to: 'departments',
          nuxt: true,
        },
        children: [
          {
            label: 'Personal Shopper',
          },
          {
            label: 'Produce',
          },
          {
            label: 'Meat',
          },
          {
            label: 'Bakery',
          },
          {
            label: 'Deli',
          },
          {
            label: 'Compounding Pharmacy',
          },
          {
            label: 'Signature Items',
          },
          {
            label: 'Gift Cards',
          },
        ],
      },
      {
        label: 'In Store',
        children: [
          {
            label: 'Exclusive Brands',
          },
          {
            label: "I'm a Local",
          },
          {
            label: 'Facts Up Front',
          },
          {
            label: 'Food Safety',
          },
          {
            label: 'Gluten Free',
          },
          {
            label: 'Healthy Attributes',
          },
        ],
      },
      {
        label: 'About Us',
        children: [
          {
            label: 'Employment',
          },
          {
            label: 'Favorite Links',
          },
          {
            label: 'Ask an Expert',
          },
          {
            label: 'Our Team',
          },
        ],
      },
      {
        label: 'Contact Us',
        props: {
          to: '/contact-us',
          nuxt: true,
        },
      },
    ],
    menuIcon: mdiMenuDown,
    menuProps: {
      eager: true,
      openOnHover: true,
      offsetY: true,
      attach: '#app-bar > .v-toolbar__extension .v-toolbar__content',
      transition: 'slide-y-transition',
      zIndex: -1,
    },
  }),
  methods: {
    merge: merge,
  },
}
</script>

<style lang="scss">
.nav-bar {
  .v-btn {
    background-color: var(--v-primary-base);
  }

  .v-list .v-list-item--link:hover {
    // background-color: var(--v-primary-base);
    color: var(--v-secondary-base) !important;
  }
}
</style>

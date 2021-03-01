<template>
  <v-footer id="app-footer" padless color="transparent">
    <v-container class="py-0">
      <v-card flat tile color="accent" class="text-center" v-if="facebookPage">
        <v-card-text>
          <nav-btn
            text
            large
            color="secondary"
            class="pa-0"
            :href="`https://www.facebook.com/${facebookPage}`"
            target="_blank"
            rel="noreferrer nofollow noopener external"
          >
            <svg-icon :icon="facebookIcon" large></svg-icon>
            <span class="text-h4">Connect with us on Facebook</span>
          </nav-btn>
        </v-card-text>
      </v-card>
      <v-row
        justify="center"
        align="center"
        no-gutters
        class="accent darken-1 py-2 py-md-3"
      >
        <template v-for="(item, i) in menu">
          <span
            v-if="!item.to"
            :key="i"
            class="text-caption font-weight-medium my-2 my-md-0"
            :class="{ 'pr-md-3': i === 0, 'px-md-3': i !== 0 }"
          >
            {{ item.label }}
          </span>
          <nav-btn
            v-else
            :key="i"
            text
            small
            :to="item.to"
            class="my-1 my-md-0"
            >{{ item.label }}</nav-btn
          >
          <v-divider
            v-if="i !== menu.length - 1"
            vertical
            :key="-(i + 1)"
          ></v-divider>
        </template>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script lang="ts">
import Vue from 'vue'
import SvgIcon from 'shared/components/SvgIcon.vue'
import { bxlFacebook } from 'shared/assets/icons/box-icons'

export default Vue.extend({
  name: 'app-footer',

  components: { SvgIcon },

  data() {
    return {
      menu: [] as any[],
      facebookPage: '',
      facebookIcon: bxlFacebook,
    }
  },

  async fetch() {
    const storeInfo = await this.$content('petersons/store-information').fetch()
    if (storeInfo) {
      this.facebookPage = storeInfo['facebookPage']
    }
    const result = await this.$content('petersons/menus/footer').fetch()
    if (!result) {
      throw new Error('Required content "footer menu" not found.')
    }
    this.menu = (result as any).menu
  },
})
</script>

<style lang="scss">
@import '~vuetify/src/styles/styles.sass';

#app-footer {
  .row > .text-caption {
    border-top: 1px solid transparent;
  }
}

@media #{map-get($display-breakpoints, 'sm-and-down')} {
  #app-footer {
    > .container {
      padding-left: 0;
      padding-right: 0;

      .v-card__text {
        padding: 0;
      }

      .row {
        flex-direction: column-reverse;
      }
    }
  }
}
</style>

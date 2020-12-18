<template>
  <v-footer id="app-footer" app padless absolute color="transparent">
    <v-container class="py-0">
      <v-card flat tile color="accent" class="text-center">
        <v-card-text>
          <NavBtn
            text
            large
            color="secondary"
            class="pa-0"
            href="https://www.facebook.com/petersonsfreshmarket"
            target="_blank"
            rel="noreferrer"
          >
            <svg-icon :icon="facebookIcon" large></svg-icon>
            <h3>Connect with us on Facebook</h3>
          </NavBtn>
        </v-card-text>
      </v-card>
      <v-toolbar flat dense color="accent darken-1">
        <span class="text-caption font-weight-medium pr-3"
          >Copyright 2020. Design and Maintenance by Associated Food
          Stores.</span
        >
        <v-divider vertical inset class="hidden-md-and-down"></v-divider>
        <NavBtn text small class="hidden-md-and-down">Administration</NavBtn>
        <v-divider vertical inset class="hidden-md-and-down"></v-divider>
        <NavBtn text small class="hidden-md-and-down" to="/contact-us" nuxt
          >Contact Us</NavBtn
        >
        <v-divider vertical inset class="hidden-md-and-down"></v-divider>
        <NavBtn text small class="hidden-md-and-down" to="/recalls"
          >Recalls</NavBtn
        >
        <v-divider vertical inset class="hidden-md-and-down"></v-divider>
        <NavBtn text small class="hidden-md-and-down" to="/plus"
          >Employee Rewards</NavBtn
        >
      </v-toolbar>
    </v-container>
  </v-footer>
</template>

<script lang="ts">
import SvgIcon from 'shared/components/SvgIcon.vue'
import { bxlFacebook } from 'shared/assets/icons/box-icons'

export default {
  components: { SvgIcon },
  data: () => ({
    facebookIcon: bxlFacebook,
  }),
}
</script>

<style lang="scss">
@import '~vuetify/src/styles/styles.sass';

#app-footer {
  .v-toolbar__content {
    justify-content: center;
    .text-caption {
      margin-top: 1px;
    }
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
    }
  }
}
</style>

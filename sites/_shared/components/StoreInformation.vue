<template>
  <v-card v-if="!$fetchState.pending" color="transparent">
    <v-card-title class="text-h3 mb-2">
      <slot name="icon"></slot>
      Store Information</v-card-title
    >
    <template v-for="item in items">
      <v-card-subtitle class="py-0 font-weight-bold" :key="item.label">{{
        item.label
      }}</v-card-subtitle>
      <v-card-text
        class="ml-3 pb-1"
        :key="item.label + '_text'"
        v-html="item.value"
      >
      </v-card-text>
    </template>
    <google-maps
      v-if="mapsAddress"
      :address="mapsAddress"
      width="100%"
      height="500"
      class="pa-3"
    ></google-maps>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import GoogleMaps from 'shared/components/GoogleMaps.vue'
import startCase from 'lodash/startCase'
import endsWith from 'lodash/endsWith'

export default Vue.extend({
  components: {
    GoogleMaps,
  },

  props: {
    location: String,
  },

  data: () => ({
    items: [] as { label: string; value: string }[],
    mapsAddress: '',
  }),

  methods: {
    getLabel: (key: string) => startCase(key),
  },
  fetchKey: 'storeInformation',
  async fetch() {
    console.debug('fetching store info')
    const storeInfo = (await this.$content(
      this.$nuxt.context.env.sitePath + '/store-information'
    ).fetch()) as any
    let locationInfo: any
    if (this.location) {
      locationInfo = storeInfo.locations.find((s) => s.name === this.location)
    } else {
      locationInfo = storeInfo.locations[0]
    }
    const keys = [
      'phoneNumber',
      'faxNumber',
      'pharmacyPhoneNumber',
      'address',
      'storeHours',
      'pharmacyHours',
      'seniorShoppingHours',
    ]
    this.items.length = 0
    for (const key of keys) {
      if (locationInfo[key]) {
        let value: string
        if (key === 'phoneNumber' || key === 'pharmacyPhoneNumber') {
          value = `<a :href="'tel:' + ${locationInfo[key]}">${locationInfo[key]}</a>`
        } else if (key === 'address') {
          value = `${locationInfo['address']}<br/>${locationInfo['city']}, ${locationInfo['state']} ${locationInfo['zip']}`
          this.mapsAddress = encodeURIComponent(
            `${locationInfo['address']} ${locationInfo['city']} ${locationInfo['state']} ${locationInfo['zip']}`
          )
        } else if (endsWith(key, 'Hours')) {
          value = (locationInfo[key] as any[])
            .map((hours) => `${hours.day}: ${hours.hours}`)
            .join('<br/>')
        } else {
          value = locationInfo[key]
        }

        this.items.push({
          label: startCase(key),
          value: value,
        })
      }
    }
  },
})
</script>

<script lang="ts">
import Vue, { VNode, VNodeData, PropType } from 'vue'
import { Context } from '@nuxt/types'
import { VIcon } from 'vuetify/lib'

declare interface SvgPath {
  d: string
}

declare interface SvgCircle {
  cx: string
  cy: string
  r: string
}

declare interface SvgIconDefinition {
  name: string
  xmlns: string
  viewBox: string
  path?: SvgPath & Array<SvgPath>
  circle?: SvgCircle & Array<SvgCircle>
}

const WrappedSvgIcon = Vue.extend({
  props: {
    icon: Object as PropType<SvgIconDefinition>,
  },
  render(h): VNode {
    const svgData = {
      class: 'v-icon__svg',
      attrs: {
        xmlns: this.icon.xmlns,
        viewBox: this.icon.viewBox,
        role: 'img',
        'aria-hidden': true,
      },
    } as VNodeData

    const children = [] as VNode[]
    if (this.icon.path) {
      if (this.icon.path.length) {
        children.push(...this.icon.path.map((p) => h('path', { attrs: p })))
      } else {
        children.push(
          h('path', {
            attrs: this.icon.path,
          })
        )
      }
    }
    if (this.icon.circle) {
      if (this.icon.circle.length) {
        children.push(...this.icon.circle.map((c) => h('circle', { attrs: c })))
      } else {
        children.push(
          h('path', {
            attrs: this.icon.circle,
          })
        )
      }
    }

    return h('svg', svgData, children)
  },
})

export default Vue.extend({
  props: {
    icon: Object as PropType<SvgIconDefinition>,
  },
  render(h): VNode {
    const name = this.icon.name
    if (!this.$vuetify.icons.values[name]) {
      this.$vuetify.icons.values[name] = {
        component: WrappedSvgIcon,
        props: { icon: this.icon },
      }
    }

    return h(
      VIcon,
      {
        attrs: this.$attrs,
        on: this.$listeners,
      },
      `$${name}`
    )
  },
})
</script>

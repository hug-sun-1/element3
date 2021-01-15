<script lang="ts">
import { defineComponent, h } from 'vue'
import { TreeNode } from './entity/TreeNode'
export default defineComponent({
  name: 'TreeNodeContent',

  props: {
    node: {
      required: true,
      type: TreeNode
    }
  },

  render(ctx) {
    // const tree: ElTreeCtx = inject('tree')
    // if (typeof tree.$slots.default === 'function') {
    //   return tree.$slots.default({ node: ctx.node, data: ctx.node.rawNode })
    // } else if (typeof tree.renderContent === 'function') {
    //   return tree.renderContent({
    //     node: ctx.node,
    //     data: ctx.node.data.raw
    //   })
    // } // TODO: 未实现插槽和动态渲染

    return h('span', ctx.node.label)
  }
})
</script>

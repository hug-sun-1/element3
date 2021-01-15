<template>
  <div
    :id="'TN' + node.id"
    :ref="'TN' + node.id"
    class="el-tree-node"
    :class="{
      'is-expanded': node.isExpanded
    }"
  >
    <div
      :style="{ 'padding-left': (node.level - 1) * tree.indent + 'px' }"
      @click="node.expand()"
    >
      <span
        :class="[
          { expanded: node.isExpanded, 'is-leaf': node.isLeaf },
          'el-tree-node__expand-icon',
          tree.iconClass
        ]"
      >
      </span>
      <el-tree-node-content
        class="el-tree-node__label"
        :node="node"
      ></el-tree-node-content>
    </div>
    <div v-show="node.isExpanded">
      <el-tree-node
        v-for="item in node.children"
        :key="item.id"
        :node="item"
      ></el-tree-node>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { TreeNode } from './entity/TreeNode'
import { ElTreeCtx } from './types'
import ElTreeNodeContent from './TreeNodeContent.vue'

export default defineComponent({
  name: 'ElTreeNode',

  components: { ElTreeNodeContent },

  props: {
    node: {
      required: true,
      type: TreeNode
    }
  },

  setup() {
    const tree = inject<ElTreeCtx>('tree')

    return {
      tree
    }
  }
})
</script>

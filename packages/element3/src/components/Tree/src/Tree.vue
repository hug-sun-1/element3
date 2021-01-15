<template>
  <div class="el-tree">
    <el-tree-node
      v-for="(item, index) in modelValue"
      :key="root.children[index].id"
      :node="root.children[index]"
    ></el-tree-node>
    <div class="el-tree__empty-block" v-if="!modelValue.length">
      <span class="el-tree__empty-text">{{ emptyText }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  provide,
  reactive,
  unref
} from 'vue'
import { TreeNode } from './entity/TreeNode'
import { treeProps as props } from './props'
import ElTreeNode from './TreeNode.vue'

export default defineComponent({
  name: 'ElTree',

  components: { ElTreeNode },

  props,

  emits: ['update:data', 'update:modelValue'],

  setup(props, ctx) {
    const instance = getCurrentInstance()
    provide('tree', instance.proxy)

    const { modelValue, defaultNodeKey } = useCompatible(props)

    const { root } = useTree(modelValue, defaultNodeKey, ctx)

    return {
      root,
      modelValue
    }
  }
})

function useCompatible(props) {
  const defaultNodeKey = computed(() =>
    Object.assign(
      props.defaultNodeKey,
      props.props,
      props.nodeKey
        ? {
            id: props.nodeKey
          }
        : null
    )
  )
  // compatible `nodeKey` prop and `props` prop

  const modelValue = computed(() =>
    props.data ? props.data : props.modelValue
  )
  // compatible `data` prop

  return { defaultNodeKey, modelValue }
}

function useTree(data, dk, ctx) {
  const root = reactive(
    new TreeNode<typeof data[0]>(
      {
        [unref(dk).children]: unref(data)
      },
      null,
      unref(dk),
      null
    )
  )

  ctx.emit('update:data', root.raw[unref(dk).children])
  ctx.emit('update:modelValue', root.raw[unref(dk).children])
  // replace raw data and modelValue to reactive data and modelValue

  return { root }
}
</script>

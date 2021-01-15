<template>
  <el-tree
    v-model:data="rawNode"
    :defaultNodeKey="{
      id: 'key',
      label: 'text',
      level: 'level',
      parent: 'parent',
      children: 'childs',
      isDisabled: 'isDisabled',
      isVisable: 'isVisable',
      isExpanded: 'isExpanded'
    }"
  ></el-tree>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  data() {
    return {
      rawNode: [
        {
          key: '1',
          text: 'node1',
          childs: [
            {
              key: '3',
              text: 'node3',
              childs: [
                {
                  key: '5',
                  text: 'node5'
                }
              ]
            },
            {
              key: '4',
              text: 'node4'
            }
          ]
        },
        {
          key: '2',
          text: 'node2',
          childs: []
        }
      ]
    }
  },
  mounted() {
    console.log(this.$data)
    setTimeout(() => {
      this.rawNode.push({ key: '23', text: '测试一下1' })
      // this.rawNode[0].children.splice(0, 1)
      console.log(this.rawNode)
    }, 3000)
  }
})
</script>

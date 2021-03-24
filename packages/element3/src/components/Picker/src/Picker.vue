<template>
  <el-popover placement="buttom" :width="width" v-model="visible">
    <slot name="popover"></slot>
    <template #reference>
      <slot name="default" @click="visible = true"> </slot>
    </template>
  </el-popover>
</template>

<script lang="ts">
import { ref } from 'vue'
import ElPopover from '../../../../packages/popover'
import { props } from './props'

export default {
  name: 'Picker',
  props,
  components: {
    ElPopover
  },
  setup() {
    const visible = ref(false)
    return {
      visible
    }
  }
}
</script>

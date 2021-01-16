<template>
  <el-popover placement="bottom" width="200" trigger="click">
    <slot></slot>
    <template #reference>
      <el-input
        :modelValue="modelValue"
        :prefixIcon="prefixIcon"
        @update:modelValue="$emit('update:modelValue', $event)"
      >
      </el-input>
    </template>
  </el-popover>
</template>

<script>
import { ElInput, ElPopover } from '../../../index'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ElPicker',
  components: { ElInput, ElPopover },
  props: {
    modelValue: {
      type: String
    },
    prefixIcon: {
      type: String,
      default: 'el-icon-time'
    }
  },

  setup() {
    return {}
  }
})
</script>

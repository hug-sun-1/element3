<template>
  <el-input
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
  >
  </el-input>
</template>

<script>
import { ElInput } from '../../Input'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ElPicker',
  components: { ElInput },
  props: {
    modelValue: {
      type: String
    }
  },

  setup() {
    return {}
  }
})
</script>

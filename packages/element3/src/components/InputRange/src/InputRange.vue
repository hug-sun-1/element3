<template>
  <div
    class="el-date-editor el-range-editor el-input__inner"
    :class="classes"
    data-testid="input-range"
  >
    <i
      data-testid="prefix-icon"
      :class="['el-input__icon', 'el-range__icon', prefixIcon]"
    ></i>
    <input
      autocomplete="off"
      class="el-range-input"
      :value="modelValue && modelValue[0]"
      @input="handleStartInput"
      @focus="handleFocus"
      :readonly="!editable || readonly"
      :disabled="disabled"
      :placeholder="startPlaceholder"
      :text-align="align"
    />
    <slot name="range-separator">
      <span data-testid="range-separator" class="el-range-separator">{{
        rangeSeparator
      }}</span>
    </slot>
    <input
      autocomplete="off"
      class="el-range-input"
      :value="modelValue && modelValue[1]"
      @input="handleEndInput"
      @focus="handleFocus"
      :readonly="!editable || readonly"
      :disabled="disabled"
      :placeholder="endPlaceholder"
      :text-align="align"
    />
    <i
      data-testid="clear-icon"
      :class="[
        'el-input__icon',
        'el-range__close-icon',
        clearable ? clearIcon : ''
      ]"
    >
    </i>
  </div>
</template>

<script lang="ts">
import { props } from './props'
import { toRefs, computed } from 'vue'
export default {
  name: 'InputRange',
  props,
  emits: ['update:modelValue', 'focus'],
  setup(props, { emit }) {
    const { modelValue, size } = toRefs(props)

    const handleStartInput = function (event: any) {
      emit('update:modelValue', [event.target.value, modelValue[1]])
    }

    const handleEndInput = function (event: any) {
      emit('update:modelValue', [modelValue[0], event.target.value])
    }

    const handleFocus = function () {
      emit('focus', this)
    }
    const classes = useClasses({ size })

    // const handleBlur = function (event: any) {
    //   emit('blur', event)
    // }

    return { handleStartInput, handleEndInput, handleFocus, classes }
  }
}

const useClasses = ({ size }) => {
  return computed(() => {
    return [size ? `el-range-editor--${size.value}` : '']
  })
}
</script>

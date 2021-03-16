import { PropType } from '@vue/runtime-core'
import { InputRangeSize, InputRangeAlign } from './types'

export const props = {
  modelValue: {
    type: Array
  },
  readonly: {
    type: Boolean
  },
  disabled: {
    type: Boolean
  },
  editable: {
    type: Boolean,
    default: true
  },
  size: {
    type: String as PropType<InputRangeSize>,
    validator(val: string): boolean {
      return ['medium', 'small', 'mini', ''].includes(val)
    }
  },
  startPlaceholder: { type: String },
  endPlaceholder: { type: String },
  align: {
    type: String as PropType<InputRangeAlign>,
    default: 'left'
  },
  prefixIcon: {
    type: String
  }
}

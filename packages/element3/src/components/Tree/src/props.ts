import { DefaultPropKey } from './types'

export const treeProps = {
  defaultNodeKey: {
    type: Object,
    default: (): DefaultPropKey<unknown> => ({
      id: 'id',
      label: 'label',
      parent: 'parent',
      children: 'children',
      isDisabled: 'isDisabled',
      isVisible: 'isVisible',
      isExpanded: 'isExpanded'
    })
  },
  props: {
    type: Object
  },
  data: { type: Array },
  modelValue: { type: Array },
  indent: { type: Number, default: 14 },
  nodeKey: { type: String },
  emptyText: { type: String, default: '内容为空' },

  iconClass: { type: String, default: 'el-icon-caret-right' }
}

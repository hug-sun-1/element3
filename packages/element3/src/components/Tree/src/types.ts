import { TreeNode } from './entity/TreeNode'
import ElTree from './Tree.vue'
import ElTreeNode from './TreeNode.vue'

export type ID = number | string

export interface TreeNodeInstance<RawNode> {
  id: ID
  label: string

  children: TreeNode<RawNode>[]
  parent: TreeNode<RawNode>
  isVisible: boolean
  isDisabled: boolean
  isExpanded: boolean
  isChecked: boolean
}
export interface TreeNodeProps<RawNode> extends TreeNodeInstance<RawNode> {
  readonly level: number
  readonly children: TreeNode<RawNode>[]
  readonly parent: TreeNode<RawNode>
}

export type TreeNodeKeys = keyof TreeNodeInstance<unknown>

export type RawNodeKeys<RawNode> = keyof RawNode

export type DefaultPropKey<RawNode> = {
  [treeNodeKey in TreeNodeKeys]?: keyof RawNode | TreeNodeKeys
}

export type DefaultPropValue = {
  [treeNodeKey in TreeNodeKeys]?: TreeNodeInstance<unknown>[treeNodeKey]
}

export type ElTreeCtx = typeof ElTree

export type ElTreeNodeCtx = typeof ElTreeNode

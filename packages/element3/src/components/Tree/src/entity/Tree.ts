import { DefaultNodeKey, RawNodeBase } from '../types'
import { HandlerCb, ID, TreeNode } from './TreeNode'
import { TreeMapper } from './TreeMapper'

export class Tree<RawNode extends RawNodeBase> {
  private _mapper: TreeMapper<RawNode>
  private _defaultNodeKey: DefaultNodeKey<RawNode>

  get root(): TreeNode {
    return this._mapper.treeNode
  }

  get rootProxy(): TreeNode {
    return this._mapper.treeNodeProxy
  }

  get rawRootProxy(): RawNode {
    return this._mapper.rawNodeProxy
  }

  get rawNodesProxy(): RawNode[] {
    return this.rawRootProxy[this._defaultNodeKey.children]
  }

  get isEmpty() {
    return this.root.children.length === 0
  }

  constructor(rawNodes: RawNode[], defaultNodeKey: DefaultNodeKey<RawNode>) {
    this._defaultNodeKey = Object.assign(
      {
        id: 'id',
        label: 'label',
        children: 'children'
        // isDisabled: 'isDisabled',
        // isAsync: 'isAsync',
        // isChecked: 'isChecked',
        // isVisible: 'isVisible',
        // isExpanded: 'isExpanded',
        // isLeaf: 'isLeaf'
      },
      defaultNodeKey
    )

    this._mapper = new TreeMapper<RawNode>(
      {
        [this._defaultNodeKey.label]: 'ROOT',
        [this._defaultNodeKey.children]: rawNodes
      } as RawNode,
      this._defaultNodeKey
    )
  }

  setCheckedByIds(ids: ID[]): void {
    this.rootProxy.depthEach((currentNode: TreeNode) => {
      if (ids.includes(currentNode.id)) {
        currentNode.setChecked(true)
      }
    })
  }

  getCheckedIds(): ID[] {
    return this.root
      .findMany((node) => node !== this.root && node.isChecked)
      .map((node) => node.id)
  }

  expandNodeByIds(ids: ID[]): void {
    this.rootProxy.depthEach((currentNode: TreeNode) => {
      if (ids.includes(currentNode.id)) {
        currentNode.expand(true)
      }
    })
  }

  getExpandedNodeIds(): ID[] {
    return this.root
      .findMany((node) => node !== this.root && node.isExpanded)
      .map((node) => node.id)
  }

  expandAll(v = true): void {
    this.root.depthEach((currentNode) => {
      currentNode.expand(v, false)
    })
  }

  filter(target: HandlerCb | string): TreeNode[] {
    const nodes = this.root.findMany(target)
    this.root.depthEach((currentNode) => {
      currentNode.hide()
    })
    nodes.forEach((node) => node.show())
    return nodes
  }

  getRawNode(treeNode: TreeNode): RawNode {
    return this._mapper.getRawNode(treeNode)
  }

  getTreeNode(rawNode: RawNode): TreeNode {
    return this._mapper.getTreeNode(rawNode)
  }
}

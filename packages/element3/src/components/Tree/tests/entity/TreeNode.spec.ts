import { reactive } from 'vue'
import { TreeNode } from '../../src/entity/TreeNode'
import { DefaultPropKey, TreeNodeInstance } from '../../src/types'

export function createTestData(): any {
  const rawNode = reactive({
    key: 1,
    text: 'hello',
    isChecked: false,
    isExpanded: false,
    childs: [
      {
        key: 11,
        text: 'child11',
        childs: [
          {
            key: 111,
            text: 'child111',
            childs: []
          }
        ]
      }
    ]
  })

  const dk: DefaultPropKey<typeof rawNode> = {
    id: 'key',
    label: 'text',
    children: 'childs',
    isChecked: 'isChecked'
  }

  const dv: TreeNodeInstance<typeof rawNode> = {
    id: 0,
    label: '',
    children: [],
    parent: null,
    isChecked: false,
    isDisabled: false,
    isExpanded: false,
    isVisible: true
  }

  const treeNode = new TreeNode<typeof rawNode>(rawNode, null, dk, dv)

  return { rawNode, treeNode, dk, dv }
}

describe('TreeNode.ts', () => {
  it('test reactive result', () => {
    const { rawNode, treeNode } = createTestData()
    treeNode.label = 'test'
    treeNode.isChecked = true
    treeNode.isExpanded = true
    treeNode.raw.key = 666
    expect(rawNode.text).toEqual('test')
    expect(rawNode.isChecked).toEqual(true)
    expect(treeNode.isExpanded).toEqual(true)
    expect(rawNode.key).toEqual(666)

    // add a node
    treeNode.raw.childs.push({ key: 999, text: 'js', childs: [] })
    expect(treeNode.children).toHaveLength(2)
    expect(treeNode.children[1].id).toEqual(999)

    // delete a node
    treeNode.raw.childs.splice(0, 1)
    expect(treeNode.children).toHaveLength(1)
    expect(treeNode.children[0].id).toEqual(999)

    // cover childs
    treeNode.raw.childs = [{ key: 888, text: 'ts', childs: [] }]
    expect(treeNode.children).toHaveLength(1)
    expect(treeNode.children[0].id).toEqual(888)
  })

  it('find treeNodeKey by rawNodeKey', () => {
    const { treeNode } = createTestData()
    expect(treeNode.findDkByRk('childs')).toEqual('children')
  })

  it('expand node', () => {
    const { rawNode, treeNode } = createTestData()
    treeNode.expand()
    expect(treeNode.isExpanded).toEqual(true)
    expect(rawNode.isExpanded).toEqual(true)
  })
})

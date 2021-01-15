import TreeNodeContent from '../src/TreeNodeContent.vue'
import { mount } from '@vue/test-utils'
import { createTestData } from './entity/TreeNode.spec'

describe('TreeNodeContent.vue', () => {
  it('show label', () => {
    const { treeNode } = createTestData()
    const tnc = mount(TreeNodeContent, {
      props: {
        node: treeNode
      }
    })

    expect(tnc).toHaveTextContent('hello')
  })
})

import { createTestData } from './entity/TreeNode.spec'
import TreeNode from '../src/TreeNode.vue'
import { mount } from '@vue/test-utils'

describe('TreeNode.vue', () => {
  it('render treeNode', () => {
    const { treeNode } = createTestData()
    const wrapper = mount(TreeNode, {
      props: {
        node: treeNode
      },
      global: {
        provide: {
          tree: {
            indent: 10
          }
        }
      }
    })

    expect(wrapper.find('#TN1').exists()).toBeTruthy()
    expect(wrapper.find('#TN11').exists()).toBeTruthy()
    expect(wrapper.find('#TN111').exists()).toBeTruthy()
  })
})

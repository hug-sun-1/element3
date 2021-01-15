import { mount } from '@vue/test-utils'
import { reactive } from 'vue'
import { useForRefs } from '../../src/utils/useTools'

describe('useTools.ts', () => {
  it('useForRefs', () => {
    /**
     * Implement the Ref array in v-for
     * https://v3.cn.vuejs.org/guide/migration/array-refs.html
     */
    const warpper = mount({
      template: `
        <div v-for="item in arr" :key="item" :ref="itemRefs">{{item}}</div>
      `,
      setup() {
        const children = reactive([])
        const itemRefs = useForRefs(children)
        return {
          arr: [1, 2, 5, 8],
          itemRefs,
          children
        }
      }
    })
    expect(warpper.vm.children).toHaveLength(4)
  })
})

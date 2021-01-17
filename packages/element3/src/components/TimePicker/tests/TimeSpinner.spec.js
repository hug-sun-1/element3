import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import TimeSpinner from '../src/TimeSpinner.vue'

describe('TimeSpinner.vue', () => {
  /**
   * 功能：
   * 1、根据 modelValue 来选中时间
   * 2、滑动选择时间并且影响modelValue
   * 3、鼠标over触发over事件获取到鼠标在的滚动条
   * 4、通过一个时间范围来限制选择的时间段
   * 5、通过滚动调的箭头控制时间
   */

  describe('vModel time', () => {
    const wrapper = mount({
      components: { TimeSpinner },
      template: `
        <TimeSpinner v-model="time"></TimeSpinner>
      `,
      setup() {
        return {
          time: ref('11:22:33')
        }
      }
    })

    const activeEl = wrapper.findAll('el-time-spinner__item active')
    expect(activeEl[0].text()).toEqual('11')
    expect(activeEl[1].text()).toEqual('22')
    expect(activeEl[2].text()).toEqual('33')

    const timeSpinner = wrapper.findComponent({ name: 'ElTimeSpinner' })
    timeSpinner.vm.$emit('update:modelValue', '22:33:00')
    expect(wrapper.vm.time).toEqual('22:33:00')
  })
})

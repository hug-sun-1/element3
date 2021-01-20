import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'
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

  it('init', () => {
    const wrapper = mount(TimeSpinner)
    const ulElement = wrapper.findAll('ul')
    expect(ulElement[0].findAll('li')).toHaveLength(24)
    expect(ulElement[1].findAll('li')).toHaveLength(60)
    expect(ulElement[2].findAll('li')).toHaveLength(60)
  })

  it('v-model', async () => {
    const wrapper = mount({
      components: { TimeSpinner },
      template: `
        <TimeSpinner v-model="time"></TimeSpinner>
      `,
      setup() {
        return {
          time: ref(new Date(2016, 9, 10, 18, 40))
        }
      }
    })
    const activeEl = wrapper.findAll('[class *= "active"]')
    expect(activeEl[0].text()).toEqual('18')
    expect(activeEl[1].text()).toEqual('40')
    expect(activeEl[2].text()).toEqual('00')
    const timeSpinner = wrapper.findComponent({ name: 'ElTimeSpinner' })
    timeSpinner.vm.$emit('update:modelValue', new Date(2016, 9, 10, 19, 49))
    await nextTick()
    const activeNewEl = wrapper.findAll('[class *= "active"]')
    expect(activeNewEl[0].text()).toEqual('19')
    expect(activeNewEl[1].text()).toEqual('49')
    expect(activeNewEl[2].text()).toEqual('00')
  })

  it('hidden seconds', () => {
    const wrapper = mount(TimeSpinner, {
      props: {
        showSeconds: false,
        modelValue: ref(new Date(2016, 9, 10, 18, 40))
      }
    })

    const ElScrollbar = wrapper.findAll(
      '[class="el-scrollbar el-time-spinner__wrapper"]'
    )
    expect(ElScrollbar[2].isVisible()).toBe(false)
  })

  it('use arrow control', () => {
    const wrapper = mount(TimeSpinner, {
      props: {
        arrowControl: true,
        modelValue: ref(new Date(2016, 9, 10, 18, 40))
      }
    })
    expect(wrapper.find('i').exists()).toBe(true)
  })
})

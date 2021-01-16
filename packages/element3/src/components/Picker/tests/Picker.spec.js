import Picker from '../src/Picker.vue'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'

describe('Picker.vue', () => {
  it('value or v-model', () => {
    const wrapper = mount({
      template: `
        <Picker v-model="picker"></Picker>
      `,
      setup() {
        const picker = ref('picker')
        return {
          picker
        }
      },
      components: {
        Picker
      }
    })
    expect(wrapper.find('input').element.value).toBe('picker')
    wrapper.find('input').setValue('test')
    expect(wrapper.find('input').element.value).toBe('test')
  })

  it('test pupover slot', () => {
    const wrapper = mount(Picker, {
      slots: {
        default: 'hello'
      }
    })

    expect(wrapper.findComponent({ name: 'ElPopover' })).toHaveTextContent(
      'hello'
    )
  })

  it('set prefix-icon', () => {
    const wrapper = mount(Picker, {
      props: {
        prefixIcon: 'el-icon-time'
      }
    })

    expect(
      wrapper.findComponent({ name: 'ElInput' }).props('prefixIcon')
    ).toEqual('el-icon-time')
  })
})

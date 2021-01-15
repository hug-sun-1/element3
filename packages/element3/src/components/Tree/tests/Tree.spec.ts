import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'
import Tree from '../src/Tree.vue'

describe('Tree.vue', () => {
  it('render tree data by `props.modelValue`.', async () => {
    const data = [
      {
        key: '1',
        text: 'node1',
        childs: [
          {
            key: '3',
            text: 'node3',
            childs: [
              {
                key: '5',
                text: 'node5'
              }
            ]
          },
          {
            key: '4',
            text: 'node4'
          }
        ]
      },
      {
        key: '2',
        text: 'node2',
        childs: []
      }
    ]
    const wrapper = mount(Tree, {
      props: {
        modelValue: data,
        defaultNodeKey: {
          id: 'key',
          label: 'text',
          children: 'childs'
        }
      }
    })

    await nextTick()
    expect(wrapper.find('#TN1').exists()).toBeTruthy()
    expect(wrapper.find('#TN2').exists()).toBeTruthy()
    expect(wrapper.find('#TN3').exists()).toBeTruthy()
    expect(wrapper.find('#TN4').exists()).toBeTruthy()
    expect(wrapper.find('#TN5').exists()).toBeTruthy()
  })

  it('when empty tree data.', async () => {
    const data = []
    const wrapper = mount(Tree, {
      props: {
        modelValue: data,
        defaultNodeKey: {
          id: 'key',
          label: 'text',
          children: 'childs'
        }
      }
    })

    await nextTick()
    expect(wrapper.text()).toEqual('内容为空')
  })

  it('vModel tree data by `props.modelValue`.', async () => {
    const data = ref([
      {
        key: '1',
        text: 'node1',
        childs: [
          {
            key: '3',
            text: 'node3',
            childs: [
              {
                key: '5',
                text: 'node5'
              }
            ]
          },
          {
            key: '4',
            text: 'node4'
          }
        ]
      },
      {
        key: '2',
        text: 'node2',
        childs: []
      }
    ])
    const wrapper = mount(Tree, {
      props: {
        modelValue: data,
        'onUpdate:modelValue': (v) => {
          data.value = v
        },
        defaultNodeKey: {
          id: 'key',
          label: 'text',
          children: 'childs'
        }
      }
    })

    data.value.splice(0, 1)
    await nextTick()
    expect(wrapper.find('#TN1').exists()).toBeFalsy()
    expect(wrapper.find('#TN2').exists()).toBeTruthy()
    expect(wrapper.find('#TN3').exists()).toBeFalsy()
    expect(wrapper.find('#TN4').exists()).toBeFalsy()
    expect(wrapper.find('#TN5').exists()).toBeFalsy()

    data.value.push({
      key: '6',
      text: 'node6',
      childs: []
    })
    await nextTick()
    expect(wrapper.find('#TN6').exists()).toBeTruthy()
  })
})

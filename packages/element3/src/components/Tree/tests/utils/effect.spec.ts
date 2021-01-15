import { watch } from '../../src/utils/effect'

describe('effect.ts', () => {
  it('watch a obj', () => {
    const call = jest.fn()
    const obj = {
      id: 1,
      label: 'hello'
    }
    const _obj = watch(obj, call)

    _obj.id = 2
    expect(call).toHaveBeenCalledWith({
      type: 'set',
      key: 'id',
      value: 2,
      target: obj,
      receiver: _obj
    })

    console.log(_obj.id)
    expect(call).toHaveBeenCalledWith({
      type: 'get',
      key: 'id',
      target: obj,
      receiver: _obj
    })

    delete _obj.id
    expect(call).toHaveBeenCalledWith({ type: 'del', key: 'id', target: obj })
  })
})

import DatePicker from '../src/DatePicker.vue'
import { render, fireEvent, waitFor } from '@testing-library/vue'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'

describe('DatePicker', () => {
  // it('snapshot', () => {
  //   const { baseElement } = render(DatePicker)
  //   expect(baseElement).toMatchSnapshot()
  // })

  it('show second', async () => {
    const { getByTestId, rerender } = render(DatePicker, {
      props: {
        showSeconds: true
      }
    })
    expect(getByTestId('el-time-spinner')).toHaveClass('has-seconds')
    await rerender({
      showSeconds: false
    })
    expect(getByTestId('el-time-spinner')).not.toHaveClass('has-seconds')
  })

  it('arrowControl style', async () => {
    const { getByTestId, rerender } = render(DatePicker, {
      props: {
        arrowControl: true
      }
    })
    expect(getByTestId('el-time-spinner')).toHaveClass('has-arrow')
    await rerender({
      arrowControl: false
    })
    expect(getByTestId('el-time-spinner')).not.toHaveClass('has-arrow')
  })

  it('get timer spinner item', async () => {
    const { getAllByRole } = render(DatePicker, {
      props: {
        showSeconds: true
      }
    })
    expect(getAllByRole('el-time-spinner__wrapper').length).toBe(3)
  })

  it('get init data', () => {
    const { getAllByRole } = render(DatePicker, {
      props: {
        modelValue: '13:22:20',
        showSeconds: true
      }
    })
    expect(getAllByRole('active')[0].innerHTML).toBe('13')
    expect(getAllByRole('active')[1].innerHTML).toBe('22')
    expect(getAllByRole('active')[2].innerHTML).toBe('20')
  })

  it('get type when it hover', async () => {
    const { getAllByRole } = render(DatePicker, {
      props: {
        modelValue: '13:22:20',
        showSeconds: true
      }
    })
    const handleClick = jest.fn()
    const list = getAllByRole('el-time-spinner__wrapper')
    await fireEvent.mouseEnter(list[0])
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('type mousemove event', () => {
    const { getAllByRole } = render(DatePicker, {
      props: {
        modelValue: '13:22:20',
        showSeconds: true
      }
    })
    const list = getAllByRole('el-time-spinner__wrapper')
    fireEvent.mouseEnter(list[0])
    // console.log(document.querySelectorAll('.el-scrollbar__wrap')[0])
  })
  it('get value when undo event', () => {
    const { getByTestId } = render(DatePicker, {
      props: {
        modelValue: '13:22:20',
        showSeconds: true
      }
    })
    console.log(getByTestId('el-time-spinner'))
  })
  it('get value when save event', () => {})
})

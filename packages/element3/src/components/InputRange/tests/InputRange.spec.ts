import { render, fireEvent } from '@testing-library/vue'
import InputRange from '../src/InputRange.vue'

describe('InputRange.vue', () => {
  it('set modelValue', async () => {
    const values = ['18:30:00', '20:30:00']
    const { getAllByRole } = render(InputRange, {
      props: {
        modelValue: values
      }
    })
    const inputs = getAllByRole('textbox') as HTMLInputElement[]
    expect(inputs[0].value).toBe(values[0])
    expect(inputs[1].value).toBe(values[1])

    await fireEvent.update(inputs[0], '19:30:00')
    expect(inputs[0]).toHaveValue('19:30:00')

    await fireEvent.update(inputs[1], '21:30:00')
    expect(inputs[1]).toHaveValue('21:30:00')
  })

  it('should lose focus', async () => {
    const handleBlur = jest.fn()
    const temp = {
      template: '<InputRange @blur="handleBlur"></InputRange>',
      components: {
        InputRange
      },
      methods: {
        handleBlur
      }
    }
    const { getAllByRole } = render(temp)
    const inputs = getAllByRole('textbox')
    // inputs[0].blur()
    await fireEvent.blur(inputs[0])
    expect(handleBlur).toHaveBeenCalled()
    expect(inputs[0]).not.toHaveFocus()
  })

  it('should get focus', () => {
    const temp = {
      template: '<InputRange @focus="handleFocus"></InputRange>',
      components: {
        InputRange
      },
      methods: {
        handleFocus() {
          console.log('trigger focus event')
        }
      }
    }
    const { getAllByRole } = render(temp)
    const inputs = getAllByRole('textbox')
    inputs[0].focus()
    expect(inputs[0]).toHaveFocus()
  })

  it('should be readonly', () => {
    const { getAllByRole } = render(InputRange, {
      props: {
        readonly: true
      }
    })
    const inputs = getAllByRole('textbox')
    expect(inputs[0]).toHaveAttribute('readonly')
    expect(inputs[1]).toHaveAttribute('readonly')
  })

  it('should be disabled', () => {
    const { getAllByRole } = render(InputRange, {
      props: {
        disabled: true
      }
    })
    const inputs = getAllByRole('textbox')
    expect(inputs[0]).toHaveAttribute('disabled')
    expect(inputs[1]).toHaveAttribute('disabled')
  })

  it('should not be editable', () => {
    const { getAllByRole } = render(InputRange, {
      props: { editable: false }
    })
    const inputs = getAllByRole('textbox')
    expect(inputs[0]).toHaveAttribute('readonly')
    expect(inputs[1]).toHaveAttribute('readonly')
  })

  it('set InputRange size', async () => {
    const { getByTestId, rerender } = render(InputRange, {
      props: {
        size: 'small'
      }
    })
    expect(getByTestId('input-range')).toHaveClass('el-range-editor--small')

    await rerender({
      size: 'mini'
    })

    expect(getByTestId('input-range')).toHaveClass('el-range-editor--mini')
  })

  it('placeholders should be displayed', () => {
    const startPlaceholder = '起始时间'
    const endPlaceholder = '起始时间'
    const { getAllByRole } = render(InputRange, {
      props: {
        startPlaceholder: startPlaceholder,
        endPlaceholder: endPlaceholder
      }
    })
    const inputs = getAllByRole('textbox') as HTMLInputElement[]

    expect(inputs[0].placeholder).toBe(startPlaceholder)
    expect(inputs[1].placeholder).toBe(endPlaceholder)
  })

  it('should be centered', () => {
    const align = 'center'
    const { getAllByRole } = render(InputRange, {
      props: {
        align
      }
    })
    const inputs = getAllByRole('textbox') as HTMLInputElement[]
    expect(inputs[0]).toHaveAttribute('text-align')
    expect(inputs[1]).toHaveAttribute('text-align')
  })

  it('set prefix-icon', () => {
    const prefixIcon = 'prefix-icon'
    const { getByTestId } = render(InputRange, {
      props: {
        prefixIcon
      }
    })

    expect(getByTestId('prefix-icon')).toHaveClass(prefixIcon)
  })

  it('set clear-icon', () => {
    const clearIcon = 'clear-icon'
    const { getByTestId } = render(InputRange, {
      props: {
        clearIcon
      }
    })

    expect(getByTestId('clear-icon')).toHaveClass(clearIcon)
  })

  it('the clear button should be hidden', () => {
    const { getByTestId } = render(InputRange, {
      props: {
        clearable: false
      }
    })
    expect(getByTestId('clear-icon')).not.toHaveClass('clear-icon')
  })

  it('set range separator', () => {
    const rangeSeparator = '至'
    const { getByTestId } = render(InputRange, {
      props: {
        rangeSeparator
      }
    })
    const span = getByTestId('range-separator')
    expect(span).toHaveTextContent(rangeSeparator)
  })

  // it('', () => {
  //   const values = ['18:30:00', '20:30:00']
  //   const { getAllByRole } = render(InputRange, {
  //     props: {
  //       modelValue: values
  //     }
  //   })
  // })
})

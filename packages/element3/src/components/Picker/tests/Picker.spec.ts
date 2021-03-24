import { render, fireEvent } from '@testing-library/vue'
import Picker from '../src/Picker.vue'

describe('Picker.vue', () => {
  it('test #default slot', () => {
    const { getByText } = render(Picker, {
      slots: {
        default: 'Input'
      }
    })

    expect(getByText('Input')).toBeVisible()
  })

  it('test #popover slot', async () => {
    const { getByTestId } = render(Picker, {
      slots: {
        default: `<input data-testid="input" />`,
        popover: `<span data-testid="popover"> </span>`
      }
    })

    await fireEvent.click(getByTestId('input'))

    expect(getByTestId('popover')).toBeVisible()
  })
})

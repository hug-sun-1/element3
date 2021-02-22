import { parseLayout } from '../../src/tools/parseLayout'

describe('parseLayout.ts', () => {
  it('test method', () => {
    const layoutStr = 'prev, pager, next, -> , jumper, ->, total'
    const result = parseLayout(layoutStr)
    expect(result).toEqual(['prev', 'pager', 'next', ['jumper', ['total']]])
  })
})

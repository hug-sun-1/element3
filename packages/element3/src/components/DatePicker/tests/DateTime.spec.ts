import { useDateTime } from '../src/entity/DateTime'

describe('DateTime.ts', () => {
  it('getRangeTime', () => {
    const { getInitDate } = useDateTime()
    expect(getInitDate(['11:22:00-12:33:00'])).toBe('11:22:00')
    expect(getInitDate()).toBe('')
  })

  it('getDisabledArr', () => {
    const { getDisabledArr } = useDateTime()
    expect(getDisabledArr(['11:22:00-12:23:02'], 'hours')).toEqual([11, 12])
    expect(getDisabledArr(['11:22:00-12:23:00'], 'minutes')).toEqual([22, 23])
    expect(getDisabledArr(['11:22:00-12:23:02'], 'seconds')).toEqual([0, 1, 2])
  })
})

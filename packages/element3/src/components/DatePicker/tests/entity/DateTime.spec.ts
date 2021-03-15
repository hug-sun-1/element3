import { DateTime } from '../../src/entity/DateTime'

describe('DateTime.ts', () => {
  it('get timestamp', () => {
    const dateTime = new DateTime('2021-20-11 22:33:00', 'YYYY-MM-DD HH:mm:ss')

    expect(dateTime.getTimestamp()).toBe(1660228380000)
  })

  it('get now timestamp', () => {
    const dateTime = new DateTime()

    expect(dateTime.getTimestamp()).toBeLessThanOrEqual(Date.now())
  })
})

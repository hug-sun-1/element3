import { DateTime } from '../../src/entity/DateTime'

describe('DateTime.ts', () => {
  it('get timestamp', () => {
    const dateTime = new DateTime('2021-12-11 22:33:00', 'YYYY-MM-DD HH:mm:ss')

    expect(dateTime.getTimestamp()).toBe(
      new Date('2021-12-11 22:33:00').getTime()
    )
  })

  it('get now timestamp', () => {
    const dateTime = new DateTime()

    expect(dateTime.getTimestamp()).toBeLessThanOrEqual(Date.now())
  })

  it('to date', () => {
    const dateTime = new DateTime('2021-12-11 22:33:00', 'YYYY-MM-DD HH:mm:ss')

    expect(dateTime.toDate() instanceof Date).toBeTruthy()
  })

  it('format', () => {
    const dateTime = new DateTime('2021-12-11 22:33:00')
    expect(dateTime.format('YYYY-MM-DD HH:mm:ss')).toBe('2021-12-11 22:33:00')
  })
})

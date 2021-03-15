import { DateTimeUtils } from '../../src/tools/DateTimeUtils'

describe('DateTimeUtils.ts', () => {
  it('generate date and time', () => {
    expect(DateTimeUtils.generateYear(2021, 20)).toEqual([2011, 2031])
    expect(DateTimeUtils.generateMouth()).toEqual([1, 12])
    expect(DateTimeUtils.generateDay(2021, 2)).toEqual([1, 28])
    expect(DateTimeUtils.generateDay(2020, 2)).toEqual([1, 29])
    expect(DateTimeUtils.generateHour()).toEqual([0, 23])
    expect(DateTimeUtils.generateMinutes()).toEqual([0, 59])
    expect(DateTimeUtils.generateSecond()).toEqual([0, 59])
  })
})

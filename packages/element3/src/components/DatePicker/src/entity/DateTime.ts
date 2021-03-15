import dayjs, { Dayjs } from 'dayjs'
import isLeapYear from 'dayjs/plugin/isLeapYear'

type DateTimeProp = {
  year: number
  month: number
  day: number

  hour: number
  minute: number
  second: number
}

export class DateTime {
  private _d: Dayjs

  constructor(datetime?: string | Date, template?: string) {
    this._d = dayjs(datetime, template)
  }

  getTimestamp(): number {
    return this._d.valueOf()
  }

  isLeapYear(): boolean {
    dayjs.extend(isLeapYear)
    return this._d.isLeapYear()
  }
}

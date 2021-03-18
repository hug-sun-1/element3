import dayjs, { Dayjs, UnitType } from 'dayjs'
import isLeapYear from 'dayjs/plugin/isLeapYear'

type DateTimeProp = {
  [key in UnitType]?: number
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

  toDate(): Date {
    return this._d.toDate()
  }

  format(template: string): string {
    return this._d.format(template)
  }

  setDateTime(datetime: DateTimeProp): DateTime {
    if (typeof datetime === 'object') {
      for (const key in datetime) {
        const value = datetime[key]
        this._d = this._d.set(key as UnitType, value)
      }
    }

    return this
  }
}

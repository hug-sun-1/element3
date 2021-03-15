import { DateTime } from '../entity/DateTime'

export class DateTimeUtils {
  static generateSecond(): number[] {
    return [0, 59]
  }
  static generateMinutes(): number[] {
    return [0, 59]
  }
  static generateHour(): number[] {
    return [0, 23]
  }
  static generateDay(year: number, mouth: number): number[] {
    const mouthDayNumber = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    if (new DateTime(year.toString()).isLeapYear()) {
      mouthDayNumber[1] = 29
    }

    return [1, mouthDayNumber[mouth - 1]]
  }
  static generateMouth(): number[] {
    return [1, 12]
  }
  static generateYear(year: number, size: number): number[] {
    const mid = Math.floor(size / 2)
    return [year - mid, year + mid]
  }
}

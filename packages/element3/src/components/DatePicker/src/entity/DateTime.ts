export const useDateTime = (): any => {
  const newArray = (start: number, end: number) => {
    const result = []
    for (let i = start; i <= end; i++) {
      result.push(i)
    }
    return result
  }
  const getSeletedDate = (date: string[] = []) => {
    const dataJoin = date.join()
    const dateTime = ''
    if (Array.isArray(dateTime)) return date
    return dataJoin.split('-')
  }

  const getInitDate = (date?: string[]): string => {
    const dateTime = getSeletedDate(date)
    if (Array.isArray(dateTime)) return dateTime[0] || ''
    return ''
  }
  const makeList = (total: number, disabledArr: number[]) => {
    const arr = []
    for (let i = 0; i < total; i++) {
      arr[i] = disabledArr ? !disabledArr.includes(i) : false
    }
    return arr
  }

  const getDisabledArr = (date: string[], type: string): number[] => {
    const list = getSeletedDate(date)
    if (list.length > 1) {
      const startTime = list[0].split(':')
      const endTime = list[1].split(':')
      const typeList = { hours: 0, minutes: 1, seconds: 2 }
      const startRang = startTime[typeList[type]]
      const endRang = endTime[typeList[type]]
      return newArray(Number(startRang), Number(endRang))
    }
    return []
  }

  return { getInitDate, getSeletedDate, makeList, getDisabledArr }
}

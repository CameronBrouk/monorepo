import {
  endOfMonth,
  subMonths,
  addMonths,
  addDays,
  startOfMonth,
  eachDayOfInterval,
  subDays
} from 'date-fns/fp'

export const getPreviousMonthTiles = (date: Date) => {
  const firstDateInCurrentMonth = startOfMonth(date).getDay()
  const endOfPrevMonth = endOfMonth(subMonths(1, date))

  if (firstDateInCurrentMonth === 0) return []

  return eachDayOfInterval({
    start: subDays(firstDateInCurrentMonth - 1, endOfPrevMonth),
    end: endOfPrevMonth
  })
}

export const getCurrentMonthTiles = (date: Date) =>
  eachDayOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date)
  })

export const getNextMonthTiles = (date: Date) => {
  const prevTilesAmount =
    getPreviousMonthTiles(date).length + getCurrentMonthTiles(date).length

  if (prevTilesAmount === 35 || prevTilesAmount === 42) return []

  const startOfNextMonth = startOfMonth(addMonths(1, date))

  if (prevTilesAmount < 35) {
    return eachDayOfInterval({
      start: startOfNextMonth,
      end: addDays(35 - prevTilesAmount - 1, startOfNextMonth)
    })
  }

  return eachDayOfInterval({
    start: startOfNextMonth,
    end: addDays(42 - prevTilesAmount - 1, startOfNextMonth)
  })
}

export const getDayTiles = (date: Date) => [
  ...getPreviousMonthTiles(date),
  ...getCurrentMonthTiles(date),
  ...getNextMonthTiles(date)
]

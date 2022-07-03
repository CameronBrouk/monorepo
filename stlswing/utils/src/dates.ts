import {
  isThisWeek,
  isThisMonth,
  isThisYear,
  isThisHour
} from 'date-fns'
import {
  subWeeks,
  addWeeks,
  startOfWeek,
  endOfWeek,
  subDays,
  addDays,
  startOfDay,
  endOfDay,
  subMonths,
  addMonths,
  startOfMonth,
  endOfMonth,
  subYears,
  addYears,
  startOfYear,
  endOfYear,
  subHours,
  addHours,
  startOfHour,
  endOfHour,
  format,
  getTime
} from 'date-fns/fp'
import { pipe, any, map, subtract, range } from 'ramda'

type monthsType = 'full' | 'condensed' | 'single'
export const getMonthsOfYear = (type: monthsType) =>
  range(0, 12)
    .map((number) => new Date(2020, number, 1))
    .map(
      format(type === 'full' ? 'LLLL' : type === 'condensed' ? 'LLL' : 'LLLLL')
    )

export const monthDisplay = (date: Date, type: monthsType) =>
  format(
    type === 'full' ? 'LLLL' : type === 'condensed' ? 'LLL' : 'LLLLL',
    date
  )

export const getCurrentMonth = (type: monthsType) =>
  format(
    type === 'full' ? 'LLLL' : type === 'condensed' ? 'LLL' : 'LLLLL',
    new Date()
  )

// prettier-ignore
export const dayAbbreviations = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ]
export const mobileDayAbbreviations = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

export const FULL_MONTHS_IN_YEAR = getMonthsOfYear('full')

// Week Helpers
export const startOfPreviousDay = pipe(subDays(1), startOfDay)
export const startOfNextDay = pipe(addDays(1), startOfDay)
export const endOfPreviousDay = pipe(subDays(1), endOfDay)
export const endOfNextDay = pipe(addDays(1), endOfDay)
export const thisDayInterval = (date: Date | number) => ({
  start: startOfDay(date),
  end: endOfDay(date)
})
export const nextDayInterval = (date: Date | number) => ({
  start: startOfNextDay(date),
  end: endOfNextDay(date)
})
export const previousDayInterval = (date: Date | number) => ({
  start: startOfPreviousDay(date),
  end: endOfPreviousDay(date)
})

// Week Helpers
export const startOfPreviousWeek = pipe(subWeeks(1), startOfWeek)
export const startOfNextWeek = pipe(addWeeks(1), startOfWeek)
export const endOfPreviousWeek = pipe(subWeeks(1), endOfWeek)
export const endOfNextWeek = pipe(addWeeks(1), endOfWeek)
export const thisWeekInterval = (date: Date | number) => ({
  start: startOfWeek(date),
  end: endOfWeek(date)
})
export const nextWeekInterval = (date: Date | number) => ({
  start: startOfNextWeek(date),
  end: endOfNextWeek(date)
})
export const previousWeekInterval = (date: Date | number) => ({
  start: startOfPreviousWeek(date),
  end: endOfPreviousWeek(date)
})
export const anyThisWeek = any(isThisWeek)
export const anyNextWeek = pipe(map(addWeeks(1)), anyThisWeek)
export const anyPreviousWeek = pipe(map(subWeeks(1)), anyThisWeek)

// Month Helpers
export const startOfPreviousMonth = pipe(subMonths(1), startOfMonth)
export const startOfNextMonth = pipe(addMonths(1), startOfMonth)
export const endOfPreviousMonth = pipe(subMonths(1), endOfMonth)
export const endOfNextMonth = pipe(addMonths(1), endOfMonth)
export const thisMonthInterval = (date: Date | number) => ({
  start: startOfMonth(date),
  end: endOfMonth(date)
})
export const nextMonthInterval = (date: Date | number) => ({
  start: startOfNextMonth(date),
  end: endOfNextMonth(date)
})
export const previousMonthInterval = (date: Date | number) => ({
  start: startOfPreviousMonth(date),
  end: endOfPreviousMonth(date)
})
export const anyThisMonth = any(isThisMonth)
export const anyNextMonth = pipe(map(addMonths(1)), anyThisMonth)
export const anyPreviousMonth = pipe(map(subMonths(1)), anyThisMonth)

// Year Helpers
export const startOfPreviousYear = pipe(subYears(1), startOfYear)
export const startOfNextYear = pipe(addYears(1), startOfYear)
export const endOfPreviousYear = pipe(subYears(1), endOfYear)
export const endOfNextYear = pipe(addYears(1), endOfYear)
export const thisYearInterval = (date: Date | number) => ({
  start: startOfYear(date),
  end: endOfYear(date)
})
export const nextYearInterval = (date: Date | number) => ({
  start: startOfNextYear(date),
  end: endOfNextYear(date)
})
export const previousYearInterval = (date: Date | number) => ({
  start: startOfPreviousYear(date),
  end: endOfPreviousYear(date)
})
export const anyThisYear = any(isThisYear)
export const anyNextYear = pipe(map(addYears(1)), anyThisYear)
export const anyPreviousYear = pipe(map(subYears(1)), anyThisYear)

// Hour Helpers
export const startOfPreviousHour = pipe(subHours(1), startOfHour)
export const startOfNextHour = pipe(addHours(1), startOfHour)
export const endOfPreviousHour = pipe(subHours(1), endOfHour)
export const endOfNextHour = pipe(addHours(1), endOfHour)
export const thisHourInterval = (date: Date | number) => ({
  start: startOfHour(date),
  end: endOfHour(date)
})
export const nextHourInterval = (date: Date | number) => ({
  start: startOfNextHour(date),
  end: endOfNextHour(date)
})
export const previousHourInterval = (date: Date | number) => ({
  start: startOfPreviousHour(date),
  end: endOfPreviousHour(date)
})
export const anyThisHour = any(isThisHour)
export const anyNextHour = pipe(map(addHours(1)), anyThisHour)
export const anyPreviousHour = pipe(map(subHours(1)), anyThisHour)

// Array Of Dates Helpers

// Array Of Dates Helpers
// prettier-ignore
export const getClosestDate = (dates: (Date | number)[]) => pipe(
  map(getTime),
  map(subtract(getTime(new Date())))
)

// prettier-ignore
type dateFormats = 'month' | 'abbreviated-month' | 'day' | 'readable' | 'abbreviated-day' | 'day-first-letter' | 'day-of-year' | 'day-of-month' | 'week-of-year' | 'readable-date-and-time' | 'time' | 'form' | 'seconds' | 'condensed-readable'
export const formatDate = (
  strFormat: dateFormats,
  date: string | Date | number
) => {
  if (strFormat === 'seconds') return format('T', new Date(date))
  if (strFormat === 'month') return format('LLLL', new Date(date))
  if (strFormat === 'abbreviated-month') return format('LLL', new Date(date))
  if (strFormat === 'day') return format('EEEE', new Date(date))
  if (strFormat === 'abbreviated-day') return format('E', new Date(date))
  if (strFormat === 'day-first-letter') return format('EEEEE', new Date(date))
  if (strFormat === 'day-of-year') return format('D', new Date(date))
  if (strFormat === 'day-of-month') return format('d', new Date(date))
  if (strFormat === 'week-of-year') return format('l', new Date(date))
  if (strFormat === 'form') return format('yyyy-MM-dd', new Date(date))
  if (strFormat === 'time') return format('p', new Date(date))
  if (strFormat === 'condensed-readable')
    return `${format('E', new Date(date))}, ${format(
      'LLL',
      new Date(date)
    )} ${format('d', new Date(date))}`
  if (strFormat === 'readable-date-and-time')
    return (
      format('PPPPpppp', new Date(date)).slice(0, -16).replace(', 2021', '') +
      'pm'
    )
  return format('PPPP', new Date(date)).slice(0, -6)
}

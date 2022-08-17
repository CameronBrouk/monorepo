import {
  isFuture,
  isPast,
  isThisMonth,
  isThisWeek,
  isToday,
  isTomorrow
} from 'date-fns'
import { formatDate } from '../../../../../../shared/utils'

type EventStatus =
  | 'Starts Tonight'
  | 'Starts Tomorrow'
  | 'Completed'
  | `Starts in ${string}`
  | 'Ongoing'
  | 'Starts This Month'
  | 'Starts This Week'

interface EventDateStatusPillProps {
  dates: Date[]
}
export const EventDateStatusPill = ({ dates }: EventDateStatusPillProps) => {
  const getEventStatus = (dates: Date[]): EventStatus => {
    const firstDate = dates[0]
    const lastDate = dates[dates.length - 1]

    if (isToday(firstDate)) return 'Starts Tonight'
    if (isTomorrow(firstDate)) return 'Starts Tomorrow'
    if (isPast(lastDate)) return 'Completed'
    if (isThisMonth(firstDate)) return 'Starts This Month'
    if (isThisWeek(firstDate) && isFuture(firstDate)) return 'Starts This Week'
    if (isPast(firstDate) && isFuture(lastDate)) return 'Ongoing'
    return `Starts in ${formatDate('month', firstDate)}`
  }

  const getPillStyles = (dates: Date[]) => {
    const status = getEventStatus(dates)

    if (status === 'Completed') return 'text-teal-800 bg-teal-100'
    if (status === 'Ongoing') return 'text-red-800 bg-red-100'
    return 'text-green-800 bg-green-100'
  }

  return (
    <span
      className={
        'px-4 py-1 text-md font-medium rounded-full' +
        ' ' +
        getPillStyles(dates)
      }
    >
      {getEventStatus(dates)}
    </span>
  )
}

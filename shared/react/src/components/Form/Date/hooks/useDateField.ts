import { useEffect, useState } from 'react'
import { formatDate } from '@unimpaired/utils'
import { format } from 'date-fns/fp'
import { useTransition } from '@react-spring/web'

export const useDateField = (useDateState: [Date, any]) => {
  const [date, setDate] = useDateState

  const [day, setDay] = useState(formatDate('day', date))
  const [dayNum, setDayNum] = useState(format('do', date))
  const [month, setMonth] = useState(formatDate('month', date))
  const [year, setYear] = useState(date.getFullYear())
  const [time, setTime] = useState(formatDate('time', date))

  useEffect(() => {
    setDay(formatDate('day', date))
    setDayNum(format('do', date))
    setMonth(formatDate('month', date))
    setYear(date.getFullYear())
    setTime(formatDate('time', date))
  }, [date])

  const transition = {
    from: { opacity: 0, transform: 'scale(2, 2)', color: 'blue' },
    enter: { opacity: 1, transform: 'scale(1, 1)', color: 'black' },
    leave: {
      opacity: 0,
      position: 'absolute',
      height: 0,
      width: 0,
      overflow: 'hidden'
    }
  }

  const dateObjects = {
    day,
    month,
    date,
    year,
    time
  }

  const animations = {
    day: useTransition(day, transition),
    month: useTransition(month, transition),
    date: useTransition(dayNum, transition),
    year: useTransition(year, transition),
    time: useTransition(time, transition)
  }

  return { animations, dateObjects, date, setDate }
}

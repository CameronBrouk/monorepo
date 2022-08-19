import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Menu } from '../../../Menu'
import { formatDate } from '@unimpaired/utils'
import React, { useEffect, useState } from 'react'
import { DatePicker, HiddenDateProps } from './DatePicker'
import { format } from 'date-fns/fp'
import { useTransition, animated } from '@react-spring/web'

interface Props extends HiddenDateProps {
  onSelect: (date: Date) => void
}

export const DatePickerField = (props: Props) => {
  const [date, setDate] = useState(new Date())
  const [pickerOpen, setPickerOpen] = useState(false)

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

  const dayAnimation = useTransition(day, transition)
  const monthAnimation = useTransition(month, transition)
  const dateAnimation = useTransition(dayNum, transition)
  const yearAnimation = useTransition(year, transition)
  const timeAnimation = useTransition(time, transition)

  return (
    <div className='w-full'>
      <div className='relative w-full'>
        <div
          onClick={() => setPickerOpen((v) => !v)}
          className='focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 w-full px-3 pr-1 py-2 text-left placeholder-gray-400 truncate transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md appearance-none cursor-pointer overflow-y-auto sm:overflow-hidden flex space-between items-center'
        >
          <span className='w-full flex space-x-1'>
            {dayAnimation((style, day) => (
              <animated.p style={style}>{day}</animated.p>
            ))}
            ,{' '}
            {monthAnimation((style, month) => (
              <animated.p style={style}>{month}</animated.p>
            ))}
            {dateAnimation((style, month) => (
              <animated.p style={style}>{month}</animated.p>
            ))}
            ,
            {yearAnimation((style, value) => (
              <animated.p style={style}>{value}</animated.p>
            ))}
            , at{' '}
            {timeAnimation((style, value) => (
              <animated.p style={style}>{value}</animated.p>
            ))}
          </span>
          <FontAwesomeIcon icon={faEdit} />
        </div>
      </div>

      <div className='relative w-full'>
        <Menu
          data-testid='picker-menu'
          isOpen={pickerOpen}
          onClose={() => setPickerOpen((v) => !v)}
          className='focus-within:border-blue-300 w-full p-1 max-h-96 overflow-y-auto'
        >
          <DatePicker date={date} setDate={setDate} />
        </Menu>
      </div>
    </div>
  )
}

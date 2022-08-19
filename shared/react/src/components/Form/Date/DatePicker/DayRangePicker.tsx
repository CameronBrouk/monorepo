import React, { useState } from 'react'

import { set, lensProp } from 'ramda'
import { dayAbbreviations, formatDate } from '@unimpaired/utils'
import { getDayTiles } from '../../../Calendar/helpers/calendar.helpers'
import { DayTile } from '../../../Calendar/components/DayTile'
import {
  isSameDay,
  isSameMonth,
  isWithinInterval,
  isBefore,
  isAfter,
  Interval
} from 'date-fns'
import { addMonths, subMonths } from 'date-fns/fp'

import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  range: Partial<Interval>
  setRange: any
  setActiveDate: any
  // setRange: SetState<Partial<Interval>>
  // setActiveDate: SetState<'start' | 'end'>
  activeDate: 'start' | 'end'
}

export const DayRangePicker = ({
  range,
  setRange,
  activeDate,
  setActiveDate
}: Props) => {
  const [month, setMonth] = useState(
    range?.start ? new Date(range?.start) : new Date()
  )

  const tileStyles = (tileDate: Date, { start, end }: Partial<Interval>) => {
    const commonTileStyles = ' p-4 disabled:bg-gray-200 disabled:text-gray-700'
    const baseTile = 'bg-white' + commonTileStyles
    const intervalTile =
      'bg-white z-0 relative before:absolute before:-z-10 before:bg-blue-200 before:top-1/2 before:left-0 before:right-0 before:h-4/5 before:-translate-y-1/2' +
      commonTileStyles
    const outsideMonthTile =
      'disabled:bg-gray-200 disabled:text-gray-700' + commonTileStyles
    const startSelectedTile =
      'bg-white z-0 relative before:absolute before:bg-white before:-z-10 before:border-2 before:border-blue-500 before:rounded-full before:left-1/2 before:top-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:aspect-square' +
      commonTileStyles
    const endSelectedTile =
      'bg-white z-0 relative before:absolute before:-z-10 before:border-2 before:bg-white before:border-blue-500 before:rounded-full before:left-1/2 before:top-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:aspect-square' +
      commonTileStyles
    const leftBackground =
      'after:absolute after:bg-blue-200 after:left-0 after:right-1/2 after:top-0 after:bottom-0 after:-z-20 after:h-4/5 after:top-1/2 after:-translate-y-1/2'
    const rightBackground =
      'after:absolute after:bg-blue-200 after:left-1/2 after:right-0 after:top-0 after:bottom-0 after:-z-20 after:h-4/5 after:top-1/2 after:-translate-y-1/2'

    if (start && isSameDay(tileDate, start))
      return startSelectedTile + ' ' + (end && rightBackground)
    if (end && isSameDay(tileDate, end))
      return endSelectedTile + ' ' + (start && leftBackground)
    if (start && end && isWithinInterval(tileDate, { start, end }))
      return intervalTile

    return isSameMonth(new Date(), tileDate) ? baseTile : outsideMonthTile
  }

  const onClickTile = (tileDate: Date) => {
    const endBeforeStart =
      activeDate === 'end' && range.start && isBefore(tileDate, range.start)
        ? true
        : false
    const startAfterEnd =
      activeDate === 'start' && range.end && isAfter(tileDate, range.end)
        ? true
        : false

    if (!range.start || !range.end) {
      if (range.start) {
        setRange(set(lensProp<Interval>('end'), tileDate))
        return
      }
      if (range.end) {
        if (isAfter(tileDate, range.end)) {
          setRange(({ end }) => ({
            start: end,
            end: tileDate
          }))
          return
        }
        if (isBefore(tileDate, range.end)) {
          setRange(({ end }) => ({
            start: end,
            end: undefined
          }))
        }
      }
    }

    if (endBeforeStart) return setRange({ start: undefined, end: tileDate })
    if (startAfterEnd) return setRange({ end: undefined, start: tileDate })

    setRange(set(lensProp<Interval>(activeDate), tileDate))
    setActiveDate((prev) => (prev === 'start' ? 'end' : 'start'))
  }

  return (
    <>
      <div className='flex flex-col w-full h-full relative py-4'>
        <div className='grid grid-cols-7 w-full'>
          {dayAbbreviations.map((day) => (
            <p
              key={day}
              className='text-xs sm:text-sm text-gray-500 text-center'
            >
              {day}
            </p>
          ))}
        </div>

        <div className='h-full max-h-full flex-grow'>
          <div className='grid grid-cols-7 grid-flow-row h-full'>
            {getDayTiles(month).map((tileDate) => (
              <DayTile
                key={tileDate.toString()}
                date={tileDate}
                className={tileStyles(tileDate, range)}
                style={{ ':nth-child(n7)': 'border-radius: 50% 0 0 50%' }}
                onClick={() => onClickTile(tileDate)}
              >
                {' '}
              </DayTile>
            ))}
          </div>
        </div>
      </div>
      <div className='flex justify-between items-center w-full text-lg justify-items-stretch'>
        <div
          className='flex-grow-0 border border-gray-300 rounded px-4 py-2'
          onClick={() => setMonth(subMonths(1))}
        >
          <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
        </div>
        <div className='text-xl'>{formatDate('month', month)}</div>
        <div
          className='flex-grow-0 border border-gray-300 rounded px-4 py-2'
          onClick={() => setMonth(addMonths(1))}
        >
          <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
        </div>
      </div>
    </>
  )
}

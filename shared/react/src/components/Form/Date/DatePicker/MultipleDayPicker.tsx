import React from 'react'
import { dayAbbreviations } from '@unimpaired/utils'
import { getDayTiles } from '../../../Calendar/helpers/calendar.helpers'
import { DayTile } from '../../../Calendar/components/DayTile'
import { isSameDay, isSameMonth } from 'date-fns/fp'
import { any, includes, without } from 'ramda'

interface Props {
  month: Date
  dates: Date[]
  setDates: any
  // setDates: SetState<Date[]>
}

export const MultipleDayPicker = ({ dates, setDates, month }: Props) => {
  return (
    <div className='flex flex-col w-full h-full relative'>
      <div className='grid grid-cols-7 w-full'>
        {dayAbbreviations.map((day) => (
          <p
            key={day}
            className='text-xs sm:text-sm text-gray-500 border text-center'
          >
            {day}
          </p>
        ))}
      </div>

      <div className='h-full max-h-full overflow-hidden'>
        <div className='grid grid-cols-7 grid-flow-row h-full'>
          {getDayTiles(month).map((date) => (
            <DayTile
              key={date.toString()}
              date={date}
              style={{}}
              className={`border hover:bg-gray-50 ${
                any(isSameDay(date), dates)
                  ? 'bg-blue-200 focus:bg-blue-200'
                  : ''
              } ${!isSameMonth(date, month) ? 'bg-gray-200' : ''}`}
              onClick={() => {
                setDates((previousDates) => {
                  if (includes(date, previousDates))
                    return without([date], previousDates)
                  return [...previousDates, date]
                })
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

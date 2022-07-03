import React from 'react'
import { set } from 'date-fns/fp'
import { dayAbbreviations } from '@stlswing/utils'
import { getDayTiles } from '../../..//Calendar/helpers/calendar.helpers'
import { DayTile } from '../../../Calendar/components/DayTile'
import { isSameDay, isSameMonth } from 'date-fns'

interface Props {
  date: Date
  setDate: any
}

export const DayPicker = ({ date: chosenDate, setDate }: Props) => {
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
          {getDayTiles(chosenDate).map((date) => (
            <DayTile
              key={date.toString()}
              date={date}
              style={{}}
              className={`border hover:bg-gray-50 ${
                isSameDay(date, chosenDate)
                  ? 'bg-blue-200 focus:bg-blue-200'
                  : ''
              } ${!isSameMonth(date, chosenDate) ? 'bg-gray-200' : ''}`}
              onClick={() => {
                setDate(set({ date: date.getDate() }))
              }}
            ></DayTile>
          ))}
        </div>
      </div>
    </div>
  )
}

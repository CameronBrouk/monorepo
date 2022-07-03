import { Menu } from '../../../Menu'
import { formatDate } from '@stlswing/utils'
import { addMonths, Interval } from 'date-fns'
import React, { useState } from 'react'
import { DateFieldLabel } from '../components/DateField'
import { DatePicker, HiddenDateProps } from '../DatePicker/DatePicker'

interface Props extends HiddenDateProps {
  range: Interval
  setRange: any
}

export const DateRange = ({ range, setRange, ...hiddenProps }: Props) => {
  const [open, setOpen] = useState(false)
  const [start, setStart] = useState(new Date())
  const [end, setEnd] = useState(addMonths(new Date(), 3))
  const [currentSelecting, setCurrentSelecting] = useState('start')

  return (
    <div className='bg-white min-w-max rounded-lg shadow-xl border divide-y'>
      {/* <button onClick={() => setOpen((v) => !v)}>Open Range Picker</button> */}

      <div className='w-full space-y-1 divide-y'>
        <button
          onClick={() => setCurrentSelecting('start')}
          className={`flex justify-between items-center ${
            currentSelecting === 'start' ? 'bg-indigo-200' : 'hover:bg-gray-200'
          } cursor-pointer`}
        >
          <p className='pl-2'>Start</p>
          <DateFieldLabel setDate={setStart} date={start} />
        </button>
        <button
          onClick={() => setCurrentSelecting('end')}
          className={`flex justify-between items-center ${
            currentSelecting === 'end' ? 'bg-indigo-200' : 'hover:bg-gray-200'
          } hover:bg-gray-200`}
        >
          <p className='pl-2'>End</p>
          <DateFieldLabel setDate={setEnd} date={end} />
        </button>
      </div>

      <DatePicker
        date={currentSelecting === 'start' ? start : end}
        setDate={currentSelecting === 'start' ? setStart : setEnd}
        {...hiddenProps}
      />
    </div>
  )
}

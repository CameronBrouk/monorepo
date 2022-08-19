import { addMonths } from 'date-fns'
import { DayPicker } from '../DatePicker/DayPicker'
import React, { useState } from 'react'

import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DayRangePicker } from '../DatePicker/DayRangePicker'
import { format, Interval } from 'date-fns'
import { formatDate } from '@unimpaired/utils'
import { LockableInput } from '../../Input/LockableInput'
import { useForm } from 'react-hook-form'
interface Props {
  type: 'date' | 'date-range'
  // date: Partial<Interval>
  // setDate: SetState<Partial<Interval>>
}

export const EveryDatePicker = (props: Props) => {
  const [range, setRange] = useState<Partial<Interval>>({})
  const [active, setActive] = useState<'start' | 'end'>('start')

  const selectedStyles = 'flex-grow bg-white'

  return (
    <div className='bg-white w-full rounded-md'>
      <div className=' flex space-x-4 -mx-4 -mt-4'>
        {/* Start Date Label / Button */}
        <button
          className={`transition-all duration-200 p-4 ${
            active === 'start' ? selectedStyles : 'flex-shrink bg-gray-200'
          } ${active === 'end' || (range?.end && 'w-1/2')}`}
          onClick={() => setActive('start')}
        >
          <div className='font-bold text-sm'>START DATE</div>
          <input
            type='text'
            className='text-xl text-center w-auto bg-transparent'
            value={
              range?.start
                ? formatDate('condensed-readable', new Date(range?.start))
                : 'Select via Calendar'
            }
          ></input>
        </button>
        {/* End Date Label / Button */}
        <button
          className={`transition-all duration-200 p-4 ${
            active === 'end' ? selectedStyles : 'flex-shrink bg-gray-200'
          } ${active === 'end' || (range?.end && 'w-1/2')}`}
          onClick={() => {
            setActive('end')
          }}
        >
          <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>{' '}
          <div className='font-bold'>END DATE</div>
        </button>
      </div>

      <DayRangePicker
        range={range}
        setRange={setRange}
        activeDate={active}
        setActiveDate={setActive}
      />

      <button className='w-full py-4 border-top border-gray-300 text-center'>
        ADD TIME
      </button>
    </div>
  )
}

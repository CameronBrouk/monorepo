import { range } from 'ramda'
import React, { useState, useEffect } from 'react'
import { Option } from '../../../Form/Select'

interface Props {
  year?: number
  setDate?: any
  // setDate?: SetState<Date>
  onSelectYear?: (year: number) => void
}

export const TimePicker = (props: Props) => {
  const [part, setPart] = useState('AM')
  const [hour, setHour] = useState(12)
  const [minutes, setMinutes] = useState(1)

  useEffect(() => {
    console.log('part', part)
    console.log('hour', hour)
    console.log('minutes', minutes)
  }, [part, hour, minutes])

  return (
    <div className='w-full h-full grid grid-cols-3  bg-white overflow-hidden'>
      <div className='max-h-full bg-white w-full'>
        <p className='border-b font-medium py-2 flex justify-center items-center border-r'>
          AM or PM
        </p>
        <div className='overflow-auto border-r border-white'>
          <Option
            variant='base'
            label={'AM'}
            value={'AM'}
            onSelect={() => setPart('AM')}
            selected={'AM' === part}
          />
          <Option
            variant='base'
            label={'PM'}
            value={'PM'}
            onSelect={() => setPart('PM')}
            selected={'PM' === part}
          />
        </div>
      </div>

      <div className='flex flex-col w-full bg-white items-stretch justify-center'>
        <p className='border-b font-medium py-2 flex justify-center items-center border-r'>
          Hour
        </p>
        <div className='overflow-auto max-h-60 w-full'>
          {range(1, 13).map((num) => (
            <Option
              key={num}
              variant='base'
              label={String(num)}
              value={num}
              onSelect={() => setHour(num)}
              selected={hour === num}
            />
          ))}
        </div>
      </div>

      <div className='flex flex-col w-full bg-white items-stretch justify-center'>
        <p className='border-b font-medium py-2 flex justify-center items-center border-r'>
          Minute
        </p>
        <div className='overflow-auto w-full max-h-60'>
          {range(1, 60).map((num) => (
            <Option
              key={num}
              variant='base'
              label={String(num)}
              value={num}
              onSelect={() => setMinutes(num)}
              selected={hour === num}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

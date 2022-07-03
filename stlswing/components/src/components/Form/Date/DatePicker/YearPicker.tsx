import { eachYearOfInterval, format, set } from 'date-fns/fp'
import { range, reverse } from 'ramda'
import React, { useState, useEffect } from 'react'
import useMeasure from 'react-use-measure'
import { Option } from '../../../Form/Select'

interface Props {
  year?: number
  // setDate?: SetState<Date>
  setDate?: any
  onSelectYear?: (year: number) => void
}

export const YearPicker = (props: Props) => {
  const [decade, setDecade] = useState(
    props.year ? Number(props.year.toString().slice(0, 3) + '0') : 2020
  )
  const [year, setYear] = useState(props.year || 1)

  useEffect(() => {
    const selection = decade + year

    if (props.setDate) props.setDate((date) => set({ year: selection }, date))

    if (props.onSelectYear) props.onSelectYear(selection)
  }, [decade, year])

  const decades = eachYearOfInterval({
    start: new Date(1970, 1, 1),
    end: new Date()
  })
    .map(format('y'))
    .filter((year: string) => Number(year) % 10 === 0)
    .map((dec) => Number(dec))

  const [yearsRef, { height }] = useMeasure()

  return (
    <div className='w-full grid grid-cols-2  bg-white overflow-hidden'>
      <div className='max-h-full bg-white overflow-y-auto'>
        <p className='border-b font-medium py-2 flex justify-center items-center border-r'>
          Decade
        </p>
        <div className='overflow-auto border-r border-white' ref={yearsRef}>
          {reverse(decades).map((currDecade) => (
            <Option
              key={currDecade}
              variant='base'
              label={String(currDecade)}
              value={currDecade}
              onSelect={() => setDecade(currDecade)}
              selected={currDecade === decade}
            />
          ))}
        </div>
      </div>

      <div className='flex flex-col w-full bg-white items-stretch justify-center'>
        <p className='border-b font-medium py-2 flex justify-center items-center border-r'>
          Year
        </p>
        <div className='overflow-auto' style={{ maxHeight: height }}>
          {range(1, 10).map((num) => (
            <Option
              key={num}
              variant='base'
              label={String(decade + num)}
              value={decade + num}
              onSelect={() => setYear(num)}
              selected={year === num}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

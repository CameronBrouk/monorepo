import { Story } from '@ladle/react'
import { addDays, addHours } from 'date-fns'
import { useState } from 'react'
import * as D from '../components/Form/Date/DatePicker/DatePicker'
import { DayRangePicker } from '../components/Form/Date/DatePicker/DayRangePicker'
import { DateRange } from '../components/Form/Date/DateRange/DateRange'

export const DatePicker: Story = (props) => {
  const [date, setDate] = useState(new Date())

  return (
    <div>
      <D.DatePicker date={date} setDate={setDate}></D.DatePicker>
    </div>
  )
}

export const DateRangePicker: Story = (props) => {
  const [range, setRange] = useState({
    start: new Date(),
    end: addDays(new Date(), 5)
  })
  const [type, setType] = useState<'start' | 'end'>('start')

  return (
    <div className='w-1/2'>
      <DayRangePicker
        activeDate={type}
        setActiveDate={setType}
        range={range}
        setRange={setRange}
      ></DayRangePicker>
    </div>
  )
}

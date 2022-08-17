import { indexOf } from 'ramda'
import { getMonthsOfYear } from '../../../../utils'
import { Button } from '../../../Button'
import { Step } from '../../../Stepper'
import Stepper from '../../../Stepper/Stepper'
import { DayPicker } from './DayPicker'
import { TimePicker } from './TimePicker'
import { YearPicker } from './YearPicker'

export interface HiddenDateProps {
  hideMonth?: boolean
  hideDay?: boolean
  hideYear?: boolean
  hideTime?: boolean
}
interface Props extends HiddenDateProps {
  date: Date
  setDate: SetState<Date>
}

export const DatePicker = ({ date, setDate, ...props }: Props) => {
  return (
    <div>
      <Stepper className='w-60 h-60'>
        {!props.hideYear && (
          <Step title='Year' className='max-w-lg h-60 w-96'>
            <YearPicker setDate={setDate} />
          </Step>
        )}
        {!props.hideMonth && (
          <Step title='Month' className='h-60 max-w-lg overflow-hidden'>
            <div className='w-full overflow-hidden p-4 grid grid-cols-3 gap-3 bg-white'>
              {getMonthsOfYear('full').map((month) => (
                <Button
                  key={month}
                  onClick={() => {
                    setDate(
                      (prevDate) =>
                        new Date(
                          prevDate.getFullYear(),
                          indexOf(month, getMonthsOfYear('full')),
                          prevDate.getDate()
                        )
                    )
                  }}
                  className={`h-11 ${
                    date.getMonth() === indexOf(month, getMonthsOfYear('full'))
                      ? 'bg-indigo-300 '
                      : ''
                  }`}
                >
                  {month}
                </Button>
              ))}
            </div>
          </Step>
        )}

        {!props.hideDay && (
          <Step title='Day' className='h-60 max-w-lg'>
            <DayPicker date={date} setDate={setDate} />
          </Step>
        )}

        {!props.hideTime && (
          <Step title='Time' className='h-60 max-w-lg overflow-hidden'>
            <TimePicker />
          </Step>
        )}
      </Stepper>
    </div>
  )
}

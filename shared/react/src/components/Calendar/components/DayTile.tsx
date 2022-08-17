import { format } from 'date-fns/fp'
import React from 'react'

type Props = {
  date: Date
  onClick?: () => void
  disabled?: boolean
  style?: object
  className?: string
  children?: React.ReactNode
}

export const DayTile = ({ date, ...props }: Props) => (
  <button
    disabled={props.disabled}
    data-testid={'dayTile-' + date.getDay()}
    onClick={props.onClick}
    key={date.toString()}
    className={`cursor-pointer ${props.className}`}
  >
    <time
      className='text-gray-500 text-xs sm:text-base text-center font-medium p-0.5'
      dateTime={date.toISOString()}
    >
      {format('d', date)}
    </time>
    <div className='w-full h-full max-w-full p-0.5'>{props.children}</div>
  </button>
)

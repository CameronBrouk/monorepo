import { isFuture, isPast, isThisMonth, isThisYear, isToday } from 'date-fns'
import React from 'react'
import { NestedOptionsMenu, OptionNode } from './NestedOptionsMenu'

const optionsTree: OptionNode[] = [
  {
    label: 'Date',
    children: [
      {
        label: 'Is Today',
        value: isToday,
        type: 'date'
      },
      {
        label: 'Is This Month',
        value: isThisMonth,
        type: 'date'
      },
      {
        label: 'Is This Year',
        value: isThisYear,
        type: 'date'
      },
      {
        label: 'In The Past',
        value: isPast,
        type: 'date'
      },
      {
        label: 'In The Future',
        value: isFuture,
        type: 'date'
      }
    ]
  }
]

type Props = {
  onSelect: (selections: OptionNode[]) => void
  optionsTree?: OptionNode[]
}
export const RowFilter = (props: Props) => {
  return (
    <div className='w-1/4 h-full'>
      <NestedOptionsMenu
        optionsTree={props.optionsTree || optionsTree}
        onSelect={props.onSelect}
      />
    </div>
  )
}

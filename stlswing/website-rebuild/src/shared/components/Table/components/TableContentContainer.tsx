import { range } from 'ramda'
import React, { forwardRef } from 'react'
import { TableProps } from '../Table'

type TableContentContainerProps = {
  children: React.ReactNode
}
export const TableContentContainer = forwardRef(
  (props: TableContentContainerProps) => {
    return (
      <div className='w-full relative sm:w-full sm:min-w-full overflow-auto grow'>
        {props.children}
      </div>
    )
  }
)

type TableContentProps = {
  containerHeight: number
  children: React.ReactNode
}

export const TableContent = forwardRef((props: TableContentProps) => {
  return (
    <table
      className='divide-y divide-gray-200 w-full relative'
      style={{ maxHeight: props.containerHeight }}
    >
      {props.children}
    </table>
  )
})

type TableHeadProps<T extends Record<string, any>> = {
  allChecked?: boolean
  selectable?: TableProps<T>['selectable']
  expansion?: TableProps<T>['expansion']
  toggleAll?: () => void
  columnNames: string[]
}
export function TableHead<T>(props: TableHeadProps<T>) {
  return (
    <>
      {props.selectable && (
        <th scope='col' className='relative w-12 px-6 sm:w-16 sm:px-8'>
          <input
            type='checkbox'
            className='absolute cursor-pointer left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6'
            checked={props.allChecked}
            onChange={props.toggleAll}
          />
        </th>
      )}
      {props.expansion && <th className=''>{''}</th>}

      {props.columnNames.map((columnTitle) => (
        <th
          key={columnTitle}
          scope='col'
          className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase resize sticky top-0 bg-gray-50 border-b'
        >
          {columnTitle}
        </th>
      ))}
    </>
  )
}

interface TableSkeletonProps {
  rowHeight: number
  rowsPerPage: number
  expansion: any
  selectable: any
  schemaState: Record<string, any>
}
export const TableSkeleton = ({
  schemaState,
  rowHeight,
  ...props
}: TableSkeletonProps) => {
  const getAmountOfColumns = () => {
    const keys = Object.keys(schemaState).length
    const panelColumn = props.expansion ? 1 : 0
    const checkColumn = props.selectable ? 1 : 0
    return keys + panelColumn + checkColumn
  }

  return (
    <tbody className='h-full divide-y'>
      {range(0, props.rowsPerPage).map((i) => (
        <tr className='w-full bg-slate-200 m-2 animate-pulse' key={i + 'row'}>
          {range(0, getAmountOfColumns()).map((i) => (
            <td
              key={i + 'data'}
              className='bg-gray-200 rounded-lg border-white border-y-4'
              style={{
                height: rowHeight
              }}
            ></td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}

import React from 'react'
import { Search } from '../../Search'

interface TableHeaderProps {
  isVisible?: boolean
  hideSearch?: boolean
  setSearchTerm: SetState<string>
  headingComponent?: React.ReactNode
  tableFilters?: React.ReactNode
}
export const TableHeader = (props: TableHeaderProps) => {
  const noHeaderInfo =
    props.hideSearch || !props.tableFilters || !props.headingComponent
  if (!props.isVisible || noHeaderInfo) return null

  return (
    <div className='sm:min-w-full grow-0'>
      {props.headingComponent && props.headingComponent}
      <div
        className={`overflow-hidden sm:min-w-full p-2 bg-gray-200 flex items-center space-x-2 grow-0 sm:border-none`}
      >
        {/* Search Bar */}
        {!props.hideSearch && (
          <Search debounce onSearch={props.setSearchTerm} />
        )}

        {/* Custom Filters */}
        {props.tableFilters && props.tableFilters}
      </div>
    </div>
  )
}

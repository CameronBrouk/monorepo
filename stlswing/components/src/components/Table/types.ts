import React from 'react'

export type TableSchema<
  DatabaseObject extends Record<string, any>,
  ColumnNames = string
> = ColumnNames extends string
  ? Record<ColumnNames, ColumnSchema<DatabaseObject>>
  : never

export type ColumnSchema<T extends Record<string, any>> =
  | {
      tooltipText?: string
      render: (record: T) => React.ReactNode
      hidden?: boolean
    }
  | ((record: T) => React.ReactNode)

export type ExpansionPanel<T extends Record<string, any>> = {
  shouldExpand: (record: T) => boolean
  render: (record: T) => React.ReactNode
}

export type DataTableProps<T extends Record<string | number, any>> = {
  tableSchema: TableSchema<T>
  recordsList?: T[]
  rowsPerPage?: number
  hideSearch?: boolean
  hideColumnFilter?: boolean
  isSelected?: (record: T) => boolean
  expansionPanel?: ExpansionPanel<T> | ((record: T) => React.ReactNode)

  defaultSort?: keyof T
  tableFilters?: React.ReactNode
  hideSort?: boolean
  hideHeader?: boolean
  title?: React.ReactNode
}

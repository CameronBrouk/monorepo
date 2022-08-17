import { TableSchema } from '../types'
import { OptionNode } from '../components/NestedOptionsMenu'
import { fuzzySearch, searchObject } from '@fp-unimpaired/utils'

export const getDisplayedColumns = <T>(tableSchema: TableSchema<T>) =>
  Object.entries(tableSchema)
    // @ts-ignore
    .filter(([_, { hidden }]) => !hidden)
    .map(([columnName]) => columnName)

type Params<T> = {
  recordsList: T[]
  tableSchema: TableSchema<T>
  expansionPanel?: any
  isSelected?: (record: T) => boolean
  tableFilters: OptionNode[]
  searchTerm: string
}

export const generateTableData = <T>({
  recordsList,
  tableSchema,
  expansionPanel,
  isSelected,
  searchTerm
}: Params<T>) =>
  recordsList.map((record) => ({
    isSelected: isSelected ? isSelected(record) : false,
    expansionPanel: expansionPanel?.render(record),
    shouldExpand: expansionPanel?.shouldExpand(record) || false,
    record: record,
    rowData: Object.values(tableSchema).map((rowData) => {
      if (typeof rowData === 'function') return rowData(record)
      return rowData.render(record)
    })
    // .filter((rowData) => rowData !== 'function' && !rowData.hidden)
    // .map(({ render }) => render(record)),
  }))

/**
 *
 */
export type SortOptions = {
  type: 'date' | 'string' | 'currency' | 'number'
}

// const SortSchema = {
//   date: {
//     'Oldest -> Newest': () => '',
//     'Newest -> Oldest': () => '',
//   },
//   string: {
//     'A -> Z': () => '',
//     'Z -> A': () => '',
//   },
//   number: {
//     'Low -> High': () => '',
//     'High -> Low': () => '',
//   },
// }

// const FilterSchema = {
//   date: {
//     Today: (date: Date) => isToday(date),
//     'This Week': (date: Date) => isThisWeek(date),
//     'This Month': (date: Date) => isThisMonth(date),
//     'This Year': (date: Date) => isThisYear(date),
//     After: (date: Date, after: Date) => isAfter(date, after),
//     Before: (date: Date, before: Date) => isBefore(date, before),
//     Between: (date: Date, interval: { start: Date; end: Date }) =>
//       isWithinInterval(date, interval),
//   },
//   string: {
//     Contains: (s: string, term: string) => s.includes(term),
//     'Starts with': (s: string, term: string) => s.startsWith(term),
//     'Ends With': (s: string, term: string) => s.endsWith(term),
//   },
//   number: {
//     'Greater Than': (n: number, test: number) => n > test,
//     'Less Than': (n: number, test: number) => n < test,
//   },
// }

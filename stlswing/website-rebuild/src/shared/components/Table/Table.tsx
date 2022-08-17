import React, { useEffect, useState } from 'react'
import { usePagination } from './hooks/usePagination'
import { addOrRemove, fuzzySearch } from '../../utils'
import {
  getDisplayedColumns,
  generateTableData
} from './helpers/tableData.helpers'
import { TableSchema } from './types'
import { Pagination } from './components/Pagination'
import { prop, sortBy, reverse, equals, uniq } from 'ramda'
import { OptionNode } from './components/NestedOptionsMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import useMeasure from 'react-use-measure'
import { NoItemsCreated } from '../EmptyStates'
import TableContainer from './components/TableContainer'
import { TableHeader } from './components/TableHeader'
import { TableBulkActions } from './components/TableBulkActions'
import {
  TableHead,
  TableSkeleton
} from './components/TableContentContainer'

export type TableProps<T extends Record<string | number, any>> = {
  tableSchema: TableSchema<T>
  recordsList?: T[]
  rowsPerPage?: number
  hideSearch?: boolean
  hideColumnFilter?: boolean
  isSelected?: (record: T) => boolean
  defaultSort?: keyof T
  tableFilters?: React.ReactNode
  hideSort?: boolean
  hideHeader?: boolean
  title?: React.ReactNode
  expansion?: {
    shouldExpand?: (record: T) => boolean
    render: (record: T) => React.ReactNode
  }
  selectable?: {
    onBulkEdit: (records: T[]) => void
    onBulkDelete?: (record: T[]) => void
  }
}

export function Table<T extends Record<string, any>>(props: TableProps<T>) {
  const { rowsPerPage = 8 } = props
  const [searchTerm, setSearchTerm] = useState('')
  const [schemaState, setSchemaState] = useState(props.tableSchema)
  const [tableData, setTableData] = useState<any[]>([])
  const [tableFilters /** setTableFilters */] = useState<OptionNode[]>([])
  const [sortProperty, setSortProperty] = useState<any>(
    props.defaultSort || 'name'
  )
  const [sortType, setSortType] = useState<string>('asc')

  const [selectedRows, setSelectedRows] = useState<T[]>([])
  const [expandedRows, setExpandedRows] = useState<T[]>([])
  const [allChecked, setAllChecked] = useState(false)
  const pagination = usePagination(rowsPerPage)

  const isSelected = (record: T) => !!selectedRows.find(equals(record))
  const isExpanded = (record: T) => !!expandedRows.find(equals(record))

  // useLayoutEffect(() => {
  //   if (!props.recordsList) return
  //   const isIndeterminate =
  //     selectedRows.length > 0 && selectedRows.length < props.recordsList.length
  //   setChecked(selectedRows.length === props.recordsList.length)
  //   if (!checkbox?.current) {
  //     checkbox.current.indeterminate = isIndeterminate
  //   }
  // }, [selectedRows])

  const toggleAll = () => {
    if (!props.recordsList) return
    if (allChecked) {
      setSelectedRows([])
      setAllChecked(false)
    } else {
      setSelectedRows(uniq([...props.recordsList, ...selectedRows]))
      setAllChecked(true)
    }
  }

  useEffect(() => {
    setSchemaState(props.tableSchema)
  }, [props.tableSchema])

  useEffect(() => {
    if (!props.recordsList) return

    const records = sortBy((recordProp) => {
      const data = recordProp[sortProperty]
      if (typeof data === 'number') return data
      return data
    }, props.recordsList)

    const rows = generateTableData<T>({
      recordsList: sortType === 'asc' ? records : reverse(records),
      isSelected: props.isSelected,
      tableSchema: schemaState,
      tableFilters,
      searchTerm
    })

    setTableData(rows)
  }, [
    props.recordsList,
    schemaState,
    searchTerm,
    props.tableSchema,
    tableFilters,
    sortProperty,
    sortType
  ])

  const [containerRef, { height: containerHeight }] = useMeasure()
  const [bodyRef, { height: tableContainerHeight }] = useMeasure()
  const [tableHeadRef, { height: tableHeadHeight }] = useMeasure()

  const getAmountOfColumns = () => {
    const keys = Object.keys(schemaState).length
    const panelColumn = props.expansion ? 1 : 0
    const checkColumn = props.selectable ? 1 : 0
    return keys + panelColumn + checkColumn
  }

  return (
    <TableContainer ref={containerRef}>
      {/* Header Of Table */}
      <TableHeader
        isVisible={!props.hideHeader}
        setSearchTerm={setSearchTerm}
        headingComponent={props.title}
        hideSearch={props.hideSearch}
        tableFilters={props.tableFilters}
      />

      <TableBulkActions<T>
        selectable={props.selectable}
        selectedRows={selectedRows}
      />

      {/* Table Itself, Fixed Between Header/Footer */}
      <div
        className='w-full relative sm:w-full sm:min-w-full overflow-auto grow'
        ref={bodyRef}
      >
        <table
          className='divide-y divide-gray-200 w-full relative'
          style={{ maxHeight: containerHeight }}
        >
          <thead className='bg-gray-50' ref={tableHeadRef}>
            <TableHead<T>
              selectable={props.selectable}
              expansion={props.expansion}
              allChecked={allChecked}
              toggleAll={toggleAll}
              columnNames={getDisplayedColumns(schemaState)}
            />
          </thead>

          {props?.recordsList?.length === 0 && (
            <div className='absolute w-full h-full top-20'>
              <NoItemsCreated title='No Data Available' />
            </div>
          )}

          {!props.recordsList && (
            <TableSkeleton
              expansion={props.expansion}
              schemaState={schemaState}
              rowHeight={
                (tableContainerHeight - tableHeadHeight - 10) / rowsPerPage
              }
              rowsPerPage={rowsPerPage}
              selectable={props.selectable}
            />
          )}

          {props.recordsList && props.recordsList.length > 0 && (
            <tbody className='bg-white divide-y divide-gray-200'>
              {pagination
                .getItemsOnPage(
                  fuzzySearch(props.recordsList || [], searchTerm),
                  pagination.currentPage
                )
                .map((record, i) => (
                  <>
                    <tr
                      key={i}
                      style={{
                        height:
                          (tableContainerHeight - tableHeadHeight - 10) /
                          rowsPerPage
                      }}
                    >
                      {props.selectable && (
                        <td
                          className={`relative w-12 px-6 sm:w-16 sm:px-8 ${
                            isSelected(record) ? 'bg-gray-100' : ''
                          }`}
                        >
                          {isSelected(record) && (
                            <div className='absolute inset-y-0 left-0 w-0.5 bg-indigo-600' />
                          )}
                          <input
                            type='checkbox'
                            className='absolute cursor-pointer left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6'
                            checked={isSelected(record)}
                            onChange={() => {
                              setSelectedRows((rows) =>
                                addOrRemove(record, rows)
                              )
                            }}
                          />
                        </td>
                      )}

                      {props.expansion && (
                        <td
                          scope='col'
                          onClick={() =>
                            setExpandedRows((rows) => addOrRemove(record, rows))
                          }
                          className={`relative px-2 w-8 cursor-pointer ${
                            isSelected(record) ? 'bg-gray-100' : ''
                          }`}
                        >
                          <FontAwesomeIcon
                            icon={faChevronRight}
                            className={`transform transition-all duration-300 text-gray-600 ${
                              isExpanded(record) ? 'rotate-90' : 'rotate-0'
                            }`}
                          />
                        </td>
                      )}
                      {Object.values(schemaState).map((render, rowIndex) => (
                        <td
                          className={`whitespace-nowrap px-6 py-4 text-sm text-gray-500 ${
                            isSelected(record) ? 'bg-gray-100' : ''
                          }`}
                          key={`${render}` + rowIndex}
                        >
                          {typeof render === 'function'
                            ? render(record)
                            : render.render(record)}
                        </td>
                      ))}
                    </tr>
                    <tr
                      className={`${
                        isExpanded(record) ? 'h-60' : 'h-0'
                      } transition-all duration-300 transform relative overflow-auto w-full border-l-2 border-l-indigo-500`}
                    >
                      <td className='absolute h-full max-h-full w-full overflow-auto'>
                        {isExpanded(record) && props.expansion?.render(record)}
                      </td>
                    </tr>
                  </>
                ))}
            </tbody>
          )}
        </table>
      </div>

      {/* Footer, Fixed to Bottom of Container */}
      <div className='w-full sm:w-full sm:min-w-full grow-0 bg-white border-t'>
        <Pagination
          usePagination={pagination}
          perPage={rowsPerPage}
          items={fuzzySearch(tableData.map(prop('rowData')), searchTerm)}
        />
      </div>
    </TableContainer>
  )
}

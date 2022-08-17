import { TableProps } from '../Table'

interface TableBulkActionsProps<T extends Record<string, any>> {
  selectable?: TableProps<T>['selectable']
  selectedRows: T[]
}
export function TableBulkActions<T>({
  selectedRows,
  selectable
}: TableBulkActionsProps<T>) {
  if (!selectable) return null

  return (
    <div className='p-1 top-0 left-12 flex h-12 items-center space-x-3 bg-gray-50 sm:left-16 z-40'>
      <button
        disabled={selectedRows.length === 0}
        type='button'
        className='inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30'
        onClick={() => selectable?.onBulkEdit(selectedRows)}
      >
        Bulk edit
      </button>
      {selectable?.onBulkDelete && (
        <button
          type='button'
          disabled={selectedRows.length === 0}
          className='inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30'
          onClick={() =>
            selectable?.onBulkDelete && selectable.onBulkDelete(selectedRows)
          }
        >
          Delete all
        </button>
      )}
    </div>
  )
}

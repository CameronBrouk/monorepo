import React from 'react'
import { inc, dec, range, uniq } from 'ramda'
import { usePagination } from '../hooks/usePagination'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



type Props = {
  usePagination: ReturnType<typeof usePagination>
  perPage?: number
  items: any[]
}
export const Pagination = ({ items, perPage = 10, usePagination }: Props) => {
  const { currentPage, setCurrentPage, getTotalPages } = usePagination

  const getPaginatedItems = (length: number) =>
    uniq(
      range(1, length + 1).map((number) => {
        if (number < 4) return number
        if (number > length - 3) return number
        return '...'
      })
    )

  return (
    <div className='sm:px-6 flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200'>
      <div className='sm:hidden flex items-center justify-between flex-1'>
        <button
          onClick={() => setCurrentPage(dec)}
          disabled={currentPage === 1}
          className='hover:bg-gray-50 relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md'
        >
          Previous
        </button>

        <button
          onClick={() => setCurrentPage(inc)}
          disabled={currentPage === getTotalPages(items)}
          className='hover:bg-gray-50 relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md'
        >
          Next
        </button>
      </div>
      <div className='sm:flex sm:items-center sm:justify-between hidden'>
        <div>
          <p className='text-sm text-gray-700'>
            Showing
            <span className='px-1 font-medium'>
              {currentPage * perPage - (perPage - 1)}
            </span>
            to
            <span className='px-1 font-medium'>{currentPage * perPage}</span>
            of
            <span className='px-1 font-medium'>{items.length}</span>
            results
          </p>
        </div>
        <div className='ml-2'>
          <nav
            className='relative z-0 inline-flex -space-x-px rounded-md shadow-sm'
            aria-label='Pagination'
          >
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(dec)}
              className='rounded-l-md hover:bg-gray-50 relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300'
            >
              <span className='sr-only'>Previous</span>
              <FontAwesomeIcon icon={'chevron-left'} />
            </button>
            {getPaginatedItems(getTotalPages(items)).map((number) => (
              <>
                {typeof number === 'number' ? (
                  <button
                    key={'pagination-' + number}
                    onClick={() => setCurrentPage(number)}
                    className={`z-10 relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      number === currentPage &&
                      'bg-indigo-50 border-indigo-500 text-indigo-600'
                    }`}
                  >
                    {number}
                  </button>
                ) : (
                  <span
                    key={'pagination-' + number}
                    className='relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300'
                  >
                    ...
                  </span>
                )}
              </>
            ))}
            <button
              disabled={currentPage === getTotalPages(items)}
              onClick={() => setCurrentPage(inc)}
              className='rounded-r-md hover:bg-gray-50 relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300'
            >
              <span className='sr-only'>Next</span>
              <FontAwesomeIcon icon={'chevron-right'} />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}

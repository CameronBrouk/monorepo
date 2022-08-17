import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { isEmpty, reverse } from 'ramda'
import React from 'react'
import { Selection } from '../Select'

type Props = {
  multiple?: boolean
  placeholder?: string
  noLabel?: boolean
  label: string
  optionsVisible: boolean
  setOptionsVisible: (fn: (b: boolean) => boolean) => void
  selections: Selection<any>[]
  ['data-testid']?: string
  handleSelect: (selection: Selection<any>) => void
  children?: React.ReactNode
  className?: string
}

export const SelectOptionButton = (props: Props) => {
  return (
    <button
      className='focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 block w-full px-3 pr-1 py-2 text-left placeholder-gray-400 truncate transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md appearance-none cursor-pointer overflow-y-auto sm:overflow-hidden'
      type='button'
      data-testid={props['data-testid'] || 'select-button'}
      onClick={() => props.setOptionsVisible((o) => !o)}
    >
      <div
        className={`flex items-center space-x-2 ${
          props.optionsVisible ? 'overflow-y-auto' : 'overflow-hidden'
        }`}
      >
        <span className='flex-1' data-testid='current-option'>
          {/* Label */}
          {isEmpty(props.selections) && !props.placeholder && props.label}

          {/* Placeholder */}
          {isEmpty(props.selections) && !props.noLabel && props.placeholder && (
            <p className='text-gray-500'>{props.placeholder}</p>
          )}

          {/* Single Select */}
          {!props.multiple && props.selections[0]?.label}

          {/* Multiple Select */}
          {props.multiple && (
            <div className='w-full h-full flex'>
              {/* Show Most Recent Selections First */}
              {reverse(props.selections).map((selection) => (
                <div
                  key={selection.value}
                  className='flex bg-gray-200 text-gray-800 p-2 px-4 mr-2 space-x-2 rounded-full max-w-min'
                >
                  <p className='truncate'>{selection.label}</p>
                  <button
                    type='button'
                    onClick={(e) => {
                      e.stopPropagation()
                      props.handleSelect(selection)
                    }}
                  >
                    <FontAwesomeIcon
                      size='sm'
                      className={`text-red-500 ml-2 rounded-full`}
                      icon={faTimesCircle}
                    />
                  </button>
                </div>
              ))}
            </div>
          )}
        </span>

        {/* Icon */}
        <svg
          className='w-5 h-5 text-gray-400'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
          aria-hidden='true'
        >
          <path
            fillRule='evenodd'
            d='M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
            clipRule='evenodd'
          />
        </svg>
      </div>
    </button>
  )
}

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheck,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons'
import { StepTitleProps } from '..'

export const DesktopStepTitle = (props: StepTitleProps) => {
  const indexContainerClasses =
    'w-8 h-8 flex items-center justify-center rounded-full border border-2 truncate'

  const getTextStyles = (type: StepTitleProps['type']) => {
    if (type === 'current') return 'text-indigo-600'
    if (type === 'complete') return 'text-gray-900 lg:block'
    if (type === 'error') return 'text-red-600'
    if (type === 'upcoming') return 'text-gray-500 group-hover:text-gray-600'
    return ''
  }

  return (
    <>
      <li
        key={props.stepNumber}
        className={`flex transition-all justify-between duration-300 h-16 truncate group ${
          props.type === 'current' ? '' : '' // I'm undecided on whether to add grow/shrink
        }`}
      >
        <button
          onClick={props.onClick}
          className={
            'flex items-center justify-center truncate outline-none w-full focus:outline-none space-x-2'
          }
        >
          {props.type === 'current' && (
            <span
              className={`${indexContainerClasses} text-indigo-600 border-indigo-600`}
            >
              <span className='h-6 w-6'>{props.stepNumber}</span>
            </span>
          )}

          {props.type === 'complete' && (
            <span
              className={`${indexContainerClasses} border-none bg-indigo-600 group-hover:bg-indigo-800`}
            >
              <FontAwesomeIcon icon={faCheck} className='w-6 h-6 text-white' />
            </span>
          )}

          {props.type === 'error' && (
            <span
              data-testid='error-icon'
              className={`${indexContainerClasses} border-2 border-red-600`}
            >
              <FontAwesomeIcon
                icon={faExclamationTriangle}
                className='w-5 h-5 text-red-600'
              />
            </span>
          )}

          {props.type === 'upcoming' && (
            <span
              className={`${indexContainerClasses} border-2 border-gray-300 group-hover:border-gray-400`}
            >
              <span className='text-gray-500 group-hover:text-gray-900'>
                {props.stepNumber}
              </span>
            </span>
          )}

          <span
            className={`text-sm font-medium truncate ${getTextStyles(
              props.type
            )}`}
          >
            {props.title}
          </span>
        </button>
      </li>
      {!props.isLast && (
        <svg
          className={'h-full w-5 text-gray-300'}
          viewBox='0 0 22 80'
          fill='none'
          preserveAspectRatio='none'
        >
          <path
            d='M0 -2L20 40L0 82'
            vectorEffect='non-scaling-stroke'
            stroke='currentcolor'
            strokeLinejoin='round'
          />
        </svg>
      )}
    </>
  )
}

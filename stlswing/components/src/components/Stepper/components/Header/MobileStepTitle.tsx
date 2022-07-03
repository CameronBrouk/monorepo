import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faExclamationTriangle,
  faCheck
} from '@fortawesome/free-solid-svg-icons'
import { StepTitleProps } from './StepperHeader'

export const MobileStepTitle = ({ title, type, onClick }: StepTitleProps) => {
  return (
    <li key={title}>
      {type === 'complete' ? (
        <button onClick={onClick} className=''>
          <FontAwesomeIcon icon={faCheck} className='text-green-600 w-2 h-2' />
          <span className='sr-only'>{title}</span>
        </button>
      ) : type === 'error' ? (
        <button
          onClick={onClick}
          className='w-4 h-4  flex items-center relative justify-center rounded-full hover:bg-indigo-900'
          data-testid='error-icon'
        >
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            className='text-red-600 w-3 h-3'
          />
          <span className='sr-only'>{title}</span>
        </button>
      ) : type === 'current' ? (
        <button
          onClick={onClick}
          className='relative flex items-center justify-center'
          aria-current='step'
        >
          <span className='absolute w-5 h-5 p-px flex' aria-hidden='true'>
            <span className='w-full h-full rounded-full bg-indigo-200' />
          </span>
          <span
            className='relative block w-2.5 h-2.5 bg-indigo-600 rounded-full'
            aria-hidden='true'
          />
          <span className='sr-only'>{title}</span>
        </button>
      ) : (
        <button
          onClick={onClick}
          className='block w-2.5 h-2.5 bg-gray-200 rounded-full hover:bg-gray-400'
        >
          <span className='sr-only'>{title}</span>
        </button>
      )}
    </li>
  )
}

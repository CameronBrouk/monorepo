import {
  faTriangleCircleSquare,
  faWarning
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

interface NoItemsCreatedProps {
  children?: React.ReactNode
  title: string
  subtitle?: string
}
export const NoItemsCreated = (props: NoItemsCreatedProps) => (
  <div className='w-full mx-auto p-4 flex items-center justify-center'>
    <div className='bg-white border-2 border-radius p-5 d-block w-full flex items-center justify-center max-w-lg m-4'>
      <div className='text-center space-y-4 flex flex-col items-center justify-center'>
        <FontAwesomeIcon
          icon={'warning'}
          className='h-20 text-blue-800 w-20 p-2 mb-4 object-cover mx-auto'
        />
        <h3 className='font-medium text-gray-800 text-2xl pb-4'>
          {props.title}
        </h3>
        {props.subtitle && (
          <p className='text-xs font-gray-500 py-1'>{props.subtitle}</p>
        )}
        {props.children}
      </div>
    </div>
  </div>
)

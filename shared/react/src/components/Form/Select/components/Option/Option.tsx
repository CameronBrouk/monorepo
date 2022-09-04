import {
  faCheckSquare,
  faCircle,
  faDotCircle,
  faSquare,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useRef } from 'react'

import useOption from './useOption'

export interface OptionProps {
  value: any
  label: string
  group?: string
  selected?: boolean
  variant?: 'select' | 'base'
  onSelect?: (value: any) => void
  disabled?: boolean
  className?: string
  children?: React.ReactNode
  role?: 'checkbox' | 'radio'
}

export const Option = ({ value, label, ...props }: OptionProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { onSelect = () => {} } = props

  useOption(buttonRef, () => handleSelect())

  const handleSelect = () => {
    onSelect(value)
  }

  const base = 'transition-all duration-150 ease-in-out'
  const getClasses = () => {
    const selected = props.selected ? 'text-black font-semibold bg-white' : ''
    const focused = 'focus:outline-none focus:text-white focus:bg-indigo-600'
    const hovered = 'hover:outline-none hover:text-white hover:bg-indigo-600'
    return base + ' ' + selected + ' ' + focused + ' ' + hovered + ' '
  }

  const getBaseClasses = () => {
    const selected = props.selected
      ? 'text-white font-semibold bg-indigo-600'
      : ''
    const focused = 'focus:outline-none focus:font-bold'
    const hovered = 'hover:outline-none hover:text-gray-800 hover:bg-indigo-200'
    return base + ' ' + selected + ' ' + focused + ' ' + hovered + ' '
  }

  if (props?.variant === 'base')
    return (
      <button
        ref={buttonRef}
        onFocus={() => buttonRef?.current?.focus()}
        tabIndex={0}
        aria-label={label}
        disabled={props.disabled}
        className={`${
          props.className
        } ${getBaseClasses()} w-full py-1 pl-2 group`}
        onClick={onSelect}
        {...props}
        type='button'
      >
        <div className='flex items-center space-x-4 justify-between mr-2'>
          <span className='flex items-center'>
            {props.children ? props.children : label}
          </span>
        </div>
      </button>
    )

  return (
    <button
      ref={buttonRef}
      onFocus={() => buttonRef?.current?.focus()}
      tabIndex={0}
      aria-label={label}
      disabled={props.disabled}
      className={`${
        props.className
      } ${getClasses()} w-full py-2 pl-2 group hover:bg-indigo-600 focus:bg-gray-200 focus:text-indigo-600 rounded-md`}
      onClick={onSelect}
      {...props}
      type='button'
    >
      <div className='flex items-center space-x-4 justify-between mr-2'>
        <span className='flex items-center'>
          {props.selected ? (
            <FontAwesomeIcon
              className={`${'text-indigo-600'} h-4 w-4 group-hover:text-white group-focus:text-indigo-600 mr-2`}
              icon={props.role === 'checkbox' ? 'check-square' : 'dot-circle'}
            />
          ) : (
            <FontAwesomeIcon
              className={`text-white border border-indigo-600 ${
                props.role === 'checkbox' ? '' : 'rounded-full'
              } h-4 w-4 mr-2 `}
              icon={props.role === 'checkbox' ? 'square' : 'circle'}
            />
          )}

          {props.children ? props.children : label}
        </span>

        {/* Remove Indicator */}
        {props.selected && (
          <FontAwesomeIcon
            size='sm'
            className={`text-red-500 rounded-full group-hover:text-white group-hover:bg-red-500 group-focus:text-white group-focus:bg-red-500`}
            icon={'times-circle'}
          />
        )}
      </div>
    </button>
  )
}

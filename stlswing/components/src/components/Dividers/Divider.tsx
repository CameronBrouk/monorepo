import React from 'react'
export type DividerProps = {
  textPosition?: 'left' | 'center' | 'right' | 'between'
  text?: string
  title?: boolean
  className?: string
  children?: React.ReactNode
}

export const Divider = (props: DividerProps) => {
  const labelPosition =
    props.textPosition === 'center'
      ? 'justify-center'
      : props.textPosition === 'right'
      ? 'justify-end'
      : props.textPosition === 'between'
      ? 'justify-between'
      : 'justify-start'

  return (
    <div className={`relative w-full ${props.className}`}>
      <div className='absolute inset-0 flex items-center' aria-hidden='true'>
        <div className='w-full border-t border-gray-300' />
      </div>
      <div className={`relative flex ${labelPosition} items-center`}>
        <span
          className={`${
            props.title
              ? 'text-lg font-medium text-gray-900'
              : 'text-gray-500 text-sm'
          } px-2 bg-white`}
        >
          {props.text || ''}
        </span>
        <span className='bg-white'>{props.children}</span>
      </div>
    </div>
  )
}

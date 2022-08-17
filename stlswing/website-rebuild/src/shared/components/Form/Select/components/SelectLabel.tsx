import React from 'react'

type Props = {
  label?: string
  required?: boolean
}

export const SelectLabel = ({ label, ...props }: Props) => {
  if (!label) return null
  return (
    <label
      className='lock text-sm font-medium leading-5 text-gray-700 truncate'
      htmlFor={label}
    >
      <span
        data-testid='label-wrapper'
        className='text-md pl-2 m-0 text-gray-500'
      >
        <span className='pr-1 text-red-400'>{props.required && '*'}</span>
        {label}
      </span>
    </label>
  )
}

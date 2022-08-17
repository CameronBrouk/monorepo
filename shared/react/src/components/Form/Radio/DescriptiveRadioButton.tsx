import React from 'react'
import { capitalCase } from 'change-case'

interface DescriptiveRadioButtonProps<T extends string> {
  name: T
  description?: string
  checked?: boolean
  onClick: () => void
}
export function DescriptiveRadioButton<T extends string>(
  props: DescriptiveRadioButtonProps<T>
) {
  return (
    <div
      className={`${
        props.checked ? 'bg-blue-200' : 'bg-white hover:bg-blue-50'
      } rounded-md -space-y-px max-w-xs focus-within:border focus-within:border-blue-300`}
    >
      <label
        className={`rounded-md relative border p-4 flex ${
          !props.description && 'items-center'
        } cursor-pointer focus:outline-none`}
      >
        <input
          type='radio'
          readOnly
          name={props.name}
          value={props.name}
          checked={props.checked}
          onClick={props.onClick}
          className={`h-6 w-6 mt-0.5 cursor-pointer text-indigo-600 border-gray-300 focus:ring-indigo-500`}
          aria-labelledby={props.name}
          aria-describedby={props.name}
        />
        <div className='ml-3 flex flex-col items-center'>
          <span
            id='privacy-setting-0-label'
            className='block text-sm font-medium'
          >
            {capitalCase(props.name)}
          </span>
          {props.description && (
            <span className='block text-sm max-w-full'>
              {props.description}
            </span>
          )}
        </div>
      </label>
    </div>
  )
}

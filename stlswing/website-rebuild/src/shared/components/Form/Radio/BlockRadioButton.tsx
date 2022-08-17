import { capitalCase } from 'change-case'
import React from 'react'

interface BlockRadioButtonProps<T extends string> {
  name: T
  checked?: boolean
  onClick: () => void
}
export function BlockRadioButton<T extends string>(
  props: BlockRadioButtonProps<T>
) {
  return (
    <div
      className={`${
        props.checked ? 'bg-blue-200' : 'bg-white hover:bg-blue-50'
      } rounded-md -space-y-px`}
    >
      <label className='rounded-md relative border p-3 flex cursor-pointer focus:outline-none items-center'>
        <input
          type='radio'
          name={props.name}
          value={props.name}
          checked={props.checked}
          onClick={props.onClick}
          className={`h-4 w-4 cursor-pointer text-indigo-600 border-gray-300 focus:ring-indigo-500`}
          aria-labelledby={props.name}
          aria-describedby={props.name}
        />
        <div className='ml-3 flex flex-col'>
          <span
            id='privacy-setting-0-label'
            className='block text-sm font-medium'
          >
            {capitalCase(props.name)}
          </span>
        </div>
      </label>
    </div>
  )
}

import { Input } from './Input'
import React, { useState } from 'react'
import { InputProps } from './types'

type Props = {
  onSave: (value: string) => void
  editing: boolean
} & InputProps

export const LockableInput = ({ editing, ...props }: Props) => {
  const [isEditing, setIsEditing] = useState(editing)

  return (
    <Input
      disabled={!isEditing}
      hideLabel
      {...props}
      // appendElement={isEditing && 'clear'}
      // className={!isEditing ? 'bg-gray-200' : undefined}
      inputClasses={!isEditing ? 'bg-gray-200' : undefined}
      prependElement={
        !isEditing ? (
          <button
            onClick={() => setIsEditing((v) => !v)}
            className='flex items-center'
          >
            {/* <FontAwesomeIcon icon={faEdit} /> */}
          </button>
        ) : (
          <button
            type='button'
            onClick={() => {
              props.onSave(props.form.getValues(props.name))
              setIsEditing((v) => !v)
            }}
          >
            {/* <CheckboxSolidIcon className='text-green-800 cursor-pointer' /> */}
            {/* save */}
            {/* {props.prependElement} */}
          </button>
        )
      }
    />
  )
}

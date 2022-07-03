import React from 'react'
import { InputProps } from '../Input/types'
import { InputError } from '../Input/InputError'
import { pick } from 'ramda'

export type TextareaProps = Omit<
  InputProps,
  'type' | 'prependElement' | 'appendElement' | 'onChange'
>

export const Textarea = ({
  form,
  label,
  name,
  autoFocus,
  autoComplete,
  ...props
}: TextareaProps) => {
  const { register, watch, formState, getFieldState } = form

  const validators = pick(
    ['min', 'max', 'minLength', 'maxLength', 'required', 'pattern', 'validate'],
    props
  )

  return (
    <div className={props.className || 'mt-6'}>
      <label
        className='lock text-sm font-medium leading-5 text-gray-700'
        htmlFor={label}
      >
        <span className='text-md pl-2 m-0 text-gray-500'>
          <span className='pr-1 text-red-400'>
            {validators.required && '*'}
          </span>
          {label}
        </span>
      </label>

      <div className='rounded-md shadow-sm'>
        <textarea
          className='focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 block w-full h-32 px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none'
          {...register(name, validators)}
          id={label}
          name={name}
          placeholder={props.placeholder || label}
          autoFocus={autoFocus}
          autoComplete={autoComplete ? 'on' : 'off'}
          defaultValue={props.defaultValue}
        />
      </div>

      <InputError
        isSubmitted={getFieldState(name)?.isTouched}
        fieldValue={watch(name)}
        error={formState.errors[name]}
        validators={validators}
      />
    </div>
  )
}

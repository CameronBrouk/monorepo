import React from 'react'
import { RegisterOptions } from 'react-hook-form'
import { keys } from 'ramda'

type Props = {
  error: any
  fieldValue: string | number
  validators: RegisterOptions
  isSubmitted: boolean
}

export const InputError = ({
  error,
  fieldValue,
  validators,
  isSubmitted
}: Props) => {
  const { minLength, maxLength, max, min } = validators

  const hasError = (validatorType: keyof RegisterOptions) =>
    error && error.type && error.type === validatorType

  const message = (type: keyof RegisterOptions) => {
    if (type === 'required') return 'please fill out this field'

    if (!fieldValue) return

    if (type === 'pattern') return 'invalid input'

    if (type === 'min' && min)
      return `please enter a number greater than ${Number(min) - 1}`

    if (type === 'max' && max)
      return `please enter a number less than ${Number(max) + 1}`

    if (type === 'minLength' && minLength)
      return `please enter ${
        Number(minLength || 0) - fieldValue?.toString().length
      } more characters`

    if (type === 'maxLength' && maxLength)
      return `please enter ${
        fieldValue?.toString().length - Number(maxLength || 0)
      } less characters`
  }

  if (!isSubmitted) return null
  return (
    <>
      {keys(validators)
        .filter(hasError)
        .map((value, i) => (
          <p className='pl-2 text-red-400' key={`${i + value}`}>
            {message(value)}
          </p>
        ))}

      {Object.entries(validators['validate'] || []).map(
        ([message, validator], i) =>
          fieldValue &&
          !validator(fieldValue) && (
            <p className='pl-2 text-red-400' key={`${i + message}`}>
              {message}
            </p>
          )
      )}
    </>
  )
}

import React from 'react'
import { RegisterOptions, UseFormReturn } from 'react-hook-form'

export type InputProps = {
  form: UseFormReturn<Record<string, any>>
  label: string
  name: string
  type?: InputTypes
  placeholder?: string
  autoFocus?: boolean
  autoComplete?: boolean
  defaultValue?: string
  onChange?: (value: any) => void
  transform?: (value: any) => void
  noLabel?: boolean
  prependElement?: React.ReactNode
  editable?: boolean
  appendElement?: React.ReactNode
  inputClasses?: string
  labelClasses?: string
  disabled?: boolean
  className?: string
} & RegisterOptions

export type InputTypes =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime - local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'

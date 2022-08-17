import React, { useState } from 'react'
import { useController, UseFormReturn } from 'react-hook-form'
import { DescriptiveRadioButton } from './DescriptiveRadioButton'

type PossibleValue = string | number | undefined | string[]
type RadioOption<T extends PossibleValue = string> = {
  name: string
  value: T
  label?: string
  description?: string
}

export type RadioProps<T extends PossibleValue = string> = {
  onClick?: () => void
  defaultValue?: T
  name: string
  description?: string
  form: UseFormReturn<Record<string, any>>
  required?: boolean
  label?: string
  options: RadioOption<T>[]
  className?: string
}

export function Radio<T extends PossibleValue = string>({
  defaultValue,
  ...props
}: RadioProps<T>) {
  const [selected, setSelected] = useState(
    props.options.find(({ value }) => value === defaultValue)
  )

  const { field } = useController({
    name: props.name,
    control: props.form.control,
    rules: { required: props.required },
    defaultValue
  })

  return (
    <div className={`mt-6 ${props.className}`}>
      <label
        className={`text-sm font-medium leading-5 text-gray-700`}
        htmlFor={props.name}
      >
        <span className='pl-2 m-0 text-gray-500 text-md'>
          <span className='pr-1 text-red-400'>{props.required && '*'}</span>
          {props.label}
        </span>
      </label>

      <input
        className='sr-only'
        ref={field.ref}
        defaultValue={field.value}
        name={field.name}
        onBlur={field.onBlur}
      />

      <div className='grid sm:grid-cols-3 gap-2'>
        {props.options.map((option, i) => (
          <DescriptiveRadioButton
            key={i + option.name}
            description={option.description || ''}
            name={option.label || option.name}
            checked={selected?.value === option.value}
            onClick={() => {
              setSelected(option)
              field.onChange(option.value)
            }}
          />
        ))}
      </div>
      {/* @ts-ignore */}
      {props.form.formState.errors[props.name]?.type === 'required' && (
        <p className='pl-2 text-red-400'>please select an option</p>
      )}
    </div>
  )
}

import React, { useState } from 'react'
import { useController, UseFormReturn } from 'react-hook-form'
import { InlineDescriptionSlider } from './InlineDescriptionSlider'

export type SliderProps = {
  onClick?: () => void
  defaultValue?: boolean
  name: string
  description?: string
  form: UseFormReturn<Record<string, any>>
  required?: boolean
  label?: string
  className?: string
}

export const Slider = ({ defaultValue = false, ...props }: SliderProps) => {
  const [checked, setChecked] = useState(defaultValue)

  const { field } = useController({
    name: props.name,
    control: props.form.control,
    rules: { required: props.required },
    defaultValue
  })

  return (
    <div className={`mt-6 ${props.className}`}>
      <input
        className='sr-only'
        ref={field.ref}
        checked={checked}
        name={field.name}
        type='checkbox'
        onBlur={field.onBlur}
      />
      <InlineDescriptionSlider
        description={props.description || ''}
        name={props.label || props.name}
        onClick={() =>
          setChecked((v) => {
            field.onChange(!v)
            return !v
          })
        }
        checked={checked}
      />
    </div>
  )
}

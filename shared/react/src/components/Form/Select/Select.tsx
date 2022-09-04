import { addOrRemove } from '@unimpaired/utils'
import { any, equals } from 'ramda'
import React, { useState, useEffect } from 'react'
import { useController, useForm, UseFormReturn } from 'react-hook-form'
import { OptionsList } from './components/OptionsList'
import { SelectLabel } from './components/SelectLabel'
import { SelectOptionButton } from './components/SelectOptionButton'
import { SelectOptions } from './components/SelectOptions'
import { getChildrenProps } from './select.helpers'

export interface SelectProps<T extends unknown = string> {
  name: string
  label: string
  form?: UseFormReturn<Record<string, any>>
  onSelect?: (selections: this['multiple'] extends true ? T[] : T) => void
  children: React.FunctionComponentElement<Selection<T>>[]
  search?: boolean
  multiple?: boolean
  defaultValues?: T[]
  required?: boolean
  noLabel?: boolean
  placeholder?: string
  ['data-testid']?: string
  className?: string
}

export type Selection<T extends any = string> = {
  label: string
  value: T
}

export function Select<T extends any = string>(props: SelectProps<T>) {
  const [selectOpen, setSelectOpen] = useState(false)
  const [selections, setSelections] = useState<Selection<T>[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  // This form is here for when the select is used without a form given
  // If we do not a provide a formcontrol to the useController hook, it will error out.
  const baseForm = useForm()
  const { field } = useController({
    name: props.name,
    control: props.form ? props.form.control : baseForm.control,
    rules: { required: props.required },
    defaultValue: props.multiple
      ? props.defaultValues
      : props.defaultValues && props.defaultValues[0]
  })

  useEffect(() => {
    // if there are no default values, stop
    if (!props.defaultValues) return
    // if selection has already been set, stop
    if (selections.length > 0) return

    const childProps = getChildrenProps<Selection<T>>(props.children)
    const defaultSelections = childProps.filter(({ value }) =>
      any(equals(value), props?.defaultValues || [])
    )

    setSelections(defaultSelections)
  }, [props.defaultValues, props.children])

  const singleSelect = (selection: Selection<T>) => {
    setSelectOpen(false)
    setSelections(([prevSelection]) => {
      if (selection?.value === prevSelection?.value) {
        if (props.onSelect) props.onSelect(undefined as T)
        field.onChange(undefined)
        return []
      }

      if (props.onSelect) props.onSelect(selection.value)
      field.onChange(selection.value)
      return [selection]
    })
  }

  const multiSelect = (selection: Selection<T>) => {
    setSelections((prevSelections) => {
      const newSelections = addOrRemove(selection, prevSelections)
      const values = newSelections.map(({ value }) => value)
      // typescript can't infer that this is a multi select from this spot
      // @ts-expect-error
      if (props.onSelect) props.onSelect(values)
      field.onChange(values)
      return newSelections
    })
  }

  const handleSelect = props.multiple ? multiSelect : singleSelect

  return (
    <div className={props.className || 'mt-6 flex-col w-full '}>
      <SelectLabel
        label={props.noLabel ? undefined : props.label}
        required={props.required}
      />

      <div className='relative w-full'>
        <SelectOptionButton
          handleSelect={handleSelect}
          label={props.label}
          optionsVisible={selectOpen}
          setOptionsVisible={setSelectOpen}
          selections={selections}
          multiple={props.multiple}
          placeholder={props.placeholder}
          noLabel={props.noLabel}
        />

        {/* In order to support react-hook-form, we bind the select value to this input */}
        <input
          className='hidden sr-only'
          ref={field.ref}
          id={props.label}
          placeholder={props.label}
          value={selections.join(', ')}
          name={field.name}
          readOnly
        />
        {/* Show Error if Required */}
        {/* @ts-ignore >> error after typescript 4.8 upgrade? */}
        {props.form?.formState.errors[props.name]?.type === 'required' && (
          <p className='pl-2 text-red-400'>please select an option</p>
        )}
      </div>

      <SelectOptions
        isVisible={selectOpen}
        search={props.search}
        setVisible={setSelectOpen}
        setSearchTerm={setSearchTerm}
        handleSelect={handleSelect}
        label={props.label}
        selections={selections}
      >
        <OptionsList
          multiple={props.multiple}
          handleSelect={handleSelect}
          searchTerm={searchTerm}
          selections={selections}
        >
          {props.children}
        </OptionsList>
      </SelectOptions>
    </div>
  )
}

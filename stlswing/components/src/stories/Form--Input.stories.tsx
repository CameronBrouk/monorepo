import { Story } from '@ladle/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { SubmitButton } from '../Button'
import { Divider } from '../Dividers/Divider'
import { ObjectDisplay } from '../Text/ObjectDisplay'
import { Input } from './Input/Input'
import { InputProps } from './Input/types'
import { Option, Select } from './Select'

const inputFieldArgs = {
  name: 'name',
  label: 'Name',
  placeholder: 'Name Placeholder',
  type: 'text',
  autoFocus: false,
  autoComplete: false,
  pattern: undefined,
  disabled: false,
  minLength: 2,
  maxLength: 8,
  required: true,
  min: 2,
  max: 2
}

export const Basic: Story<InputProps> = (controls) => {
  const form = useForm()

  return (
    <div className='grid sm:grid-cols-2 gap-2 divide-x'>
      <form onSubmit={form.handleSubmit(console.log)}>
        <Input name='name' label='Display Name' form={form} />
        <SubmitButton>Submit</SubmitButton>
      </form>
    </div>
  )
}

export const AddOn: Story<InputProps> = (controls) => {
  const form = useForm()

  return (
    <div className='grid sm:grid-cols-2 gap-2 divide-x'>
      <form onSubmit={console.log}>
        <Input
          prependElement={
            <div className='border-r bg-gray-100 flex items-center px-2'>
              <p className='text-gray-400 font-medium text-xs'>https://</p>
            </div>
          }
          placeholder='www.example.com'
          name='example1'
          label='Domain'
          required
          form={form}
        />
        <Input
          prependElement={
            <div className='flex items-center pl-2'>
              <p className='text-gray-600 font-medium'>$</p>
            </div>
          }
          appendElement={
            <div className='flex border-l items-center pl-2'>
              <label htmlFor='currency' className='sr-only'>
                Currency
              </label>
              <select
                id='currency'
                name='currency'
                className='focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md'
              >
                <option>USD</option>
                <option>CAD</option>
                <option>EUR</option>
              </select>
            </div>
          }
          placeholder='0.00'
          name='example2'
          label='Salary'
          required
          form={form}
        />
      </form>
    </div>
  )
}

export const Validation: Story<InputProps> = (controls) => {
  const form = useForm()

  return (
    <div className='grid sm:grid-cols-2 gap-2 divide-x'>
      <form onSubmit={form.handleSubmit(console.log)}>
        <Input
          {...controls}
          name={controls.name}
          label={controls.label}
          minLength={controls.minLength}
          maxLength={controls.maxLength}
          disabled={controls.disabled}
          required={controls.required}
          pattern={controls.pattern}
          form={form}
        />
      </form>
    </div>
  )
}

Validation.args = inputFieldArgs

AddOn.args = inputFieldArgs

Basic.args = inputFieldArgs

import { Story } from '@ladle/react'
import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Radio, DescriptiveRadioButton } from '../components'

export const Basic: Story<any> = (props) => {
  const form = useForm()
  return (
    <>
      <form onSubmit={form.handleSubmit(console.log)}>
        <Radio<number>
          form={form}
          name='test-radio'
          label='Test Radio'
          defaultValue={1}
          options={[
            { name: '1', value: 1 },
            { name: '2', value: 2 },
            { name: '3', value: 3 }
          ]}
        />
      </form>
    </>
  )
}

export const WithText: Story<any> = (props) => {
  const [checked, setChecked] = useState<'Radio 1' | 'Radio 2'>('Radio 1')
  return (
    <div>
      <DescriptiveRadioButton
        description='This is a description'
        name='Radio Button Name'
        checked={checked === 'Radio 1'}
        onClick={() => setChecked('Radio 1')}
        {...props}
      />
      <DescriptiveRadioButton
        description='This is a description'
        name='Radio Button Name'
        checked={checked === 'Radio 2'}
        onClick={() => setChecked('Radio 2')}
        {...props}
      />
    </div>
  )
}

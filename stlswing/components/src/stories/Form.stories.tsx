import { Story } from '@ladle/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Input,
  Textarea,
  Radio,
  Divider,
  ObjectDisplay,
  SubmitButton,
  Select,
  Option,
  Slider
} from '../components'

import React from 'react'
export const Usage: Story<any> = (props) => {
  const [submissionValues, setSubmissionValues] = useState({})
  const form = useForm()

  return (
    <div className='grid sm:grid-cols-2 gap-2 divide-x'>
      {/* prettier-ignore */}
      <form onSubmit={form.handleSubmit(setSubmissionValues)} className='flex flex-col overflow-y-auto pr-4'>
        <div className='grow overflow-y-auto'>
          {/* prettier-ignore */}
          <Input form={form} required maxLength={10} name='name' label='Display Name' className='w-full' />

          <Textarea form={form} label='Life Story' name='story' />
          <Select
            form={form}
            multiple
            required
            label='Favorite Color'
            name='color'
          >
            <Option label='Red' value='red' />
            <Option label='Blue' value='blue' />
            <Option label='Green' value='green' />
          </Select>
          <Radio
            label='Gender'
            form={form}
            required
            name='gender'
            defaultValue='male'
            options={[
              { value: 'male', name: 'Male' },
              { value: 'female', name: 'female' }
            ]}
          />
          <Slider
            form={form}
            name='updates'
            label='Opt-in'
            description='We send updates about cancelations.'
          />
        </div>
        <div>
          <SubmitButton type='submit'>Submit</SubmitButton>
        </div>
      </form>

      <div>
        <Divider text='Form Submission' />
        <ObjectDisplay object={submissionValues} />
      </div>
    </div>
  )
}

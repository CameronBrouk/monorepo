import { Story } from '@ladle/react'
import { Input as InputComponent } from './Input/Input'
import { useForm } from 'react-hook-form'
import { InputProps } from './Input/types'
import {
  Textarea as TextareaComponent,
  TextareaProps
} from './Textarea/Textarea'
import { Radio as RadioComponent } from './Radio/Radio'
import { BlockRadioButton as BlockRadioButtonComponent } from './Radio/BlockRadioButton'
import { DescriptiveRadioButton as DescriptiveRadioButtonComponent } from './Radio/DescriptiveRadioButton'
import * as Sliders from './Slider'
import { useState } from 'react'
import { Divider } from '../Dividers/Divider'

export const Radio: Story<any> = (props) => {
  const form = useForm()
  return (
    <>
      <form onSubmit={form.handleSubmit(console.log)}>
        <RadioComponent<number>
          form={form}
          name='test-radio'
          label='Test Radio'
          defaultValue={1}
          options={[
            { name: '1', value: 1 },
            { name: '2', value: 2 },
            { name: '3', value: 3 }
          ]}
        ></RadioComponent>
      </form>
    </>
  )
}

export const DescriptiveRadioButton: Story<any> = (props) => {
  const [checked, setChecked] = useState<'Radio 1' | 'Radio 2'>('Radio 1')
  return (
    <div>
      <DescriptiveRadioButtonComponent
        description='This is a description'
        name='Radio Button Name'
        checked={checked === 'Radio 1'}
        onClick={() => setChecked('Radio 1')}
        {...props}
      />
      <DescriptiveRadioButtonComponent
        description='This is a description'
        name='Radio Button Name'
        checked={checked === 'Radio 2'}
        onClick={() => setChecked('Radio 2')}
        {...props}
      />
    </div>
  )
}
DescriptiveRadioButton.args = {}

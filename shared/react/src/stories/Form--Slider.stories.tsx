import React from 'react'
import { Story } from '@ladle/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Sliders from '../components/Form/Slider'

export const Slider: Story<any> = (props) => {
  const [checked, setChecked] = useState<'Radio 1' | 'Radio 2'>('Radio 1')
  const form = useForm()
  return (
    <form onSubmit={form.handleSubmit(console.log)} className='w-1/2'>
      <Sliders.Slider
        name='Slider'
        form={form}
        defaultValue={true}
        description='test test test'
      />
    </form>
  )
}

export const ControlledSlider: Story<any> = (props) => {
  const [checked, setChecked] = useState(false)
  return (
    <form className='w-1/2'>
      <Sliders.InlineDescriptionSlider
        name='Slider'
        description='test test test'
        checked={checked}
        onClick={() => setChecked((v) => !v)}
      />
    </form>
  )
}

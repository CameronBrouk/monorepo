import React from 'react'
import { Story } from '@ladle/react'
import { useForm } from 'react-hook-form'
import * as C from '../components'

export const Textarea: Story<C.TextareaProps> = (props) => {
  const form = useForm()

  return (
    <form onSubmit={form.handleSubmit(console.log)}>
      <C.Textarea
        {...props}
        name='description'
        maxLength={55}
        label='Description'
        form={form}
      />
      <C.SubmitButton>Submit</C.SubmitButton>
    </form>
  )
}

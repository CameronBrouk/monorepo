import { Story } from '@ladle/react'
import { useForm } from 'react-hook-form'
import * as T from './Textarea/Textarea'
import { SubmitButton } from '../Button'

export const Textarea: Story<T.TextareaProps> = (props) => {
  const form = useForm()

  return (
    <form onSubmit={form.handleSubmit(console.log)}>
      <T.Textarea
        {...props}
        name='description'
        maxLength={55}
        label='Description'
        form={form}
      />
      <SubmitButton>Submit</SubmitButton>
    </form>
  )
}

import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { ModalProps, Modal } from './Modal'
import { Button, SubmitButton } from '../Button'
import { ModalHeader } from './ModalHeader'

type Props = {
  onSubmit: (data: any) => void
  form: UseFormReturn<Record<string, any>>
  submitText?: string
  cancelText?: string
  isValid?: boolean
  isDisabled?: boolean
  className?: string
  children?: React.ReactNode
} & ModalProps

export const FormModal = ({
  isOpen,
  onSubmit,
  onClose,
  form,
  title,
  isValid,
  isDisabled,
  ...rest
}: Props) => {
  const { submitText, cancelText, children, ...props } = rest
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} {...props} hideTitle>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col h-screen'
      >
        <ModalHeader
          title={typeof title === 'string' ? title : 'modal'}
          onClose={onClose}
          titleClasses={props.titleClasses}
          buttonClasses={props.buttonClasses}
        />

        <div className='grow-1 overflow-y-auto'>{children}</div>

        <div className='p-4 border-t flex space-x-2 justify-end h-20'>
          <SubmitButton
            isSubmitting={form.formState.isSubmitting}
            variant='raised'
          >
            {submitText ? submitText : 'Submit'}
          </SubmitButton>
          {/* <Button
            // disabled={isDisabled && isValid}
            variant='raised'
            type='submit'></Button> */}
          <Button type='button' onClick={onClose}>
            {cancelText ? cancelText : 'Cancel'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default FormModal

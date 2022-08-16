import React from 'react'
import type { Story } from '@ladle/react'
import { Modal as ModalComponent, ModalProps } from '../components/Modal/Modal'
import { Button } from '../components/Button/Button/Button'
import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

export const Modal: Story<ModalProps> = (props) => {
  const [open, setOpen] = useState(false)

  return (
    <BrowserRouter>
      <Button onClick={() => setOpen((v) => !v)}>click</Button>
      <ModalComponent
        isOpen={open}
        onClose={() => setOpen(false)}
        type='left-panel'
        className='h-full w-1/2'
        title='Modal Title'
      >
        <div className='h-screen bg-black text-white flex justify-end'>
          modal modal modal modal modal modal modal modal modal modal modal
          modal modal modal modal modal modal modal modal modal modal modal
          modal modal modal modal modal modal modal modal modal modal modal
          modal modal modal modal modal modal modal modal modal modal modal
          modal modal modal modal modal modal modal modal modal modal modal
          modal modal modal modal modal modal modal modal modal modal modal
          modal modal modal modal modal modal modal modal modal modal modal test
          test test test
        </div>
      </ModalComponent>
    </BrowserRouter>
  )
}

import React from 'react'
import { Story } from '@ladle/react'
import { wait } from '@fp-unimpaired/utils'
import { useState } from 'react'
import * as C from '../components'
import { inc } from 'ramda'

export const Burger: Story<C.BurgerProps> = (props) => {
  return <C.Burger {...props} onClick={() => {}} />
}

Burger.args = {
  dark: true,
  isOpen: true
}

export const Button: Story<C.ButtonProps> = (props) => (
  <C.Button {...props}>Text</C.Button>
)

Button.argTypes = {
  variant: {
    options: [
      'raised',
      'warn',
      'outline',
      'christmas',
      'rounded-light',
      'base'
    ],
    control: { type: 'select' },
    defaultValue: 'raised'
  },
  icon: {
    options: [undefined, 'plus', 'plus-circle'],
    control: { type: 'select' },
    defaultValue: undefined
  }
}

export const SubmitButton: Story<C.SubmitButtonProps> = (props) => {
  const [counter, setCounter] = useState(0)
  const [submitting, setState] = useState(false)
  const asyncSubmit = async () => {
    setState(true)
    setCounter(inc)
    await wait(1000)
    setState(false)
  }
  return (
    <>
      <C.SubmitButton
        onClick={asyncSubmit}
        isSubmitting={submitting}
        {...props}
      >
        Submit
      </C.SubmitButton>
      <p>
        Click the button to run an async function that increments counter after
        1 second
      </p>
      <p>counter: {counter}</p>
    </>
  )
}

// SubmitButton.args = {}
// SubmitButton.argTypes = {
//   type: {
//     options: ['christmas', 'raised', 'nav', 'nav-link', 'christmas'],
//     control: { type: 'select' }
//   }
// }

export const ConfirmationButton: Story = (props) => {
  const [counter, setCounter] = useState(0)

  return (
    <div>
      <C.ConfirmationButton onClick={() => setCounter(inc)}>
        Submit
      </C.ConfirmationButton>
      <p>Must click twice to add to counter</p>
      <p>counter: {counter}</p>
    </div>
  )
}

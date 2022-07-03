import { Story } from '@ladle/react'
import '../../index.css'
import { wait } from '@stlswing/utils'
import { useState } from 'react'
import {
  Burger as BurgerComponent,
  BurgerProps
} from '../components/Button/Burger/Burger'
import * as B from '../components/Button/Button/Button'
import { SubmitButton as SubmitButtonComponent } from '../components/Button/SubmitButton/SubmitButton'
import { ConfirmationButton as ConfirmationButtonComponent } from '../components/Button/ConfirmationButton/ConfirmationButton'
import { inc } from 'ramda'

export const Burger: Story<BurgerProps> = (props) => (
  <BurgerComponent {...props} />
)

Burger.args = {
  dark: true,
  isOpen: true
}

export const Button: Story<B.ButtonProps> = (props) => (
  <B.Button {...props}>Text</B.Button>
)

Button.args = {
  children: 'Text'
}

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

export const SubmitButton: Story<B.ButtonProps> = (props) => {
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
      <SubmitButtonComponent onClick={asyncSubmit} isSubmitting={submitting}>
        Submit
      </SubmitButtonComponent>
      <p>
        Click the button to run an async function that increments counter after
        1 second
      </p>
      <p>counter: {counter}</p>
    </>
  )
}

SubmitButton.args = {}
SubmitButton.argTypes = {
  type: {
    options: ['christmas', 'raised', 'nav', 'nav-link', 'christmas'],
    control: { type: 'select' }
  }
}

export const ConfirmationButton: Story<B.ButtonProps> = (props) => {
  const [counter, setCounter] = useState(0)

  return (
    <div>
      <ConfirmationButtonComponent onClick={() => setCounter(inc)}>
        Submit
      </ConfirmationButtonComponent>
      <p>Must click twice to add to counter</p>
      <p>counter: {counter}</p>
    </div>
  )
}

Button.args = {}

import { Story } from '@ladle/react'
import { Hello as HelloComponent, HelloProps } from './Hello'

export const Hello: Story<HelloProps> = (props) => <HelloComponent {...props} />

Hello.args = {
  a: 'string',
  b: 0
}

Hello.argTypes = {
  variant: {
    control: { type: 'radio' },
    options: ['primary', 'secondary'],
    defaultValue: 'primary'
  },
  size: {
    control: { type: 'select' },
    options: ['small', 'medium', 'big', 'huuuuge']
  }
}

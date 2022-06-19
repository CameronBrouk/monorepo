import type { Story } from '@ladle/react'
import { ControlsProps } from './Controls.types'
import { Controls } from './Controls'

export const ControlsStory: Story<ControlsProps> = (props) => (
  <Controls {...props} />
)

ControlsStory.args = {
  label: 'Hello world',
  disabled: false,
  count: 2,
  colors: ['Red', 'Blue']
}

ControlsStory.argTypes = {
  variant: {
    options: ['primary', 'secondary'],
    control: { type: 'radio' },
    defaultValue: 'primary'
  },
  size: {
    options: ['small', 'medium', 'big', 'huuuuge'],
    control: { type: 'select' }
  }
}

import { Story } from '@ladle/react'
import { HelloProps } from './Hello.types'
import { Hello } from './Hello'

export const HelloStory: Story<HelloProps> = (props) => <Hello {...props} />

// HelloStory.args = {
//   a: 'string',
//   b: 0
// }

// HelloStory.argTypes = {
//   variant: {
//     control: { type: 'radio' },
//     options: ['primary', 'secondary'],
//     defaultValue: 'primary'
//   },
//   size: {
//     control: { type: 'select' },
//     options: ['small', 'medium', 'big', 'huuuuge']
//   }
// }

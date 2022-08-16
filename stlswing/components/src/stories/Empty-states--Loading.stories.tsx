import React from 'react'
import type { Story } from '@ladle/react'
import { Loading } from '../components'

export const Basic: Story<any> = (props) => (
  <div className='flex space-x-4'>
    <div style={{ height: 50, width: 50 }}>
      <Loading {...props} />
    </div>
  </div>
)

Basic.argTypes = {
  color: {
    control: { type: 'select' },
    options: ['purple', 'red', 'pink', 'sky', 'base'],
    defaultValue: 'purple'
  }
}

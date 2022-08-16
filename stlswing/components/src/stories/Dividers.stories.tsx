import React from 'react'
import type { Story } from '@ladle/react'
import { Button } from '../components/Button/Button/Button'
import * as C from '../components/Dividers/Divider'

export const Examples: Story<C.DividerProps> = (props) => (
  <div className='space-y-10'>
    <C.Divider textPosition='left' text='text' />
    <C.Divider textPosition='right' text='text' />
    <C.Divider title textPosition='left' text='Title' />
    <C.Divider textPosition='between' text='With Button'>
      <Button onClick={() => ''}>Button Text</Button>
    </C.Divider>
  </div>
)

export const WithButtonDivider: Story<C.DividerProps> = (props) => (
  <div className='space-y-10'>
    <C.Divider textPosition='between' text='text'>
      <Button onClick={() => ''}>Button Text</Button>
    </C.Divider>
  </div>
)

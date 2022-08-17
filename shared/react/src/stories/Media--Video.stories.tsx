import React from 'react'
import { Story } from '@ladle/react'
import { Video } from '../components'

const example =
  'https://stlswing.dance/static/media/ilhc-2013.35537b6d489a16246455.mp4'
export const Basic: Story = () => {
  return <Video src={example} alt='' fit='cover' />
}

export const Content: Story = () => {
  return (
    <Video src={example} alt='' fit='cover' overlay>
      <div className='text-white flex flex-col h-full items-center justify-center'>
        <p>CONTENT</p>
        <p>CONTENT</p>
        <p>CONTENT</p>
        <p>CONTENT</p>
        <p>CONTENT</p>
      </div>
    </Video>
  )
}

export const List: Story = () => (
  <div className='relative z-0 space-y-20'>
    <Video height={500} src={example} alt='' fit='cover' overlay />
    <Video height={500} src={''} alt='' fit='cover' />
    <Video height={500} src={example} alt='' fit='cover' overlay />
    <Video height={500} src={example} alt='' fit='cover' overlay />
    <Video height={500} src={example} alt='' fit='cover' overlay />
    <Video height={500} src={example} alt='' fit='cover' overlay />
    <Video height={500} src={example} alt='' fit='cover' overlay />
    <Video height={500} src={example} alt='' fit='cover' overlay />
    <Video height={500} src={example} alt='' fit='cover' overlay />
    <Video height={500} src={example} alt='' fit='cover' overlay />
    <Video height={500} src={example} alt='' fit='cover' overlay />
    <Video height={500} src={example} alt='' fit='cover' overlay />
  </div>
)

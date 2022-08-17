import React, { useState } from 'react'
import { HeaderDropDown } from '../components/HeaderDropDown'
import { HeaderDropDownLink } from '../components/HeaderDropDownLink'

export const MoreMenu = () => {
  const [open, setOpen] = useState(false)

  return (
    <HeaderDropDown
      isOpen={open}
      toggle={() => setOpen((v) => !v)}
      close={() => setOpen(false)}
      text='More'
    >
      <div className='relative grid items-start gap-6 px-5 py-6 bg-white sm:gap-8 sm:p-8'>
        <HeaderDropDownLink
          route='/about'
          closeMenu={close}
          description='What is Swing Dance? What does it look like? Why is it objectively the best way to spend your time?'
        >
          About
        </HeaderDropDownLink>

        <HeaderDropDownLink
          route='/faq'
          closeMenu={close}
          description='Answers to Common questions'
        >
          FAQ
        </HeaderDropDownLink>

        <HeaderDropDownLink
          route='/resources'
          closeMenu={close}
          description='Practice Videos, Recaps, and Music'
        >
          Class Resources
        </HeaderDropDownLink>
      </div>
    </HeaderDropDown>
  )
}

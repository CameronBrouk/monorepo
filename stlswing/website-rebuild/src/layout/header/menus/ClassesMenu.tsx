import React, { useState } from 'react'
import { HeaderDropDown } from '../components/HeaderDropDown'
import { HeaderDropDownLink } from '../components/HeaderDropDownLink'

export const ClassesMenu = () => {
  const [open, setOpen] = useState(false)

  return (
    <HeaderDropDown
      isOpen={open}
      toggle={() => setOpen((v) => !v)}
      close={() => setOpen(false)}
      text='Classes'
    >
      <div className='relative grid items-start gap-6 px-5 py-6 bg-white sm:gap-8 sm:p-8'>
        <HeaderDropDownLink
          route='/swing-dance-classes/groupClasses'
          description=' Join a group of students to learn dance from a pair of instructors'
          closeMenu={() => setOpen(false)}
        >
          Group Classes
        </HeaderDropDownLink>

        <HeaderDropDownLink
          route='/swing-dance-classes/privateLessons'
          description='Meet an individual instructor for a more personalized, focused lesson.'
          closeMenu={() => setOpen(false)}
        >
          Private Lessons
        </HeaderDropDownLink>
      </div>
    </HeaderDropDown>
  )
}

import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Menu } from '../../../shared/components/Menu'

type Props = {
  text: string
  toggle: () => void
  close: () => void
  isOpen: boolean
  className?: string
  children?: React.ReactNode
}

export const HeaderDropDown = (props: Props) => {
  return (
    <div className='flex justify-center'>
      <button
        onClick={props.toggle}
        className={`px-3 py-2 font-medium items-center jutify-center flex text-white cursor-pointer transition-all duration-500 border-b-2 border-transparent hover:border-white ${props.className}`}
      >
        {props.text}

        <FontAwesomeIcon icon={faChevronDown} />
      </button>
      <Menu className='mt-12' isOpen={props.isOpen} onClose={props.close}>
        {props.children}
      </Menu>
    </div>
  )
}

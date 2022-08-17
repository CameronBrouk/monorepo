import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export type ModalHeaderProps = {
  title?: string
  onClose: () => void
  buttonClasses?: string
  titleClasses?: string
  className?: string
  children?: React.ReactNode
}

export const ModalHeader = ({ title, onClose, ...props }: ModalHeaderProps) => (
  <header
    className={`w-full border-b flex justify-between items-center px-2 h-20 ${props.className}`}
  >
    <h2
      className={`sm:text-2xl flex items-center text-2xl font-extrabold ${props.titleClasses}`}
    >
      {title}
    </h2>
    <button onClick={onClose} className={props.buttonClasses} type='button'>
      <FontAwesomeIcon icon={faClose} className='text-red-800 w-8 h-8' />
    </button>
  </header>
)

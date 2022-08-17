import React, { useState } from 'react'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal } from '../../../Modal'
import { Button } from '../../../Button'
import { Search } from '../../../Search'

type Props = {
  isVisible: boolean
  label: string
  search?: boolean
  setVisible: SetState<boolean>
  setSearchTerm: SetState<string>
  className?: string
  children?: React.ReactNode
}

export const OptionsPanel = ({ isVisible, setVisible, ...props }: Props) => {
  const [fullHeight, setFullHeight] = useState(false)

  return (
    <Modal
      isOpen={isVisible}
      onClose={() => setVisible(false)}
      className={`${
        fullHeight ? 'h-screen' : 'h-1/2'
      } min-h-96 pb-28 overflow-y-auto bg-white`}
      type='bottom-panel'
    >
      <div className='flex items-center justify-between border-b'>
        <p className='text-lg p-4 font-semibold'>Select {props.label}</p>
        <div className='mr-2 space-x-2'>
          <button
            onClick={() => setFullHeight((h) => !h)}
            className=''
            type='button'
          >
            <FontAwesomeIcon icon={fullHeight ? faChevronDown : faChevronUp} />
          </button>
          <Button
            variant='raised'
            onClick={() => setVisible(false)}
            className=''
            type='button'
          >
            Close Menu
          </Button>
        </div>
      </div>
      {props.search && (
        <div className='mb-3 border-b border-gray-500'>
          <Search
            onSearch={props.setSearchTerm}
            onClick={() => setFullHeight(true)}
          />
        </div>
      )}

      <div className='divide-y'>{props.children}</div>
    </Modal>
  )
}

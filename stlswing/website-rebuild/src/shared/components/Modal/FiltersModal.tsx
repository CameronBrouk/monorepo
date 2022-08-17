import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useIsMobile } from 'src/shared/hooks/useIsMobile'
import { Modal } from './Modal'

export interface FiltersModalProps {
  className?: string
  children?: React.ReactNode
}
export const FiltersModal = (props: FiltersModalProps) => {
  const [visible, setVisible] = useState(false)
  const isMobile = useIsMobile()

  return (
    <div>
      <button onClick={() => setVisible((v) => !v)}>
        {!isMobile ? (
          <div className='flex bg-white border rounded-full px-4 py-1 space-x-2 items-center transition duration-75 hover:bg-blue-50'>
            <p className='font-medium'>Filters</p>
            <FontAwesomeIcon icon={faFilter} />
          </div>
        ) : (
          <div className='h-10 w-10 flex justify-center items-center'>
            <FontAwesomeIcon icon={faFilter} />
          </div>
        )}
      </button>
      {!isMobile && (
        <Modal
          title='Filters'
          type='left-panel'
          onClose={() => setVisible(false)}
          isOpen={visible}
        >
          {props.children}
        </Modal>
      )}

      {isMobile && (
        <Modal
          title='Filters'
          type='bottom-panel'
          className='h-3/4'
          onClose={() => setVisible(false)}
          isOpen={visible}
        >
          {props.children}
        </Modal>
      )}
    </div>
  )
}

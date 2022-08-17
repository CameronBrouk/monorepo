import { faEllipsisH, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useIsMobile } from '../../hooks'
import React, { useState } from 'react'
import { Menu } from '.'

export interface ActionsMenuProps {
  className?: string
  children?: React.ReactNode
}
export const ActionsMenu = (props: ActionsMenuProps) => {
  const [visible, setVisible] = useState(false)
  const isMobile = useIsMobile()

  return (
    <div>
      <button onClick={() => setVisible((v) => !v)}>
        {!isMobile ? (
          <div className='flex bg-white border rounded-full px-4 py-1 space-x-2 items-center transition duration-75 hover:bg-blue-50'>
            <p className='font-medium'>Actions</p>
            <FontAwesomeIcon icon={faEllipsisV} />
          </div>
        ) : (
          <div className='h-10 w-10 flex justify-center items-center'>
            <FontAwesomeIcon icon={faEllipsisH} />
          </div>
        )}
      </button>
      {!isMobile && (
        <Menu isOpen={visible} onClose={() => setVisible(false)}>
          {props.children}
        </Menu>
      )}

      {/* {isMobile && (
        <Modal
          title='Actions'
          disallowRouting
          type='bottom-panel'
          onClose={() => setVisible(false)}
          isOpen={visible}
        >
          <div onClick={() => setVisible(false)}>{props.children}</div>
        </Modal>
      )} */}
    </div>
  )
}

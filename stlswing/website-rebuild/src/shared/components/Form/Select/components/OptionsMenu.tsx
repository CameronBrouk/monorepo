import React from 'react'
import { Menu } from '../../../Menu'
import { Search } from '../../../Search'

type Props = {
  isVisible: boolean
  search?: boolean
  setVisible: SetState<boolean>
  setSearchTerm: SetState<string>
  className?: string
  children?: React.ReactNode
}

export const OptionsMenu = ({ isVisible, setVisible, ...props }: Props) => {
  return (
    <Menu
      data-testid='options-menu'
      isOpen={isVisible}
      onClose={() => setVisible((v) => !v)}
      className='focus-within:border-blue-300 w-full p-1 max-h-96 overflow-y-auto'
    >
      {props.search && (
        <div className='mb-3 border-b border-gray-500'>
          <Search onSearch={props.setSearchTerm} />
        </div>
      )}
      {props.children}
    </Menu>
  )
}

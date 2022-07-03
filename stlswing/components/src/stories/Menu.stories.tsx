import type { Story } from '@ladle/react'
import { Menu, MenuProps } from '../components/Menu/Menu'
import { ActionsMenu as ActionsMenuComponent } from '../components/Menu/ActionsMenu'

import { Button } from '../components/Button/Button/Button'
import { useState } from 'react'

export const Basic: Story<MenuProps> = (props) => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Button onClick={() => setOpen((v) => !v)}>click</Button>
      <Menu isOpen={open} onClose={() => setOpen(false)}>
        <div className='p-4'>test test test test</div>
      </Menu>
    </div>
  )
}

export const ActionsMenu: Story<MenuProps> = (props) => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <ActionsMenuComponent>test test test test</ActionsMenuComponent>
    </div>
  )
}

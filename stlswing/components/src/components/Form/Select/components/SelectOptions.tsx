import React from 'react'
import { useIsMobile } from '../../../../hooks'
import { Selection } from '../Select'
import { OptionsMenu } from './OptionsMenu'
import { OptionsPanel } from './OptionsPanel'

type Props = {
  isVisible: boolean
  label: string
  search?: boolean
  setVisible: (fn: (b: boolean) => boolean) => void
  setSearchTerm: (fn: (s: string) => string) => void
  handleSelect: (selection: Selection<any>) => void
  selections: Selection<any>[]
  className?: string
  children?: React.ReactNode
}

export const SelectOptions = (props: Props) => {
  const isMobile = useIsMobile()

  if (!isMobile)
    return (
      <div className='relative w-full'>
        <OptionsMenu
          search={props.search}
          isVisible={props.isVisible}
          setVisible={props.setVisible}
          setSearchTerm={props.setSearchTerm}
        >
          {props.children}
        </OptionsMenu>
      </div>
    )

  return (
    <OptionsPanel
      label={props.label}
      search={props.search}
      isVisible={props.isVisible}
      setVisible={props.setVisible}
      setSearchTerm={props.setSearchTerm}
    >
      {props.children}
    </OptionsPanel>
  )
}

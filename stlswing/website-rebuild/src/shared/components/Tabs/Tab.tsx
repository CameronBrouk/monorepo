import React from 'react'

export type TabProps = {
  title: string
  onClick?: () => void
  errors?: string[]
  disabled?: boolean
  canClick?: boolean
  className?: string
  children?: React.ReactNode
}

// This component is meant to be used inside of the <Tabper /> component as a child
export const Tab = ({ className, children }: TabProps) => (
  <div className={className + ' ' + ''}>{children}</div>
)

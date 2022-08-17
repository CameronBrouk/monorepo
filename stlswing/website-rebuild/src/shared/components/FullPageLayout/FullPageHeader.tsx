import { Burger } from '../Button'
import React from 'react'
import { FullPageBreadcrumbs } from './FullPageBreadcrumbs'
import { useIsMobile } from 'src/shared/hooks/useIsMobile'

type BreadCrumb = {
  title: string
  route?: string
}

interface FullPageHeaderProps {
  breadcrumbs: BreadCrumb[]
  sidebarOpen?: boolean
  setSidebarOpen?: (fn: (val: boolean) => boolean) => void
  children?: React.ReactNode
}

export const FullPageHeader = ({
  children,
  breadcrumbs,
  ...props
}: FullPageHeaderProps) => {
  const isMobile = useIsMobile()

  return (
    <header
      className='w-full flex flex-grow-0 sm:py-3 bg-white space-x-2 items-center border-b'
      style={{ height: 60 }}
    >
      {isMobile && props.setSidebarOpen && (
        <Burger
          dark
          onClick={() => {
            props.setSidebarOpen && props.setSidebarOpen((v) => !v)
          }}
        />
      )}
      <FullPageBreadcrumbs breadcrumbs={breadcrumbs} />
      {children}
    </header>
  )
}

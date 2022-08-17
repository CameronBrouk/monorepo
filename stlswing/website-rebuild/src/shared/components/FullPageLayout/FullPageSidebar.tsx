import React from 'react'

interface SidebarSectionProps {
  title: string
  children: React.ReactNode
  className?: string
}
export const SidebarSection = (props: SidebarSectionProps) => (
  <div className={props.className}>
    <p className='text-lg font-semibold pl-4 pt-4'>{props.title}</p>
    <div className='border-b p-4'>{props.children}</div>
  </div>
)

interface FullPageSidebarProps {
  children: React.ReactNode
}
export const FullPageSidebar = (props: FullPageSidebarProps) => {
  return (
    <div className='flex flex-col absolute z-20 bg-white w-screen sm:relative sm:w-1/4 h-full pb-22 2xl:border-r-2 border-r overflow-y-auto'>
      {props.children}
    </div>
  )
}

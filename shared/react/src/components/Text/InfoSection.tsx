import React from 'react'
export type InfoSectionProps = {
  title: string
  columns?: string
  bgClass?: string
  className?: string
  children?: React.ReactNode
}
export const InfoSection = ({
  children,
  title,
  className,
  bgClass
}: InfoSectionProps) => {
  return (
    <div
      className={`max-w-md sm:py-5 flex items-center justify-between sm:gap-4 sm:px-6 ${
        bgClass || ''
      }`}
    >
      <dt className={'text-sm font-medium text-gray-500 ' + className}>
        {title}
      </dt>
      <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
        {children}
      </dd>
    </div>
  )
}

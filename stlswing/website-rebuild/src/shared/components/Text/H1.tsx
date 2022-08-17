import React from 'react'

interface H1Props {
  className?: string
  children?: React.ReactNode
}
export const H1 = ({ className, children }: H1Props) => (
  <h1 className={`font-extrabold text-2xl p-4 text-center ${className}`}>
    {children}
  </h1>
)
